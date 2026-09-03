const fs = require('fs');

const userCrops = [
  {id:'amarante', nom:'Amarante', categorie:'Legumes Feuilles', image:'amarante.jpg'},
  {id:'morelle', nom:'Morelle Noire', categorie:'Legumes Feuilles', image:'morelle.jpg'},
  {id:'corete', nom:'Corète', categorie:'Legumes Feuilles', image:'corete.jpg'},
  {id:'chou', nom:'Chou', categorie:'Legumes Feuilles', image:'chou.jpg'},
  {id:'laitue', nom:'Laitue', categorie:'Legumes Feuilles', image:'laitue.jpg'},

  {id:'tomate', nom:'Tomate', categorie:'Legumes Fruits', image:'tomate.jpg'},
  {id:'piment', nom:'Piment', categorie:'Legumes Fruits', image:'piment.jpg'},
  {id:'poivron', nom:'Poivron', categorie:'Legumes Fruits', image:'poivron.jpg'},
  {id:'aubergine', nom:'Aubergine', categorie:'Legumes Fruits', image:'aubergine.jpg'},
  {id:'gombo', nom:'Gombo', categorie:'Legumes Fruits', image:'gombo.jpg'},
  {id:'concombre', nom:'Concombre', categorie:'Legumes Fruits', image:'concombre.jpg'},
  {id:'courgette', nom:'Courgette', categorie:'Legumes Fruits', image:'courgette.jpg'},

  {id:'manioc', nom:'Manioc', categorie:'Tubercules', image:'manioc.jpg'},
  {id:'igname', nom:'Igname', categorie:'Tubercules', image:'igname.jpg'},
  {id:'patate', nom:'Patate Douce', categorie:'Tubercules', image:'patate.jpg'},
  {id:'taro', nom:'Taro', categorie:'Tubercules', image:'taro.jpg'},

  {id:'mais', nom:'Maïs', categorie:'Cereales', image:'mais.jpg'},
  {id:'riz', nom:'Riz', categorie:'Cereales', image:'riz.jpg'},
  {id:'sorgho', nom:'Sorgho', categorie:'Cereales', image:'sorgho.jpg'},
  {id:'mil', nom:'Mil', categorie:'Cereales', image:'mil.jpg'},
  {id:'fonio', nom:'Fonio', categorie:'Cereales', image:'fonio.jpg'},

  {id:'haricot', nom:'Haricot', categorie:'Legumineuses', image:'haricot.jpg'},
  {id:'niebe', nom:'Niébé', categorie:'Legumineuses', image:'niebe.jpg'},
  {id:'soja', nom:'Soja', categorie:'Legumineuses', image:'soja.jpg'},
  {id:'arachide', nom:'Arachide', categorie:'Legumineuses', image:'arachide.jpg'},
  {id:'voandzou', nom:'Voandzou', categorie:'Legumineuses', image:'voandzou.jpg'},

  {id:'banane', nom:'Banane Plantain', categorie:'Fruitiers', image:'banane.jpg'},
  {id:'ananas', nom:'Ananas', categorie:'Fruitiers', image:'ananas.jpg'},
  {id:'mangue', nom:'Mangue', categorie:'Fruitiers', image:'mangue.jpg'},
  {id:'papaye', nom:'Papaye', categorie:'Fruitiers', image:'papaye.jpg'},
  {id:'avocat', nom:'Avocat', categorie:'Fruitiers', image:'avocat.jpg'},
  {id:'orange', nom:'Orange', categorie:'Fruitiers', image:'orange.jpg'},
  {id:'citron', nom:'Citron', categorie:'Fruitiers', image:'citron.jpg'},

  {id:'coton', nom:'Coton', categorie:'Cultures de Rente', image:'coton.jpg'},
  {id:'sesame', nom:'Sésame', categorie:'Cultures de Rente', image:'sesame.jpg'},

  {id:'gingembre', nom:'Gingembre', categorie:'Aromatiques', image:'gingembre.jpg'},
  {id:'curcuma', nom:'Curcuma', categorie:'Aromatiques', image:'curcuma.jpg'},
  {id:'basilic', nom:'Basilic', categorie:'Aromatiques', image:'basilic.jpg'},
  {id:'menthe', nom:'Menthe', categorie:'Aromatiques', image:'menthe.jpg'}
];

const dbContent = fs.readFileSync('db.js', 'utf8');
const dbCode = dbContent + '\nmodule.exports = DB;';
fs.writeFileSync('temp_db3.js', dbCode);
const DB = require('./temp_db3');

let addedCount = 0;

