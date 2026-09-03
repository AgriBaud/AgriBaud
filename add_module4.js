const fs = require('fs');

let html = fs.readFileSync('carnet.html', 'utf8');

// 1. Add Libraries
const libraries = `
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>
`;
if (!html.includes('chart.js')) {
    html = html.replace('</head>', libraries + '\n</head>');
}

// 2. Add Charts HTML
const chartsHtml = `
    <!-- MODULE 4 : STATS -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-white p-4 rounded-xl shadow-sm border border-green-100">
            <h4 class="font-bold text-gray-700 mb-2 text-center text-sm">Répartition des Cultures</h4>
            <div class="relative h-48 w-full flex justify-center"><canvas id="chartCultures"></canvas></div>
        </div>
        <div class="bg-white p-4 rounded-xl shadow-sm border border-green-100">
            <h4 class="font-bold text-gray-700 mb-2 text-center text-sm">Bilan Financier Global (FCFA)</h4>
            <div class="relative h-48 w-full flex justify-center"><canvas id="chartFinances"></canvas></div>
        </div>
    </div>
`;
if (!html.includes('id="chartCultures"')) {
    html = html.replace('<!-- Dashboard -->', chartsHtml + '\n    <!-- Dashboard -->');
}

// 3. Update Closed Plot UI (Regex)
const oldClosedUI = /financeUI = `\s*<div class="mt-3 p-3 \$\{benefColor\} rounded border flex justify-between items-center">\s*<div><span class="font-bold">Cl[^<]+:<\/span> B[^<]+fice net<\/div>\s*<div class="font-bold text-lg">\$\{benefice\.toLocaleString\('fr-FR'\)\} FCFA<\/div>\s*<\/div>\s*`;/m;

const newClosedUI = `financeUI = \`
                          <div class="mt-3 p-3 \${benefColor} rounded border">
                              <div class="flex justify-between items-center mb-2">
                                  <div><span class="font-bold">Clôturé :</span> Bénéfice net</div>
                                  <div class="font-bold text-lg">\${benefice.toLocaleString('fr-FR')} FCFA</div>
                              </div>
                              <button onclick="window.genererPDFBilan(\${index})" class="w-full text-xs bg-white text-gray-700 py-1 rounded border border-gray-300 hover:bg-gray-100 shadow-sm transition"><i class="fas fa-file-pdf text-red-500"></i> Télécharger Bilan PDF</button>
                          </div>
                      \`;`;

html = html.replace(oldClosedUI, newClosedUI);

// 4. Add Charts Logic to renderDashboard
const chartsLogic = `
            // --- UPDATE CHARTS ---
            window.mettreAJourGraphiques(plots);
`;

if (!html.includes('window.mettreAJourGraphiques')) {
    html = html.replace('// Sort and display next tasks', chartsLogic + '\n            // Sort and display next tasks');
}

