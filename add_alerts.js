const fs = require('fs');
let html = fs.readFileSync('carnet.html', 'utf8');

html = html.replace("if(typeof Chart === 'undefined') return;", "if(typeof Chart === 'undefined') { alert('Chart.js n\\'est pas chargé.'); return; }");

html = html.replace("chartFinInst = new Chart(ctxFin, {", "try { chartFinInst = new Chart(ctxFin, {");

html = html.replace("options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }\n            });", 
"options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }\n            });\n            } catch(e) { alert('Erreur Graphique: ' + e.message); }");

fs.writeFileSync('carnet.html', html);
console.log("Added alerts");
