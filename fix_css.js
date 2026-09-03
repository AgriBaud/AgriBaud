const fs = require('fs');
let html = fs.readFileSync('carnet.html', 'utf8');

html = html.replace('<div class="relative h-48 w-full flex justify-center"><canvas id="chartCultures"></canvas></div>', '<div class="relative h-48 w-full"><canvas id="chartCultures"></canvas></div>');
html = html.replace('<div class="relative h-48 w-full flex justify-center"><canvas id="chartFinances"></canvas></div>', '<div class="relative h-48 w-full"><canvas id="chartFinances"></canvas></div>');

fs.writeFileSync('carnet.html', html);
console.log('Fixed chart containers CSS');
