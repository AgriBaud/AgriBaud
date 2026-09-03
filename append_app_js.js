const fs = require('fs');

const codeToAppend = `

// --- LOGIQUE DU CALENDRIER MON CARNET V1.4 ---
let moisAffiche = new Date().getMonth();
let anneeAffiche = new Date().getFullYear();

window.genererCalendrier = function(mois, annee) {
    const calEl = document.getElementById('calendrier');
    if (!calEl) return; // Si on n'est pas sur la page carnet.html
    
    if (mois === undefined) mois = moisAffiche;
    if (annee === undefined) annee = anneeAffiche;
    
    const nomsMois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
    const labelMois = document.getElementById('moisAnneeAffiche');
    if(labelMois) labelMois.innerText = nomsMois[mois] + " " + annee;

    const premierJour = new Date(annee, mois, 1).getDay();
    const decalage = premierJour === 0 ? 6 : premierJour - 1; // Lundi = 0
    const nbJours = new Date(annee, mois + 1, 0).getDate();
    
    let html = '';
    
    for(let i = 0; i < decalage; i++) {
        html += \`<div class="p-2 border border-dashed rounded bg-gray-50 opacity-40"></div>\`;
    }

    const aujourdhui = new Date();
    
    for(let i = 1; i <= nbJours; i++) {
        const strMois = (mois + 1).toString().padStart(2, '0');
        const strJour = i.toString().padStart(2, '0');
        const dateStr = \`\${annee}-\${strMois}-\${strJour}\`;
        
        const taches = window.getTachesPourDate(dateStr);
        const aTache = taches.length > 0 ? 'bg-[#f0fdf4] border-[#16a34a] hover:bg-green-100 shadow-sm' : 'bg-white hover:bg-gray-50 border-gray-200';
        const isToday = (i === aujourdhui.getDate() && mois === aujourdhui.getMonth() && annee === aujourdhui.getFullYear());
        
        const todayStyle = isToday ? 'border-2 border-blue-400 font-bold' : '';
        const todayText = isToday ? 'text-blue-600' : 'text-gray-700';
        
        html += \`
        <div onclick="window.afficherPopup('\${dateStr}')" class="p-2 border rounded cursor-pointer transition \${aTache} \${todayStyle} relative min-h-[70px] flex flex-col justify-start">
            <b class="\${todayText} mb-1">\${i}</b>
            \${taches.length > 0 ? \`<span class="text-[10px] sm:text-xs text-white font-bold bg-[#16a34a] px-1.5 py-0.5 rounded inline-block w-max shadow-sm">\${taches.length} tâche(s)</span>\` : ''}
        </div>\`;
    }
    calEl.innerHTML = html;
}

window.getTachesPourDate = function(dateStr) {
    if (typeof DB === 'undefined' || !DB.cultures) return [];
    const saved = localStorage.getItem('agr_plots');
    if (!saved) return [];
    
    const parcelles = JSON.parse(saved);
    const taches = [];
    
    const targetDate = new Date(dateStr);
    targetDate.setHours(0,0,0,0);
    
    parcelles.forEach(parcelle => {
        const culture = DB.cultures[parcelle.cultureId];
        if (!culture || !culture.etapes) return;
        
        const dateSemis = new Date(parcelle.date);
        dateSemis.setHours(0,0,0,0);
        
        const diffTime = targetDate.getTime() - dateSemis.getTime();
        const diffJours = Math.round(diffTime / (1000 * 60 * 60 * 24));
        
        culture.etapes.forEach(etape => {
            if (etape.jour === diffJours) {
                taches.push({
                    nom: etape.nom || etape.titre,
                    cultureNom: culture.nom,
                    parcelleInfo: \`Parcelle de \${parcelle.area} ha à \${parcelle.location}\`
                });
            }
        });
    });
    
    return taches;
}

window.afficherPopup = function(dateStr) {
    const taches = window.getTachesPourDate(dateStr);
    const popup = document.getElementById('popupTache');
    if (!popup) return;
    
    const d = new Date(dateStr);
    const formatStr = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    
    document.getElementById('popupDate').innerText = formatStr.charAt(0).toUpperCase() + formatStr.slice(1);
    
    let html = '';
    if (taches.length === 0) {
        html = '<p class="text-gray-500 italic p-4 text-center">🎉 Aucune tâche prévue pour ce jour. Reposez-vous !</p>';
    } else {
        taches.forEach(t => {
            html += \`
            <div class="bg-green-50 border-l-4 border-brand p-3 rounded shadow-sm">
                <h4 class="font-bold text-green-800 text-lg">\${t.nom} <span class="text-sm font-normal text-gray-500">(\${t.cultureNom})</span></h4>
                <p class="text-sm text-gray-600 mt-1"><i class="fas fa-map-marker-alt"></i> \${t.parcelleInfo}</p>
            </div>\`;
        });
    }
    
    document.getElementById('popupContenu').innerHTML = html;
    popup.classList.remove('hidden');
}

window.fermerPopup = function() {
    const popup = document.getElementById('popupTache');
    if(popup) popup.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    const btnPrec = document.getElementById('btnMoisPrec');
    const btnSuiv = document.getElementById('btnMoisSuiv');
    
    if (btnPrec && btnSuiv) {
        btnPrec.addEventListener('click', () => {
            moisAffiche--;
            if(moisAffiche < 0) { moisAffiche = 11; anneeAffiche--; }
            window.genererCalendrier(moisAffiche, anneeAffiche);
        });
        btnSuiv.addEventListener('click', () => {
            moisAffiche++;
            if(moisAffiche > 11) { moisAffiche = 0; anneeAffiche++; }
            window.genererCalendrier(moisAffiche, anneeAffiche);
        });
    }
    
    window.genererCalendrier();

    // Auto-refresh calendrier quand une parcelle est ajoutée (via le changement du DOM)
    const plotsList = document.getElementById('plotsList');
    if (plotsList) {
        const observer = new MutationObserver(() => {
            window.genererCalendrier();
        });
        observer.observe(plotsList, { childList: true });
    }
});
`;

fs.appendFileSync('app.js', codeToAppend);
console.log('app.js mis à jour avec les fonctions du calendrier.');
