const fs = require('fs');

// --- 1. UPDATE APP.JS FOR TASK VALIDATION ---
let appJs = fs.readFileSync('app.js', 'utf8');

// Update getTachesPourDate to pass plotIndex and taskId
appJs = appJs.replace(
    /parcelles\.forEach\(parcelle => \{/g,
    'parcelles.forEach((parcelle, pIndex) => {'
);
appJs = appJs.replace(
    /taches\.push\(\{([\s\S]*?)parcelleInfo:([\s\S]*?)\}\);/g,
    `taches.push({$1parcelleInfo:$2, plotIndex: pIndex, tacheId: etape.nom || etape.titre});`
);

// Update afficherPopup to add checkbox
appJs = appJs.replace(
    /taches\.forEach\(t => \{([\s\S]*?)\}\);/g,
    `
        taches.forEach(t => {
            const saved = localStorage.getItem('agr_plots');
            const parcelles = JSON.parse(saved);
            const p = parcelles[t.plotIndex];
            const isDone = p.tachesValidees && p.tachesValidees.includes(t.tacheId);
            
            const checkIcon = isDone ? '<i class="fas fa-check-circle text-green-600 text-xl"></i>' : '<i class="far fa-circle text-gray-400 text-xl hover:text-green-500"></i>';
            const bgClass = isDone ? 'bg-green-100 border-green-500 opacity-70' : 'bg-green-50 border-brand';
            
            html += \`
            <div class="\${bgClass} border-l-4 p-3 rounded shadow-sm flex items-center gap-3 transition">
                <div class="cursor-pointer" onclick="window.toggleTache(\${t.plotIndex}, '\${t.tacheId}', '\${dateStr}')">
                    \${checkIcon}
                </div>
                <div>
                    <h4 class="font-bold \${isDone ? 'text-green-900 line-through' : 'text-green-800'} text-lg">\${t.nom} <span class="text-sm font-normal text-gray-500">(\${t.cultureNom})</span></h4>
                    <p class="text-sm text-gray-600 mt-1"><i class="fas fa-map-marker-alt"></i> \${t.parcelleInfo}</p>
                </div>
            </div>\`;
        });
    `
);

// Add toggleTache function
const toggleTacheCode = `
window.toggleTache = function(plotIndex, tacheId, dateStr) {
    const saved = localStorage.getItem('agr_plots');
    if (!saved) return;
    const parcelles = JSON.parse(saved);
    if (!parcelles[plotIndex].tachesValidees) parcelles[plotIndex].tachesValidees = [];
    
    const idx = parcelles[plotIndex].tachesValidees.indexOf(tacheId);
    if (idx > -1) {
        parcelles[plotIndex].tachesValidees.splice(idx, 1);
    } else {
        parcelles[plotIndex].tachesValidees.push(tacheId);
    }
    
    localStorage.setItem('agr_plots', JSON.stringify(parcelles));
    window.afficherPopup(dateStr); // re-render popup
    
    // Trigger renderDashboard if available to update global progression/UI if needed
    if (typeof renderDashboard === 'function') renderDashboard();
};
`;

if (!appJs.includes('window.toggleTache')) {
    appJs += '\n' + toggleTacheCode;
}

fs.writeFileSync('app.js', appJs);
console.log('app.js mis à jour avec la validation des tâches.');

// --- 2. UPDATE CARNET.HTML FOR JOURNAL & HEALTH STATUS ---
let carnetHtml = fs.readFileSync('carnet.html', 'utf8');

const modalJournal = `
  <!-- MODAL JOURNAL -->
  <div id="modalJournal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
    <div class="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl">
      <h3 class="font-bold text-xl text-blue-800 mb-4 border-b pb-2"><i class="fas fa-book"></i> Journal de Bord</h3>
      <div id="journalList" class="mb-4 max-h-40 overflow-y-auto space-y-2"></div>
      <form id="formJournal">
        <input type="hidden" id="journalPlotIndex">
        <div class="mb-3">
            <label class="block text-gray-700 text-sm font-bold mb-1">Ajouter une note</label>
            <textarea id="journalNote" required class="w-full border border-gray-300 p-2 rounded" rows="2" placeholder="Ex: Feuilles un peu jaunes, manque d'eau suspecté..."></textarea>
        </div>
        <div class="flex gap-2">
            <button type="button" onclick="document.getElementById('modalJournal').classList.add('hidden')" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Fermer</button>
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enregistrer</button>
        </div>
      </form>
    </div>
  </div>
`;

if (!carnetHtml.includes('id="modalJournal"')) {
    carnetHtml = carnetHtml.replace('</body>', modalJournal + '\n</body>');
}

// UI Injections inside renderDashboard
// 1. Health Status HTML near the top of the plot card
carnetHtml = carnetHtml.replace(
    /(\<h4 class="font-bold text-gray-800 text-lg"\>\$\{cData\.nom\} \<span class="text-sm font-normal text-gray-500"\>\(\$\{plot\.area\}\)\<\/span\>\<\/h4\>)/,
    `$1
        <div class="mt-1 flex items-center gap-2">
            <span class="text-xs text-gray-500">Santé:</span>
            <select onchange="window.changerSante(\${index}, this.value)" class="text-xs rounded border border-gray-200 p-1 bg-white outline-none \${plot.sante === 'Malade' ? 'text-red-600 font-bold' : (plot.sante === 'Stress' ? 'text-orange-500 font-bold' : 'text-green-600 font-bold')}">
                <option value="Excellente" \${plot.sante === 'Excellente' || !plot.sante ? 'selected' : ''}>🟢 Excellente</option>
                <option value="Stress" \${plot.sante === 'Stress' ? 'selected' : ''}>🟡 En Stress</option>
                <option value="Malade" \${plot.sante === 'Malade' ? 'selected' : ''}>🔴 Malade</option>
            </select>
        </div>
    `
);

// 2. Journal button near the Dépense button
carnetHtml = carnetHtml.replace(
    /\<button onclick="window\.ouvrirModalDepense\(\$\{index\}\)"/,
    `<button onclick="window.ouvrirModalJournal(\${index})" class="flex-1 text-xs bg-white border border-blue-300 hover:bg-blue-50 text-blue-700 py-1 px-2 rounded shadow-sm"><i class="fas fa-book"></i> Journal</button>
                                <button onclick="window.ouvrirModalDepense(\${index})"`
);

// 3. Journal logic JS
const journalJs = `
        window.changerSante = function(index, value) {
            plots[index].sante = value;
            localStorage.setItem('agr_plots', JSON.stringify(plots));
            renderDashboard();
        };

        window.ouvrirModalJournal = function(index) {
            document.getElementById('journalPlotIndex').value = index;
            
            const listEl = document.getElementById('journalList');
            const notes = plots[index].notes || [];
            if(notes.length === 0) {
                listEl.innerHTML = '<p class="text-gray-400 text-sm italic">Aucune note pour le moment.</p>';
            } else {
                listEl.innerHTML = notes.map(n => \`
                    <div class="bg-gray-50 p-2 rounded border text-sm">
                        <span class="text-gray-500 text-xs">\${new Date(n.date).toLocaleDateString('fr-FR')} - </span>
                        \${n.texte}
                    </div>
                \`).join('');
            }
            
            document.getElementById('modalJournal').classList.remove('hidden');
        };

        const formJournal = document.getElementById('formJournal');
        if(formJournal) {
            formJournal.addEventListener('submit', (e) => {
                e.preventDefault();
                const index = document.getElementById('journalPlotIndex').value;
                const texte = document.getElementById('journalNote').value;
                
                if (!plots[index].notes) plots[index].notes = [];
                plots[index].notes.push({ texte, date: new Date().toISOString() });
                
                localStorage.setItem('agr_plots', JSON.stringify(plots));
                formJournal.reset();
                window.ouvrirModalJournal(index); // refresh list
                renderDashboard();
            });
        }
`;

if (!carnetHtml.includes('window.ouvrirModalJournal')) {
    carnetHtml = carnetHtml.replace('// --- SUIVI FINANCIER LOGIQUE ---', journalJs + '\n\n        // --- SUIVI FINANCIER LOGIQUE ---');
}

fs.writeFileSync('carnet.html', carnetHtml);
console.log('carnet.html mis à jour avec le journal et statuts.');
