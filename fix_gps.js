const fs = require('fs');

const gpsLogic = `
        const btnGps = document.getElementById('btnGps');
        const plotGps = document.getElementById('plotGps');
        const gpsStatus = document.getElementById('gpsStatus');
        
        if (btnGps) {
            btnGps.addEventListener('click', () => {
                if (!navigator.geolocation) {
                    gpsStatus.innerText = "Non supporté par votre navigateur.";
                    return;
                }
                gpsStatus.innerText = "Recherche satellite en cours...";
                gpsStatus.className = "text-xs text-blue-500 mt-1 animate-pulse";
                
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        plotGps.value = pos.coords.latitude.toFixed(4) + ', ' + pos.coords.longitude.toFixed(4);
                        gpsStatus.innerText = "Position capturée !";
                        gpsStatus.className = "text-xs text-green-500 mt-1 font-bold";
                    },
                    (err) => {
                        gpsStatus.innerText = "Erreur: Activez la localisation.";
                        gpsStatus.className = "text-xs text-red-500 mt-1";
                        console.error(err);
                    },
                    { enableHighAccuracy: true, timeout: 10000 }
                );
            });
        }
`;

try {
    let carnetHtml = fs.readFileSync('carnet.html', 'utf8');
    
    // Insert after plotCultureSelect is defined
    const insertionPoint = "const plotCultureSelect = document.getElementById('plotCulture');";
    
    if (carnetHtml.includes(insertionPoint) && !carnetHtml.includes('btnGps.addEventListener')) {
        carnetHtml = carnetHtml.replace(insertionPoint, insertionPoint + '\n' + gpsLogic);
        fs.writeFileSync('carnet.html', carnetHtml);
        console.log('GPS logic injected successfully.');
    }
} catch(e) {
    console.log(e);
}
