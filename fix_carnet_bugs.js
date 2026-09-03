const fs = require('fs');
let html = fs.readFileSync('carnet.html', 'utf8');

// Fix 1: The crash in etape.semaine
html = html.replace(
    /let match = etape\.semaine\.match\(\/\\d\+\/\);\s*let daysToAdd = match \? parseInt\(match\[0\]\) \* 7 : 0;/g,
    'let daysToAdd = etape.jour !== undefined ? etape.jour : (etape.semaine && etape.semaine.match(/\\\\d+/) ? parseInt(etape.semaine.match(/\\\\d+/)[0]) * 7 : 0);'
);

// Fix 2: Inject Module 4 functions that were missing
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

            // Check if Chart is defined before using it
            if(typeof Chart === 'undefined') return;

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

            if(typeof window.jspdf === 'undefined') {
                alert("Erreur: le module PDF n'est pas encore chargé.");
                return;
            }
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

            if(doc.autoTable) {
                doc.autoTable({
                    startY: 110,
                    head: [['Date', 'Motif / Catégorie', 'Montant']],
                    body: depensesData,
                    foot: [['', 'TOTAL DES DÉPENSES', totalDep.toLocaleString('fr-FR') + ' FCFA']],
                    theme: 'striped',
                    headStyles: { fillColor: [22, 163, 74] },
                    footStyles: { fillColor: [200, 200, 200], textColor: [0,0,0], fontStyle: 'bold' }
                });
            } else {
                doc.text("Tableau des dépenses indisponible", 14, 120);
            }

            // Summary
            const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 150;
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

            doc.save(\`Bilan_\${cData.nom.replace(/\\s+/g, '_')}.pdf\`);
        };
`;

if (!html.includes('window.genererPDFBilan = function')) {
    html = html.replace('});\n  </script>', '    ' + mod4Functions + '\n    });\n  </script>');
    fs.writeFileSync('carnet.html', html);
    console.log('Fixes appliqués');
} else {
    console.log('Les fonctions sont déjà là');
}
