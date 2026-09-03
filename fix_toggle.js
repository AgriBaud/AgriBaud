const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

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

if (!appJs.includes('function(plotIndex, tacheId, dateStr)')) {
    appJs += '\n' + toggleTacheCode;
    fs.writeFileSync('app.js', appJs);
    console.log('toggleTache added to app.js');
} else {
    console.log('toggleTache already present.');
}
