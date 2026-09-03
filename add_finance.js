const fs = require('fs');

let html = fs.readFileSync('carnet.html', 'utf8');

// 1. HTML MODALS FOR FINANCES
const financeModals = `
  <!-- MODAL DÉPENSE -->
  <div id="modalDepense" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
    <div class="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl">
      <h3 class="font-bold text-xl text-green-800 mb-4 border-b pb-2"><i class="fas fa-coins"></i> Nouvelle Dépense</h3>
      <form id="formDepense">
        <input type="hidden" id="depensePlotIndex">
        <div class="mb-3">
            <label class="block text-gray-700 text-sm font-bold mb-2">Motif</label>
            <input type="text" id="depenseMotif" required class="w-full border border-gray-300 p-2 rounded" placeholder="Ex: Engrais NPK">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Montant (FCFA)</label>
            <input type="number" id="depenseMontant" required class="w-full border border-gray-300 p-2 rounded" placeholder="Ex: 15000">
        </div>
        <div class="flex gap-2">
            <button type="button" onclick="document.getElementById('modalDepense').classList.add('hidden')" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Annuler</button>
            <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Ajouter</button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL BILAN -->
  <div id="modalBilan" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
    <div class="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl">
      <h3 class="font-bold text-xl text-green-800 mb-4 border-b pb-2"><i class="fas fa-hand-holding-usd"></i> Bilan de Récolte</h3>
      <form id="formBilan">
        <input type="hidden" id="bilanPlotIndex">
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Revenu total de la vente (FCFA)</label>
            <input type="number" id="bilanRevenu" required class="w-full border border-gray-300 p-2 rounded" placeholder="Ex: 350000">
        </div>
        <div class="flex gap-2">
            <button type="button" onclick="document.getElementById('modalBilan').classList.add('hidden')" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Annuler</button>
            <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Clôturer</button>
        </div>
      </form>
    </div>
  </div>
`;

if (!html.includes('id="modalDepense"')) {
    html = html.replace('</body>', financeModals + '\n</body>');
}

// 2. JS FUNCTIONS TO HANDLE FINANCES
const financeJS = `
        // --- SUIVI FINANCIER LOGIQUE ---
        window.ouvrirModalDepense = function(index) {
            document.getElementById('depensePlotIndex').value = index;
            document.getElementById('modalDepense').classList.remove('hidden');
        };
        window.ouvrirModalBilan = function(index) {
            document.getElementById('bilanPlotIndex').value = index;
            document.getElementById('modalBilan').classList.remove('hidden');
        };

        const formDepense = document.getElementById('formDepense');
        if(formDepense) {
            formDepense.addEventListener('submit', (e) => {
                e.preventDefault();
                const index = document.getElementById('depensePlotIndex').value;
                const motif = document.getElementById('depenseMotif').value;
                const montant = parseInt(document.getElementById('depenseMontant').value);
                
                if (!plots[index].depenses) plots[index].depenses = [];
                plots[index].depenses.push({ motif, montant, date: new Date().toISOString() });
                
                localStorage.setItem('agr_plots', JSON.stringify(plots));
                document.getElementById('modalDepense').classList.add('hidden');
                formDepense.reset();
                renderDashboard();
            });
        }

        const formBilan = document.getElementById('formBilan');
        if(formBilan) {
            formBilan.addEventListener('submit', (e) => {
                e.preventDefault();
                const index = document.getElementById('bilanPlotIndex').value;
                const revenu = parseInt(document.getElementById('bilanRevenu').value);
                
                plots[index].revenuFinal = revenu;
                
                localStorage.setItem('agr_plots', JSON.stringify(plots));
                document.getElementById('modalBilan').classList.add('hidden');
                formBilan.reset();
                renderDashboard();
            });
        }
`;

if (!html.includes('SUIVI FINANCIER LOGIQUE')) {
    html = html.replace('renderDashboard();\n    });', financeJS + '\n        renderDashboard();\n    });');
}

// 3. PLOT HTML TEMPLATE UPDATE TO SHOW FINANCES


// We'll replace the inside of the loop directly with regex to be safer, because quotes and formatting might mismatch exactly.

