// app.js - Logique commune et Filtres V1.3

document.addEventListener('DOMContentLoaded', () => {
    
    // --- MENU MOBILE ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
            mobileNav.classList.toggle('flex');
        });
    }

    // --- GESTION DE LA GRILLE ET DES FILTRES ---
    const grille = document.getElementById('grille');
    const searchInput = document.getElementById('searchCulture');
    const filtreBtns = document.querySelectorAll('.btn-filtre');
    const compteur = document.getElementById('compteur');
    
    let categorieActuelle = 'Tout';
    let rechercheActuelle = '';

    function afficherCultures() {
        if (!grille || typeof DB === 'undefined') return;

        // Convertir l'objet DB.cultures en tableau si besoin
        const toutesCultures = Object.values(DB.cultures);

        // Appliquer le filtre de Catégorie
        let filtre = toutesCultures.filter(c => 
            categorieActuelle === 'Tout' || c.categorie === categorieActuelle
        );

        // Appliquer le filtre de Recherche textuelle
        if (rechercheActuelle.trim() !== '') {
            filtre = filtre.filter(c => 
                c.nom.toLowerCase().includes(rechercheActuelle.toLowerCase())
            );
        }

        // Mettre à jour le compteur
        if (compteur) {
            compteur.innerText = `${filtre.length} culture(s) disponible(s)`;
        }

        // Rendu HTML
        grille.innerHTML = filtre.map(c => `
            <a href="${c.lien_vers_fichier || (c.id + '.html')}" class="group relative bg-white rounded-xl shadow-md overflow-hidden border border-green-100 hover:shadow-lg transition flex flex-col h-48">
                <div class="h-28 w-full bg-cover bg-center group-hover:scale-105 transition duration-300" style="background-image: url('${c.image || 'tout.jpg'}');"></div>
                <div class="p-3 bg-white flex-grow flex flex-col items-center justify-center text-center">
                    <h4 class="font-bold text-green-800">${c.nom}</h4>
                    <span class="text-[10px] italic text-gray-500 mb-1">${c.nom_scientifique || ''}</span>
                    <span class="mt-1 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                        ${c.categorie || 'Autres'}
                    </span>
                </div>
                <div class="absolute inset-0 bg-green-900 bg-opacity-0 group-hover:bg-opacity-10 transition"></div>
            </a>
        `).join('');
    }

    // Initialisation
    afficherCultures();

    // Événements sur les boutons de filtres
    if (filtreBtns) {
        filtreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Gérer la classe 'actif'
                filtreBtns.forEach(b => b.classList.remove('actif'));
                e.target.classList.add('actif');
                
                // Mettre à jour la catégorie et réafficher
                categorieActuelle = e.target.getAttribute('data-cat');
                afficherCultures();
            });
        });
    }

    // Événements sur la barre de recherche
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            rechercheActuelle = e.target.value;
            afficherCultures();
        });
    }

});


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
        html += `<div class="p-2 border border-dashed rounded bg-gray-50 opacity-40"></div>`;
    }

    const aujourdhui = new Date();
    
    for(let i = 1; i <= nbJours; i++) {
        const strMois = (mois + 1).toString().padStart(2, '0');
        const strJour = i.toString().padStart(2, '0');
        const dateStr = `${annee}-${strMois}-${strJour}`;
        
        const taches = window.getTachesPourDate(dateStr);
        const aTache = taches.length > 0 ? 'bg-[#f0fdf4] border-[#16a34a] hover:bg-green-100 shadow-sm' : 'bg-white hover:bg-gray-50 border-gray-200';
        const isToday = (i === aujourdhui.getDate() && mois === aujourdhui.getMonth() && annee === aujourdhui.getFullYear());
        
        const todayStyle = isToday ? 'border-2 border-blue-400 font-bold' : '';
        const todayText = isToday ? 'text-blue-600' : 'text-gray-700';
        
        html += `
        <div onclick="window.afficherPopup('${dateStr}')" class="p-2 border rounded cursor-pointer transition ${aTache} ${todayStyle} relative min-h-[70px] flex flex-col justify-start">
            <b class="${todayText} mb-1">${i}</b>
            ${taches.length > 0 ? `<span class="text-[10px] sm:text-xs text-white font-bold bg-[#16a34a] px-1.5 py-0.5 rounded inline-block w-max shadow-sm">${taches.length} tâche(s)</span>` : ''}
        </div>`;
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
    
    parcelles.forEach((parcelle, pIndex) => {
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
                    parcelleInfo: `Parcelle de ${parcelle.area} ha à ${parcelle.location}`
                , plotIndex: pIndex, tacheId: etape.nom || etape.titre});
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
            const saved = localStorage.getItem('agr_plots');
            const parcelles = JSON.parse(saved);
            const p = parcelles[t.plotIndex];
            const isDone = p.tachesValidees && p.tachesValidees.includes(t.tacheId);
            
            const checkIcon = isDone ? '<i class="fas fa-check-circle text-green-600 text-xl"></i>' : '<i class="far fa-circle text-gray-400 text-xl hover:text-green-500"></i>';
            const bgClass = isDone ? 'bg-green-100 border-green-500 opacity-70' : 'bg-green-50 border-brand';
            
            html += `
            <div class="${bgClass} border-l-4 p-3 rounded shadow-sm flex items-center gap-3 transition">
                <div class="cursor-pointer" onclick="window.toggleTache(${t.plotIndex}, '${t.tacheId.replace(/'/g, "\\'")}', '${dateStr}')">
                    ${checkIcon}
                </div>
                <div>
                    <h4 class="font-bold ${isDone ? 'text-green-900 line-through' : 'text-green-800'} text-lg">${t.nom} <span class="text-sm font-normal text-gray-500">(${t.cultureNom})</span></h4>
                    <p class="text-sm text-gray-600 mt-1"><i class="fas fa-map-marker-alt"></i> ${t.parcelleInfo}</p>
                </div>
            </div>`;
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
