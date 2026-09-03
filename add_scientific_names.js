const fs = require('fs');

const scientificNames = {
  'tomate': 'Solanum lycopersicum',
  'piment': 'Capsicum spp.',
  'poivron': 'Capsicum annuum',
  'aubergine': 'Solanum melongena',
  'gombo': 'Abelmoschus esculentus',
  'concombre': 'Cucumis sativus',
  'courgette': 'Cucurbita pepo',
  'amarante': 'Amaranthus spp.',
  'morelle': 'Solanum nigrum',
  'corete': 'Corchorus olitorius',
  'chou': 'Brassica oleracea',
  'laitue': 'Lactuca sativa',
  'manioc': 'Manihot esculenta',
  'igname': 'Dioscorea spp.',
  'patate': 'Ipomoea batatas',
  'taro': 'Colocasia esculenta',
  'mais': 'Zea mays',
  'riz': 'Oryza sativa',
  'sorgho': 'Sorghum bicolor',
  'mil': 'Pennisetum glaucum',
  'fonio': 'Digitaria exilis',
  'haricot': 'Phaseolus vulgaris',
  'niebe': 'Vigna unguiculata',
  'soja': 'Glycine max',
  'arachide': 'Arachis hypogaea',
  'voandzou': 'Vigna subterranea',
  'banane': 'Musa spp.',
  'ananas': 'Ananas comosus',
  'mangue': 'Mangifera indica',
  'papaye': 'Carica papaya',
  'avocat': 'Persea americana',
  'orange': 'Citrus sinensis',
  'citron': 'Citrus limon',
  'coton': 'Gossypium spp.',
  'sesame': 'Sesamum indicum',
  'gingembre': 'Zingiber officinale',
  'curcuma': 'Curcuma longa',
  'basilic': 'Ocimum basilicum',
  'menthe': 'Mentha spp.',
  'ail': 'Allium sativum',
  'betterave': 'Beta vulgaris',
  'brocoli': 'Brassica oleracea var. italica',
  'carotte': 'Daucus carota',
  'celeri': 'Apium graveolens',
  'chou-rave': 'Brassica oleracea var. gongylodes',
  'chou_fleur': 'Brassica oleracea var. botrytis',
  'coriandre': 'Coriandrum sativum',
  'courge': 'Cucurbita spp.',
  'cresson': 'Nasturtium officinale',
  'epinard': 'Spinacia oleracea',
  'feve': 'Vicia faba',
  'mais-doux': 'Zea mays var. saccharata',
  'melon': 'Cucumis melo',
  'navet': 'Brassica rapa subsp. rapa',
  'oignon': 'Allium cepa',
  'oignon_vert': 'Allium fistulosum',
  'panais': 'Pastinaca sativa',
  'pasteque': 'Citrullus lanatus',
  'patisson': 'Cucurbita pepo var. ovifera',
  'persil': 'Petroselinum crispum',
  'piment_africain': 'Capsicum chinense',
  'poireau': 'Allium porrum',
  'pois': 'Pisum sativum',
  'pois-chiche': 'Cicer arietinum',
  'pomme_de_terre': 'Solanum tuberosum',
  'potiron': 'Cucurbita maxima',
  'radis': 'Raphanus sativus',
  'radis-noir': 'Raphanus sativus var. niger',
  'salsifis': 'Tragopogon porrifolius',
  'talinum': 'Talinum triangulare',
  'topinambour': 'Helianthus tuberosus'
};

const dbContent = fs.readFileSync('db.js', 'utf8');
const dbCode = dbContent + '\nmodule.exports = DB;';
fs.writeFileSync('temp_db5.js', dbCode);
const DB = require('./temp_db5');

let updatedCount = 0;

for (let id in DB.cultures) {
    if (scientificNames[id]) {
        DB.cultures[id].nom_scientifique = scientificNames[id];
    } else {
        DB.cultures[id].nom_scientifique = 'Espèce non précisée';
    }
    updatedCount++;
}

const finalDbCode = 'const DB = ' + JSON.stringify(DB, null, 2) + ';';
fs.writeFileSync('db.js', finalDbCode);
fs.unlinkSync('temp_db5.js');

console.log('db.js updated with scientific names for ' + updatedCount + ' cultures.');