html = html.replace(/plotsList\.innerHTML \+= `[\s\S]*?deletePlot\(\$\{index\}\)[\s\S]*?<\/div>\s+`;/, `
                // --- SUIVI FINANCIER CALCS ---
                const depenses = plot.depenses || [];
                const totalDepenses = depenses.reduce((sum, d) => sum + d.montant, 0);
                
                let budgetPrevu = 0;
                if (cData.budget && cData.budget.cout_intrants !== 'N/A') {
                    const intrants = parseInt(cData.budget.cout_intrants.replace(/\\D/g, '')) || 0;
                    const mainOeuvre = parseInt(cData.budget.cout_main_oeuvre.replace(/\\D/g, '')) || 0;
                    // L'area est souvent une string ex: "0.5 ha", on la parse
                    const areaNum = parseFloat(plot.area) || 1;
                    budgetPrevu = (intrants + mainOeuvre) * areaNum;
                }
                
                let percentBudget = budgetPrevu > 0 ? Math.min(100, (totalDepenses / budgetPrevu) * 100) : 0;
                let colorBudget = totalDepenses > budgetPrevu && budgetPrevu > 0 ? 'bg-red-500' : 'bg-yellow-500';
                
                let financeUI = '';
                if (plot.revenuFinal !== undefined) {
                    const benefice = plot.revenuFinal - totalDepenses;
                    const benefColor = benefice >= 0 ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100';
                    financeUI = \`
                        <div class="mt-3 p-3 \${benefColor} rounded border flex justify-between items-center">
                            <div><span class="font-bold">Clôturé :</span> Bénéfice net</div>
                            <div class="font-bold text-lg">\${benefice.toLocaleString('fr-FR')} FCFA</div>
                        </div>
                    \`;
                } else {
                    financeUI = \`
                        <div class="mt-3 bg-gray-50 p-3 rounded border border-gray-100">
                            <div class="flex justify-between text-xs mb-1 text-gray-600">
                                <span>Dépenses: <b>\${totalDepenses.toLocaleString('fr-FR')} F</b></span>
                                <span>Budget prévu: \${budgetPrevu > 0 ? budgetPrevu.toLocaleString('fr-FR') + ' F' : 'N/A'}</span>
                            </div>
                            \${budgetPrevu > 0 ? \`<div class="w-full bg-gray-200 rounded-full h-1.5 mb-2"><div class="\${colorBudget} h-1.5 rounded-full" style="width: \${percentBudget}%"></div></div>\` : ''}
                            <div class="flex gap-2 mt-2">
                                <button onclick="window.ouvrirModalDepense(\${index})" class="flex-1 text-xs bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 py-1 px-2 rounded shadow-sm"><i class="fas fa-plus"></i> Dépense</button>
                                <button onclick="window.ouvrirModalBilan(\${index})" class="flex-1 text-xs bg-[#16a34a] hover:bg-green-700 text-white py-1 px-2 rounded shadow-sm"><i class="fas fa-check"></i> Récolter & Bilan</button>
                            </div>
                        </div>
                    \`;
                }
                
                plotsList.innerHTML += \`
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex flex-col relative overflow-hidden">
                        <div class="absolute left-0 top-0 bottom-0 w-2 bg-brand"></div>
                        <div class="flex justify-between items-start pl-2">
                            <div>
                                <h4 class="font-bold text-gray-800 text-lg">\${cData.nom} <span class="text-sm font-normal text-gray-500">(\${plot.area})</span></h4>
                                <p class="text-sm text-gray-600"><i class="fas fa-map-marker-alt"></i> \${plot.location} &nbsp;|&nbsp; Semis: \${sowDate.toLocaleDateString('fr-FR')}</p>
                            </div>
                            <button onclick="window.deletePlot(\${index})" class="text-gray-300 hover:text-red-500 text-lg" title="Supprimer"><i class="fas fa-trash-alt"></i></button>
                        </div>
                        
                        <div class="mt-4 pl-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Agility -->
                            <div>
                                <div class="flex justify-between text-xs mb-1 text-gray-600">
                                    <span>Croissance</span>
                                    <span>\${Math.round(progress)}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-brand h-2 rounded-full" style="width: \${progress}%"></div>
                                </div>
                                <p class="text-xs text-right mt-1 text-gray-500">Récolte prévue: \${harvestDate.toLocaleDateString('fr-FR')}</p>
                            </div>
                            <!-- Finance -->
                            <div>
                                \${financeUI}
                            </div>
                        </div>
                    </div>
                \`;`);

fs.writeFileSync('carnet.html', html);
console.log('carnet.html mis à jour avec le suivi financier');