userCrops.forEach(c => {
    if (!DB.cultures[c.id]) {
        DB.cultures[c.id] = {
            id: c.id,
            nom: c.nom,
            saison: 'Toute saison (à confirmer)',
            duree_jours: 0,
            rendement: 'Non spécifié',
            zone_adaptee: 'Toutes zones',
            image: c.image,
            categorie: c.categorie,
            lien_vers_fichier: c.id + '.html',
            budget: { cout_intrants: 'N/A', cout_main_oeuvre: 'N/A', revenu_estime: 'N/A' },
            etapes: [
                { titre: 'Mise à jour en cours', description: 'Données en cours de collecte.', semaine: '-' }
            ],
            maladies_communes: []
        };
        addedCount++;
    } else {
        DB.cultures[c.id].categorie = c.categorie;
        DB.cultures[c.id].nom = c.nom; 
        DB.cultures[c.id].lien_vers_fichier = c.id + '.html';
    }

    const culture = DB.cultures[c.id];
    
    // Create basic HTML file if missing
    if (!fs.existsSync(c.id + '.html')) {
       const maladiesHtml = `<span class="text-gray-500 text-sm">Données en cours de collecte</span>`;
       const etapesHtml = `
          <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="bg-white p-4 rounded-xl shadow-sm border border-green-50">
                  <span class="text-xs font-bold text-brand bg-green-50 px-2 py-1 rounded inline-block mb-2">-</span>
                  <h4 class="font-bold text-gray-800 text-lg mb-1">Mise à jour en cours</h4>
                  <p class="text-gray-600 text-sm">Données en cours de collecte.</p>
              </div>
          </div>
       `;

       const newHtml = `<!DOCTYPE html>
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
    <div class="w-full h-48 rounded-2xl bg-cover bg-center mb-4 shadow-md relative overflow-hidden" style="background-image: url('${culture.image || 'tout.jpg'}');">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <h2 class="text-3xl font-bold text-white p-5">${culture.nom}</h2>
        </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <button id="btnShare" class="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl shadow transition flex justify-center items-center gap-2">
            <i class="fab fa-whatsapp text-xl"></i> Partager sur WhatsApp
        </button>
        <button id="btnPDF" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-xl shadow transition flex justify-center items-center gap-2">
            <i class="fas fa-download text-xl"></i> Télécharger en PDF
        </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-green-100 p-5 mb-6">
        <h3 class="text-lg font-bold text-brand mb-3 border-b pb-2"><i class="fas fa-info-circle"></i> Fiche d'identité</h3>
        <div class="grid grid-cols-2 gap-4 text-sm">
            <div><span class="text-gray-500 block">Saison idéale</span> <span class="font-semibold text-gray-800">${culture.saison}</span></div>
            <div><span class="text-gray-500 block">Cycle moyen</span> <span class="font-semibold text-gray-800">${culture.duree_jours} jours</span></div>
            <div><span class="text-gray-500 block">Rendement estimé</span> <span class="font-semibold text-gray-800">N/A</span></div>
            <div><span class="text-gray-500 block">Zone adaptée</span> <span class="font-semibold text-gray-800">Toutes zones</span></div>
        </div>
    </div>

    <div class="bg-green-50 rounded-xl shadow-sm border border-green-200 p-5 mb-6">
        <h3 class="text-lg font-bold text-green-900 mb-3"><i class="fas fa-wallet"></i> Budget estimatif (par Hectare)</h3>
        <ul class="space-y-2 text-sm">
            <li class="flex justify-between border-b border-green-200 pb-1">
                <span class="text-gray-700">Intrants :</span> <span class="font-bold text-red-600">N/A</span>
            </li>
            <li class="flex justify-between border-b border-green-200 pb-1">
                <span class="text-gray-700">Main d'œuvre :</span> <span class="font-bold text-red-600">N/A</span>
            </li>
            <li class="flex justify-between pt-1">
                <span class="text-green-900 font-bold">Revenu estimé :</span> <span class="font-bold text-green-700">N/A</span>
            </li>
        </ul>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-red-100 p-5 mb-6">
        <h3 class="text-lg font-bold text-red-700 mb-3"><i class="fas fa-exclamation-triangle"></i> Principaux Ennemis</h3>
        <div>${maladiesHtml}</div>
    </div>

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
  </main>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('btnShare').addEventListener('click', () => {
          let msg = "🌱 Guide ${culture.nom} A à Z\\nSaison: ${culture.saison} | Durée: ${culture.duree_jours} jours\\nÉtape 1: Mise à jour en cours\\nVoir le guide complet: " + window.location.href;
          window.open("https://wa.me/?text=" + encodeURIComponent(msg), '_blank');
      });

      document.getElementById('btnPDF').addEventListener('click', () => {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();
          doc.setFontSize(22); doc.setTextColor(22, 163, 74);
          doc.text("Guide Culture : ${culture.nom}", 20, 20);
          doc.setFontSize(12); doc.setTextColor(50, 50, 50);
          doc.text("Saison : ${culture.saison} | Duree : ${culture.duree_jours} jours", 20, 30);
          doc.text("Mise a jour en cours.", 20, 40);
          doc.save("Guide-${culture.nom}.pdf");
      });
    });
  </script>
</body>
</html>`;
           fs.writeFileSync(c.id + '.html', newHtml);
       }
});

const finalDbCode = 'const DB = ' + JSON.stringify(DB, null, 2) + ';';
fs.writeFileSync('db.js', finalDbCode);
fs.unlinkSync('temp_db3.js');
console.log('db.js updated. Added ' + addedCount + ' new cultures.');
