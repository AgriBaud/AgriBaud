const fs = require('fs');
const html = fs.readFileSync('tomate.html', 'utf8');
const match = html.match(/<div class="old-content mt-8">([\s\S]*?)<\/main>/);
if(match) console.log(match[0]);
