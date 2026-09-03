const fs = require('fs');
const https = require('https');

const crops = [
  { id: 'morelle', query: 'Morelle noire' },
  { id: 'corete', query: 'Corète potagère' },
  { id: 'igname', query: 'Igname' },
  { id: 'patate', query: 'Patate douce' },
  { id: 'riz', query: 'Riz' },
  { id: 'sorgho', query: 'Sorgho commun' },
  { id: 'mil', query: 'Mil (céréale)' },
  { id: 'fonio', query: 'Fonio' },
  { id: 'niebe', query: 'Niébé' },
  { id: 'soja', query: 'Soja' },
  { id: 'arachide', query: 'Arachide' },
  { id: 'voandzou', query: 'Pois bambara' },
  { id: 'banane', query: 'Banane plantain' },
  { id: 'ananas', query: 'Ananas' },
  { id: 'mangue', query: 'Mangue' },
  { id: 'papaye', query: 'Papaye' },
  { id: 'avocat', query: 'Avocat (fruit)' },
  { id: 'orange', query: 'Orange (fruit)' },
  { id: 'citron', query: 'Citron' },
  { id: 'coton', query: 'Coton' },
  { id: 'sesame', query: 'Sésame' },
  { id: 'curcuma', query: 'Curcuma' }
];

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        file.close();
        fs.unlink(dest, () => reject(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err.message));
    });
  });
}

async function getWikipediaImage(query) {
  // 1. Search for the exact title
  const searchUrl = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srlimit=1`;
  const searchRes = await fetch(searchUrl).then(r => r.json());
  
  if (!searchRes.query || !searchRes.query.search || searchRes.query.search.length === 0) {
    return null;
  }
  
  const title = searchRes.query.search[0].title;
  
  // 2. Get the main image for this title
  const imgUrl = `https://fr.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json`;
  const imgRes = await fetch(imgUrl).then(r => r.json());
  
  const pages = imgRes.query.pages;
  const pageId = Object.keys(pages)[0];
  if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
    return pages[pageId].thumbnail.source;
  }
  
  return null;
}

async function processCrops() {
  console.log('Début du téléchargement des images...');
  for (const crop of crops) {
    try {
      console.log(`Recherche de : ${crop.query} (${crop.id}.jpg)...`);
      const imgUrl = await getWikipediaImage(crop.query);
      if (imgUrl) {
        console.log(`   Image trouvée : ${imgUrl}`);
        await downloadImage(imgUrl, `${crop.id}.jpg`);
        console.log(`   [OK] Sauvegardé en tant que ${crop.id}.jpg`);
      } else {
        console.log(`   [FAIL] Aucune image trouvée pour ${crop.query}`);
      }
    } catch (e) {
      console.log(`   [ERREUR] sur ${crop.query} :`, e.message);
    }
  }
  console.log('Terminé !');
}

processCrops();