// 5. Add Module 4 JS Functions at the bottom of the script
const mod4Functions = `
        // --- MODULE 4 : GRAPHIQUES ET PDF ---
        let chartCultInst = null;
        let chartFinInst = null;

        window.mettreAJourGraphiques = function(plotsListArg) {
            const ctxCult = document.getElementById('chartCultures');
            const ctxFin = document.getElementById('chartFinances');
            if(!ctxCult || !ctxFin) return;

            // Data for Cultures
            const counts = {};
            let totalDep = 0;
            let totalRev = 0;

            plotsListArg.forEach(p => {
                const cName = DB.cultures[p.cultureId] ? DB.cultures[p.cultureId].nom : p.cultureId;
                counts[cName] = (counts[cName] || 0) + 1;
                
                const dep = p.depenses ? p.depenses.reduce((s, d) => s + d.montant, 0) : 0;
                totalDep += dep;
                if(p.revenuFinal) totalRev += p.revenuFinal;
            });

            if(chartCultInst) chartCultInst.destroy();
            if(chartFinInst) chartFinInst.destroy();

            chartCultInst = new Chart(ctxCult, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(counts),
                    datasets: [{
                        data: Object.values(counts),
                        backgroundColor: ['#16a34a', '#86efac', '#3b82f6', '#fcd34d', '#f87171']
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { boxWidth: 12, font: {size: 10} } } } }
            });

            chartFinInst = new Chart(ctxFin, {
                type: 'bar',
                data: {
                    labels: ['Dépenses Globales', 'Revenus (Clôturés)'],
                    datasets: [{
                        label: 'FCFA',
                        data: [totalDep, totalRev],
                        backgroundColor: ['#ef4444', '#16a34a']
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
            });
        };

        window.genererPDFBilan = function(index) {
            const plot = plots[index];
            const cData = DB.cultures[plot.cultureId];
            if(!cData) return;

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Header
            doc.setFillColor(22, 163, 74);
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.text("BILAN DE CAMPAGNE AGRICOLE", 105, 20, { align: 'center' });
            doc.setFontSize(14);
            doc.text("Carnet de suivi - Conseiller Agricole", 105, 30, { align: 'center' });

            // Plot Info
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(16);
            doc.text("Informations de la Parcelle", 14, 55);
            
            doc.setFontSize(11);
            doc.text(\`Culture : \${cData.nom}\`, 14, 65);
            doc.text(\`Superficie : \${plot.area}\`, 14, 72);
            doc.text(\`Localisation : \${plot.location}\`, 14, 79);
            doc.text(\`Date de semis : \${new Date(plot.date).toLocaleDateString('fr-FR')}\`, 14, 86);
            if (plot.soil) doc.text(\`Type de sol : \${plot.soil}\`, 110, 65);
            if (plot.water) doc.text(\`Accès eau : \${plot.water}\`, 110, 72);
            if (plot.gps) doc.text(\`Coordonnées GPS : \${plot.gps}\`, 110, 79);

            // Finances Table
            doc.setFontSize(16);
            doc.text("Historique des Dépenses", 14, 105);

            const depensesData = (plot.depenses || []).map(d => [
                new Date(d.date).toLocaleDateString('fr-FR'),
                d.motif,
                d.montant.toLocaleString('fr-FR') + " FCFA"
            ]);
            
            const totalDep = (plot.depenses || []).reduce((s,d) => s + d.montant, 0);

            doc.autoTable({
                startY: 110,
                head: [['Date', 'Motif / Catégorie', 'Montant']],
                body: depensesData,
                foot: [['', 'TOTAL DES DÉPENSES', totalDep.toLocaleString('fr-FR') + ' FCFA']],
                theme: 'striped',
                headStyles: { fillColor: [22, 163, 74] },
                footStyles: { fillColor: [200, 200, 200], textColor: [0,0,0], fontStyle: 'bold' }
            });

            // Summary
            const finalY = doc.lastAutoTable.finalY + 20;
            doc.setFontSize(16);
            doc.text("Bilan Financier", 14, finalY);
            
            doc.setFontSize(12);
            doc.text(\`Revenu total de la vente : \${(plot.revenuFinal || 0).toLocaleString('fr-FR')} FCFA\`, 14, finalY + 10);
            doc.text(\`Total des dépenses : \${totalDep.toLocaleString('fr-FR')} FCFA\`, 14, finalY + 18);
            
            const benef = (plot.revenuFinal || 0) - totalDep;
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            if (benef >= 0) {
                doc.setTextColor(22, 163, 74);
                doc.text(\`BÉNÉFICE NET : \${benef.toLocaleString('fr-FR')} FCFA\`, 14, finalY + 30);
            } else {
                doc.setTextColor(220, 38, 38);
                doc.text(\`PERTE NETTE : \${benef.toLocaleString('fr-FR')} FCFA\`, 14, finalY + 30);
            }

            // Footer
            doc.setTextColor(150, 150, 150);
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text("Généré automatiquement par Conseiller Agricole A à Z", 105, 285, { align: 'center' });

            doc.save(\`Bilan_\${cData.nom.replace(/\\s+/g, '_')}.pdf\`);
        };
`;

if (!html.includes('window.genererPDFBilan')) {
    html = html.replace('// Handle Form Submit', mod4Functions + '\n        // Handle Form Submit');
}

fs.writeFileSync('carnet.html', html);
console.log('Module 4: Graphiques et PDF implémentés');
