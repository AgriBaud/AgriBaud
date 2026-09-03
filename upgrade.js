const fs = require('fs');

const exclude = ['index.html', 'diagnostic.html', 'carnet.html', 'marche.html', 'calendrier.html', 'alertes.html', 'apropos.html', 'marketplace.html', 'animation.html', 'parcelle.html', 'plante.html', 'reconnaissance.html', 'agronome-ia.html', 'catalogue-complet.html', 'culture.html'];
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !exclude.includes(f));

const dbContent = fs.readFileSync('db.js', 'utf8');
const dbCode = dbContent + '\nmodule.exports = DB;';
fs.writeFileSync('temp_db.js', dbCode);
const DB = require('./temp_db');

files.forEach(f => {
    const id = f.replace('.html', '');
    const oldHtml = fs.readFileSync(f, 'utf8');
    
    // Extract old content between <body> and <script> roughly
    let extractedOldContent = '';
    const bodyMatch = oldHtml.match(/<body[^>]*>([\s\S]*?)<script>/i);
    if(bodyMatch) {
        // clean up old back button and search bar if any
        extractedOldContent = bodyMatch[1]
            .replace(/<div class="back-btn[\s\S]*?<\/div>/g, '')
            .replace(/<input type="text" id="searchInput"[\s\S]*?>/g, '');
    } else {
        extractedOldContent = '<p>Détails spécifiques non trouvés.</p>';
    }

    const culture = DB.cultures[id];
    if(!culture) return;

    // Build static Tailwind HTML for this specific file
    const maladies = culture.maladies_communes || [];
    const maladiesHtml = maladies.length > 0 
      ? maladies.map(m => `<span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded border border-red-200 mr-2 mb-2 inline-block"><i class="fas fa-bug"></i> ${m}</span>`).join('')
      : `<span class="text-gray-500 text-sm">Données en cours de collecte</span>`;

    const budget = culture.budget || { cout_intrants: 'N/A', cout_main_oeuvre: 'N/A', revenu_estime: 'N/A' };
    const etapes = culture.etapes || [{ titre: 'Mise à jour en cours', description: 'Données en cours de collecte.', semaine: '-' }];

    const etapesHtml = etapes.map((etape) => `
      <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="bg-white p-4 rounded-xl shadow-sm border border-green-50">
              <span class="text-xs font-bold text-brand bg-green-50 px-2 py-1 rounded inline-block mb-2">${etape.semaine}</span>
              <h4 class="font-bold text-gray-800 text-lg mb-1">${etape.titre}</h4>
              <p class="text-gray-600 text-sm">${etape.description}</p>
          </div>
      </div>
    `).join('');

    let newHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guide Culture - ${culture.nom}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = { theme: { extend: { colors: { brand: '#16a34a', bgLight: '#f0fdf4' } } } }
  </script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <style>
    body { font-family: 'Segoe UI', system-ui, sans-serif; }
    .timeline-container { position: relative; padding-left: 30px; margin-top: 20px; }
    .timeline-container::before { content: ''; position: absolute; left: 11px; top: 0; height: 100%; width: 4px; background: #bbf7d0; border-radius: 4px; }
    .timeline-item { position: relative; margin-bottom: 25px; }
    .timeline-dot { position: absolute; left: -30px; top: 4px; width: 24px; height: 24px; background: #16a34a; border: 4px solid #f0fdf4; border-radius: 50%; z-index: 10; }
    /* Styles pour l'ancien contenu */
    .old-content .big-card { background: white; border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1.5rem; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); border: 1px solid #dcfce7; }
    .old-content h2.card-title { color: #166534; font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; border-bottom: 2px solid #bbf7d0; padding-bottom: 0.5rem; }
    .old-content h3 { color: #15803d; font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem; }
    .old-content p { color: #4b5563; font-size: 0.875rem; margin-bottom: 0.5rem; }
    .old-content ul { list-style-type: disc; margin-left: 1.25rem; color: #4b5563; font-size: 0.875rem; margin-bottom: 1rem; }
    .old-content li { margin-bottom: 0.25rem; }
  </style>
</head>
<body class="bg-bgLight text-gray-800 flex flex-col min-h-screen">

  <header class="bg-brand text-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center gap-3">
        <a href="index.html" class="text-white text-xl hover:text-green-200"><i class="fas fa-arrow-left"></i> Retour Accueil</a>
        <h1 class="text-xl font-bold leading-tight">Guide : ${culture.nom}</h1>
      </div>
    </div>
  </header>

  <main class="flex-grow container mx-auto px-4 py-6 max-w-3xl">
    <!-- Hero Image -->
    <div class="w-full h-48 rounded-2xl bg-cover bg-center mb-4 shadow-md relative overflow-hidden" style="background-image: url('${culture.image || 'tout.jpg'}');">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <h2 class="text-3xl font-bold text-white p-5">${culture.nom}</h2>
        </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <button id="btnShare" class="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl shadow transition flex justify-center items-center gap-2">
            <i class="fab fa-whatsapp text-xl"></i> Partager sur WhatsApp
        </button>
        <button id="btnPDF" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-xl shadow transition flex justify-center items-center gap-2">
            <i class="fas fa-download text-xl"></i> Télécharger en PDF
        </button>
    </div>

    <!-- Fiche technique -->
    <div class="bg-white rounded-xl shadow-sm border border-green-100 p-5 mb-6">
        <h3 class="text-lg font-bold text-brand mb-3 border-b pb-2"><i class="fas fa-info-circle"></i> Fiche d'identité</h3>
        <div class="grid grid-cols-2 gap-4 text-sm">
            <div><span class="text-gray-500 block">Saison idéale</span> <span class="font-semibold text-gray-800">${culture.saison}</span></div>
            <div><span class="text-gray-500 block">Cycle moyen</span> <span class="font-semibold text-gray-800">${culture.duree_jours} jours</span></div>
            <div><span class="text-gray-500 block">Rendement estimé</span> <span class="font-semibold text-gray-800">${culture.rendement || 'N/A'}</span></div>
            <div><span class="text-gray-500 block">Zone adaptée</span> <span class="font-semibold text-gray-800">${culture.zone_adaptee || 'N/A'}</span></div>
        </div>
    </div>

    <!-- Budget -->
    <div class="bg-green-50 rounded-xl shadow-sm border border-green-200 p-5 mb-6">
        <h3 class="text-lg font-bold text-green-900 mb-3"><i class="fas fa-wallet"></i> Budget estimatif (par Hectare)</h3>
        <ul class="space-y-2 text-sm">
            <li class="flex justify-between border-b border-green-200 pb-1">
                <span class="text-gray-700">Intrants :</span> <span class="font-bold text-red-600">${budget.cout_intrants}</span>
            </li>
            <li class="flex justify-between border-b border-green-200 pb-1">
                <span class="text-gray-700">Main d'œuvre :</span> <span class="font-bold text-red-600">${budget.cout_main_oeuvre}</span>
            </li>
            <li class="flex justify-between pt-1">
                <span class="text-green-900 font-bold">Revenu estimé :</span> <span class="font-bold text-green-700">${budget.revenu_estime}</span>
            </li>
        </ul>
    </div>

    <!-- Maladies fréquentes -->
    <div class="bg-white rounded-xl shadow-sm border border-red-100 p-5 mb-6">
        <h3 class="text-lg font-bold text-red-700 mb-3"><i class="fas fa-exclamation-triangle"></i> Principaux Ennemis</h3>
        <div>${maladiesHtml}</div>
    </div>

    <!-- Itinéraire Technique / Timeline -->
    <div class="mb-10">
        <h3 class="text-xl font-bold text-brand mb-4 flex items-center gap-2"><i class="fas fa-route"></i> Itinéraire Technique A à Z</h3>
        <div class="timeline-container">
            ${etapesHtml}
        </div>
    </div>
    
    <div class="text-center pb-8">
        <a href="carnet.html?culture=${culture.id}" class="bg-brand text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition inline-block">
            <i class="fas fa-plus-circle"></i> Ajouter à mon Carnet
        </a>
    </div>

    <!-- ANCIEN CONTENU RESTAURÉ (Détails approfondis) -->
    <div class="old-content mt-8">
        <h3 class="text-2xl font-bold text-green-800 mb-4 border-b-2 border-green-300 pb-2">Détails et Astuces (Archive)</h3>
        ${extractedOldContent}
    </div>
  </main>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('btnShare').addEventListener('click', () => {
          let msg = "🌱 Guide ${culture.nom} A à Z\\nSaison: ${culture.saison} | Durée: ${culture.duree_jours} jours\\n";
          ${etapes.length > 0 ? `msg += "Étape 1: ${etapes[0].titre.replace(/`/g, "'")}\\n";` : ''}
          ${etapes.length > 1 ? `msg += "Étape 2: ${etapes[1].titre.replace(/`/g, "'")}\\n";` : ''}
          msg += "Voir le guide complet: " + window.location.href;
          window.open("https://wa.me/?text=" + encodeURIComponent(msg), '_blank');
      });

      document.getElementById('btnPDF').addEventListener('click', () => {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();
          let yPos = 20;
          doc.setFontSize(22); doc.setTextColor(22, 163, 74);
          doc.text("Guide Culture : ${culture.nom}", 20, yPos); yPos += 10;
          doc.setFontSize(12); doc.setTextColor(50, 50, 50);
          doc.text("Saison : ${culture.saison} | Duree : ${culture.duree_jours} jours", 20, yPos); yPos += 15;
          doc.setFontSize(16); doc.setTextColor(0, 0, 0);
          doc.text("Budget estimatif (par Ha)", 20, yPos); yPos += 8;
          doc.setFontSize(12);
          doc.text("- Intrants : ${culture.budget ? culture.budget.cout_intrants : 'N/A'}", 25, yPos); yPos += 6;
          doc.text("- Main d'oeuvre : ${culture.budget ? culture.budget.cout_main_oeuvre : 'N/A'}", 25, yPos); yPos += 6;
          doc.text("- Revenu estime : ${culture.budget ? culture.budget.revenu_estime : 'N/A'}", 25, yPos); yPos += 15;
          doc.setFontSize(16); doc.text("Itineraire Technique", 20, yPos); yPos += 10;
          doc.setFontSize(11);
          const etapesArr = ${JSON.stringify(etapes)};
          etapesArr.forEach((etape) => {
              if (yPos > 270) { doc.addPage(); yPos = 20; }
              doc.setFont("helvetica", "bold"); doc.text("[" + etape.semaine + "] " + etape.titre, 20, yPos); yPos += 6;
              doc.setFont("helvetica", "normal");
              const splitDesc = doc.splitTextToSize(etape.description, 170);
              doc.text(splitDesc, 20, yPos);
              yPos += (splitDesc.length * 6) + 6;
          });
          doc.save("Guide-${culture.nom}.pdf");
      });
    });
  </script>
</body>
</html>`;
    
    fs.writeFileSync(f, newHtml);
});

// Update index.html logic
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/culture\.html\?id=\$\{culture\.id\}/g, '${culture.id}.html');
fs.writeFileSync('index.html', indexHtml);

// Update db.js logic to include lien_vers_fichier
for (let id in DB.cultures) {
    DB.cultures[id].lien_vers_fichier = id + '.html';
}
const finalDbCode = 'const DB = ' + JSON.stringify(DB, null, 2) + ';';
fs.writeFileSync('db.js', finalDbCode);
fs.unlinkSync('temp_db.js');

console.log('Successfully upgraded ' + files.length + ' files!');
