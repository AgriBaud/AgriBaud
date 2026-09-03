const fs = require('fs');

try {
    let indexHtml = fs.readFileSync('index.html', 'utf8');
    indexHtml = indexHtml.replace(/<title>.*?<\/title>/gi, '<title>AgriBaud+ - Plateforme Agricole</title>');
    indexHtml = indexHtml.replace(/<h1 class="text-xl font-bold leading-tight">Conseiller Agricole<br><span class="text-xs font-normal">.*?<\/span><\/h1>/gi, '<h1 class="text-xl font-bold leading-tight">AgriBaud+<br><span class="text-xs font-normal">Le standard agricole</span></h1>');
    indexHtml = indexHtml.replace(/Conseiller Agricole A à Z/gi, 'AgriBaud+');
    indexHtml = indexHtml.replace(/Conseiller Agricole/gi, 'AgriBaud+');
    fs.writeFileSync('index.html', indexHtml);
    console.log('index.html updated');
} catch(e) { console.log(e); }

try {
    let carnetHtml = fs.readFileSync('carnet.html', 'utf8');
    carnetHtml = carnetHtml.replace(/<title>.*?<\/title>/gi, '<title>Mon Carnet - AgriBaud+</title>');
    carnetHtml = carnetHtml.replace(/Carnet de suivi - Conseiller Agricole/gi, 'Carnet de suivi - AgriBaud+');
    carnetHtml = carnetHtml.replace(/Généré automatiquement par Conseiller Agricole(.*?Z)?/gi, 'Généré automatiquement par AgriBaud+');
    carnetHtml = carnetHtml.replace(/G(.{1,2})n(.{1,2})r(.{1,2}) automatiquement par Conseiller Agricole(.*?Z)?/gi, 'Généré automatiquement par AgriBaud+');
    carnetHtml = carnetHtml.replace(/Conseiller Agricole A à Z/gi, 'AgriBaud+');
    carnetHtml = carnetHtml.replace(/Conseiller Agricole/gi, 'AgriBaud+');
    fs.writeFileSync('carnet.html', carnetHtml);
    console.log('carnet.html updated');
} catch(e) { console.log(e); }

const files = fs.readdirSync('./');
files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html' && file !== 'carnet.html') {
        let content = fs.readFileSync(file, 'utf8');
        let changed = false;
        if (content.includes('Conseiller Agricole')) {
            content = content.replace(/Conseiller Agricole A à Z/gi, 'AgriBaud+');
            content = content.replace(/Conseiller Agricole/gi, 'AgriBaud+');
            changed = true;
        }
        if (changed) {
            fs.writeFileSync(file, content);
            console.log('Updated ' + file);
        }
    }
});
