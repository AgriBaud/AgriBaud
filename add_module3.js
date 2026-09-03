const fs = require('fs');

let html = fs.readFileSync('carnet.html', 'utf8');

// 1. Modifying the form
const oldForm = `<div class="mb-4 flex gap-4">
                <div class="w-1/2">
                    <label class="block text-sm font-bold text-gray-700 mb-1">Superficie</label>
                    <input type="text" id="plotArea" placeholder="ex: 0.5 ha" required class="w-full border border-gray-300 p-2 rounded">
                </div>
                <div class="w-1/2">
                    <label class="block text-sm font-bold text-gray-700 mb-1">Localisation</label>
                    <input type="text" id="plotLocation" placeholder="ex: Allada" required class="w-full border border-gray-300 p-2 rounded">
                </div>
            </div>
            <button type="submit" class="w-full bg-brand text-white font-bold py-2 rounded shadow hover:bg-green-700">Enregistrer</button>`;

const newForm = `<div class="mb-4 flex gap-4">
                <div class="w-1/2">
                    <label class="block text-sm font-bold text-gray-700 mb-1">Superficie</label>
                    <input type="text" id="plotArea" placeholder="ex: 0.5 ha" required class="w-full border border-gray-300 p-2 rounded">
                </div>
                <div class="w-1/2">
                    <label class="block text-sm font-bold text-gray-700 mb-1">Localisation</label>
                    <input type="text" id="plotLocation" placeholder="ex: Allada" required class="w-full border border-gray-300 p-2 rounded">
                </div>
            </div>
            
            <!-- MODULE 3 -->
            <div class="mb-4 flex gap-4">
                <div class="w-1/2">
                    <label class="block text-sm font-bold text-gray-700 mb-1">Type de Sol</label>
                    <select id="plotSoil" class="w-full border border-gray-300 p-2 rounded text-sm">
                        <option value="Non précisé">Non précisé</option>
                        <option value="Sableux">Sableux (drainant)</option>
                        <option value="Argileux">Argileux (lourd)</option>
                        <option value="Limoneux">Limoneux (riche)</option>
                        <option value="Latéritique">Latéritique (rouge)</option>
                    </select>
                </div>
                <div class="w-1/2">
                    <label class="block text-sm font-bold text-gray-700 mb-1">Accès Eau</label>
                    <select id="plotWater" class="w-full border border-gray-300 p-2 rounded text-sm">
                        <option value="Pluvial">🌧️ Pluvial</option>
                        <option value="Irrigation (Goutte à goutte)">💧 Goutte à goutte</option>
                        <option value="Arrosage manuel">🪣 Manuel</option>
                    </select>
                </div>
            </div>
            
            <div class="mb-4">
                <label class="block text-sm font-bold text-gray-700 mb-1">Coordonnées GPS</label>
                <div class="flex gap-2">
                    <input type="text" id="plotGps" readonly placeholder="Non capturé" class="w-full border border-gray-300 p-2 rounded bg-gray-50 text-xs">
                    <button type="button" id="btnGps" class="bg-blue-100 text-blue-800 px-3 rounded border border-blue-200 hover:bg-blue-200 whitespace-nowrap text-sm font-bold"><i class="fas fa-map-marker-alt"></i> Capter</button>
                </div>
                <p id="gpsStatus" class="text-xs text-gray-500 mt-1"></p>
            </div>

            <button type="submit" class="w-full bg-brand text-white font-bold py-2 rounded shadow hover:bg-green-700 mt-2">Enregistrer</button>`;

html = html.replace(oldForm, newForm);

// 2. Modifying newPlot creation
const oldSubmit = `const newPlot = {
                cultureId: plotCultureSelect.value,
                date: document.getElementById('plotDate').value,
                area: document.getElementById('plotArea').value,
                location: document.getElementById('plotLocation').value
            };`;

const newSubmit = `const newPlot = {
                cultureId: plotCultureSelect.value,
                date: document.getElementById('plotDate').value,
                area: document.getElementById('plotArea').value,
                location: document.getElementById('plotLocation').value,
                soil: document.getElementById('plotSoil').value,
                water: document.getElementById('plotWater').value,
                gps: document.getElementById('plotGps').value
            };`;

html = html.replace(oldSubmit, newSubmit);

// 3. Modifying Plot display
const oldDisplay = `<h4 class="font-bold text-gray-800 text-lg">\${cData.nom} <span class="text-sm font-normal text-gray-500">(\${plot.area})</span></h4>
                                <p class="text-sm text-gray-600"><i class="fas fa-map-marker-alt"></i> \${plot.location} &nbsp;|&nbsp; Semis: \${sowDate.toLocaleDateString('fr-FR')}</p>`;

const newDisplay = `<h4 class="font-bold text-gray-800 text-lg">\${cData.nom} <span class="text-sm font-normal text-gray-500">(\${plot.area})</span></h4>
                                <p class="text-sm text-gray-600 mb-1"><i class="fas fa-map-marker-alt"></i> \${plot.location} &nbsp;|&nbsp; Semis: \${sowDate.toLocaleDateString('fr-FR')}</p>
                                <div class="flex flex-wrap gap-2 text-[10px] sm:text-xs">
                                    \${plot.soil && plot.soil !== 'Non précisé' ? \`<span class="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded shadow-sm">\${plot.soil}</span>\` : ''}
                                    \${plot.water ? \`<span class="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded shadow-sm">\${plot.water}</span>\` : ''}
                                    \${plot.gps ? \`<a href="https://maps.google.com/?q=\${plot.gps}" target="_blank" class="bg-gray-100 text-gray-700 border border-gray-300 px-2 py-0.5 rounded hover:bg-gray-200 shadow-sm transition"><i class="fas fa-satellite"></i> GPS</a>\` : ''}
                                </div>`;

html = html.replace(oldDisplay, newDisplay);

// 4. Modifying GPS script injection
const gpsLogic = `
        const btnGps = document.getElementById('btnGps');
        const plotGps = document.getElementById('plotGps');
        const gpsStatus = document.getElementById('gpsStatus');
        
        if (btnGps) {
            btnGps.addEventListener('click', () => {
                if (!navigator.geolocation) {
                    gpsStatus.textContent = "Géolocalisation non supportée.";
                    return;
                }
                gpsStatus.textContent = "Recherche en cours... patientez.";
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    plotGps.value = \`\${lat}, \${lon}\`;
                    gpsStatus.textContent = "Position enregistrée avec succès !";
                }, (error) => {
                    gpsStatus.textContent = "Erreur (vérifiez vos permissions GPS).";
                });
            });
        }
`;

if (!html.includes('btnGps.addEventListener')) {
    html = html.replace('// Handle Form Submit', gpsLogic + '\n        // Handle Form Submit');
}

fs.writeFileSync('carnet.html', html);
console.log('Module 3: Cartographie et Sol implémentés');
