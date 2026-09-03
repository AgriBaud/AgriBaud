const fs = require('fs');

// --- UPDATE INDEX.HTML ---
try {
    let indexHtml = fs.readFileSync('index.html', 'utf8');
    
    // Title
    indexHtml = indexHtml.replace(/<title>Conseiller Agricole.*?<\/title>/gi, '<title>AgriBaud+ - Plateforme Agricole</title>');
    
    // Header 1
    indexHtml = indexHtml.replace(
        /<h1 class="text-xl font-bold leading-tight">Conseiller Agricole<br><span class="text-xs font-normal">A [^<]+<\/span><\/h1>/gi,
        '<h1 class="text-xl font-bold leading-tight">AgriBaud+<br><span class="text-xs font-normal">L\\'excellence agricole</span></h1>'
    );
    
    // Footer h4
    indexHtml = indexHtml.replace(/<h4 class="text-white text-lg font-bold mb-3">Conseiller Agricole.*?<\/h4>/gi, '<h4 class="text-white text-lg font-bold mb-3">AgriBaud+</h4>');
    
    // Fallback global replace if any remain
    indexHtml = indexHtml.replace(/Conseiller Agricole A (à|) Z/gi, 'AgriBaud+');
    indexHtml = indexHtml.replace(/Conseiller Agricole/gi, 'AgriBaud+');
    
    fs.writeFileSync('index.html', indexHtml);
    console.log('index.html updated successfully.');
} catch (e) {
    console.log('Error updating index.html:', e.message);
}

// --- UPDATE CARNET.HTML ---
try {
    let carnetHtml = fs.readFileSync('carnet.html', 'utf8');
    
    // Title
    carnetHtml = carnetHtml.replace(/<title>Mon Carnet - Conseiller Agricole<\/title>/gi, '<title>Mon Carnet - AgriBaud+</title>');
    
    // PDF Header
    carnetHtml = carnetHtml.replace(/Carnet de suivi - Conseiller Agricole/gi, 'Carnet de suivi - AgriBaud+');
    
    // PDF Footer
    carnetHtml = carnetHtml.replace(/Généré automatiquement par Conseiller Agricole(.*?Z)?/gi, 'Généré automatiquement par AgriBaud+');
    carnetHtml = carnetHtml.replace(/G(|é)n(|é)r(|é) automatiquement par Conseiller Agricole(.*?Z)?/gi, 'Généré automatiquement par AgriBaud+');
    
    // Fallback global replace
    carnetHtml = carnetHtml.replace(/Conseiller Agricole A (à|) Z/gi, 'AgriBaud+');
    carnetHtml = carnetHtml.replace(/Conseiller Agricole/gi, 'AgriBaud+');
    
    fs.writeFileSync('carnet.html', carnetHtml);
    console.log('carnet.html updated successfully.');
} catch (e) {
    console.log('Error updating carnet.html:', e.message);
}

// Check other files just in case
const files = fs.readdirSync('./');
files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html' && file !== 'carnet.html') {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes('Conseiller Agricole')) {
            content = content.replace(/Conseiller Agricole A (à|) Z/gi, 'AgriBaud+');
            content = content.replace(/Conseiller Agricole/gi, 'AgriBaud+');
            fs.writeFileSync(file, content);
            console.log(`Updated ${file}`);
        }
    }
});
