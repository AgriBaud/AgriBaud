const fs = require('fs');

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
    const res = await fetch(url, { headers: { 'User-Agent': 'ConseillerAgricoleBot/1.0 (contact@example.com)' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);
}

async function getWikipediaImage(query) {
  const searchUrl = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srlimit=1`;
  const searchRes = await fetch(searchUrl, { headers: { 'User-Agent': 'ConseillerAgricoleBot/1.0' } }).then(r => r.json());
  if (!searchRes.query || !searchRes.query.search || searchRes.query.search.length === 0) return null;
  
  const title = searchRes.query.search[0].title;
  const imgUrl = `https://fr.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json`;
  const imgRes = await fetch(imgUrl, { headers: { 'User-Agent': 'ConseillerAgricoleBot/1.0' } }).then(r => r.json());
  
  const pages = imgRes.query.pages;
  const pageId = Object.keys(pages)[0];
  if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) return pages[pageId].thumbnail.source;
  return null;
}

async function processCrops() {
  for (const crop of crops) {
    try {
      const imgUrl = await getWikipediaImage(crop.query);
      if (imgUrl) {
        await downloadImage(imgUrl, crop.id + '.jpg');
        console.log('[OK] ' + crop.id + '.jpg');
      } else {
        console.log('[FAIL] ' + crop.id);
      }
    } catch (e) {
      console.log('[ERREUR] ' + crop.id + ' : ' + e.message);
    }
  }
}
processCrops();
