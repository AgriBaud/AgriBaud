const fs = require('fs');
let html = fs.readFileSync('carnet.html', 'utf8');
if (!html.includes('app.js')) {
    html = html.replace('</body>', '  <script src="app.js"></script>\n</body>');
    fs.writeFileSync('carnet.html', html);
}
