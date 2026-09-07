const fs = require('fs');

try {
    let carnetHtml = fs.readFileSync('carnet.html', 'utf8');
    
    // Remplacer les options de géolocalisation pour qu'elles soient adaptées aux téléphones
    carnetHtml = carnetHtml.replace(
        /{ enableHighAccuracy: true, timeout: 10000 }/g,
        '{ enableHighAccuracy: false, timeout: 20000, maximumAge: 0 }'
    );
    
    // Modifier le message d'erreur pour être plus clair
    carnetHtml = carnetHtml.replace(
        /Erreur: Activez la localisation./g,
        'Erreur: Activez le GPS et autorisez le navigateur.'
    );

    fs.writeFileSync('carnet.html', carnetHtml);
    console.log('Mobile GPS fix applied.');
} catch (e) {
    console.log(e);
}
