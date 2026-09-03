const fs = require('fs');

const logoHtml = '<img src="LOGO.jpeg" alt="Logo AgriBaud+" class="h-10 w-10 rounded-full bg-white object-cover border-2 border-white shadow-sm">';

// --- UPDATE index.html ---
try {
    let indexHtml = fs.readFileSync('index.html', 'utf8');
    // Replace the leaf icon with the logo
    indexHtml = indexHtml.replace(/<i class="fas fa-leaf text-2xl"><\/i>/g, logoHtml);
    fs.writeFileSync('index.html', indexHtml);
    console.log('Logo added to index.html');
} catch (e) {
    console.log('Error updating index.html:', e);
}

// --- UPDATE carnet.html ---
try {
    let carnetHtml = fs.readFileSync('carnet.html', 'utf8');
    // We want to insert the logo right after the back arrow link
    const searchString = '<a href="index.html" class="text-white text-xl hover:text-green-200"><i class="fas fa-arrow-left"></i></a>';
    if (carnetHtml.includes(searchString) && !carnetHtml.includes('LOGO.jpeg')) {
        carnetHtml = carnetHtml.replace(searchString, searchString + '\n        ' + logoHtml);
        fs.writeFileSync('carnet.html', carnetHtml);
        console.log('Logo added to carnet.html');
    }
} catch (e) {
    console.log('Error updating carnet.html:', e);
}
