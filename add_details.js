const fs = require('fs');

const dbContent = fs.readFileSync('db.js', 'utf8');
const dbCode = dbContent + '\nmodule.exports = DB;';
fs.writeFileSync('temp_db4.js', dbCode);
const DB = require('./temp_db4');

const exclude = ['index.html', 'diagnostic.html', 'carnet.html', 'marche.html', 'calendrier.html', 'alertes.html', 'apropos.html', 'marketplace.html', 'animation.html', 'parcelle.html', 'plante.html', 'reconnaissance.html', 'agronome-ia.html', 'catalogue-complet.html', 'culture.html'];
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !exclude.includes(f));

let modifiedCount = 0;

files.forEach(f => {
    const id = f.replace('.html', '');
    const culture = DB.cultures[id];
    if(!culture) return;

    let content = fs.readFileSync(f, 'utf8');

    // Check if it already has old-content
    if (!content.includes('class="old-content mt-8"')) {
        const nom = culture.nom;
        
        const detailsHtml = `
    <div class="old-content mt-8">
        <h3 class="text-2xl font-bold text-green-800 mb-4 border-b-2 border-green-300 pb-2">Détails et Astuces (Archive)</h3>
        
        <header style="display:none;">Culture de ${nom}</header>
        
        <div class="horizontal-scroll">
        
        <!----------------------------- 1. DESCRIPTION ------------------------------>
        <div class="big-card">
            <h2 class="card-title">📘 Description Générale</h2>
            <div class="card-content">
                <ul>
                    <li>🌱 Plante cultivée pour ses propriétés nutritives et économiques.</li>
                    <li>💰 Culture très rentable et prisée sur les marchés locaux et urbains.</li>
                    <li>🌡️ Nécessite une exposition ensoleillée et un climat adapté.</li>
                    <li>🌍 Adaptable à la majorité des sols profonds et bien drainés.</li>
                </ul>
            </div>
        </div>
        
        <!----------------------------- 2. ITINÉRAIRE ------------------------------>
        <div class="big-card">
            <h2 class="card-title">🌱 Itinéraire Technique</h2>
            <div class="card-content">
                <ul>
                    <li><strong>1. Préparation du sol :</strong> Labour profond, ameublissement et apport généreux de fumure organique (compost ou fumier).</li>
                    <li><strong>2. Mise en place :</strong> Semis direct ou repiquage selon les variétés. Respecter les densités de plantation.</li>
                    <li><strong>3. Entretien :</strong> Sarclages réguliers, binages et gestion de l'enherbement.</li>
                    <li><strong>4. Irrigation :</strong> Apport d'eau régulier, particulièrement en phase de croissance active et de floraison/fructification.</li>
                </ul>
            </div>
        </div>
        
        <!----------------------------- 3. CYCLE ------------------------------>
        <div class="big-card">
            <h2 class="card-title">⏳ Cycle & Durée</h2>
            <div class="card-content">
                <ul>
                    <li><strong>Durée du cycle :</strong> Variable selon la variété (généralement entre 60 et 120 jours).</li>
                    <li><strong>Maturité :</strong> Récolter à pleine maturité commerciale pour une meilleure conservation et valorisation.</li>
                    <li><strong>Saison :</strong> Peut se cultiver en saison des pluies ou en contre-saison avec un système d'irrigation.</li>
                </ul>
            </div>
        </div>
        
        <!----------------------------- 4. MALADIES ------------------------------>
        <div class="big-card">
            <h2 class="card-title">⚠️ Maladies & Ravageurs</h2>
            <div class="card-content">
                <p><strong>Principaux ennemis de la culture :</strong></p>
                <ul>
                    <li>🐛 <strong>Insectes piqueurs-suceurs :</strong> Pucerons, mouches blanches, altises.</li>
                    <li>🍄 <strong>Maladies fongiques :</strong> Fonte des semis, mildiou, oïdium (en cas de forte humidité).</li>
                    <li>🪱 <strong>Nématodes :</strong> Affectent les racines si la rotation n'est pas respectée.</li>
                </ul>
            </div>
        </div>
        
        <!----------------------------- 5. PRATIQUES ------------------------------>
        <div class="big-card">
            <h2 class="card-title">💡 Bonnes Pratiques</h2>
            <div class="card-content">
                <ul>
                    <li>✅ <strong>Rotation des cultures :</strong> Ne jamais replanter ${nom} au même endroit deux années de suite pour casser le cycle des ravageurs.</li>
                    <li>✅ <strong>Associations bénéfiques :</strong> Planter des oignons, de l'ail ou du basilic autour pour repousser naturellement les insectes.</li>
                    <li>✅ <strong>Lutte biologique :</strong> Utiliser des extraits de neem, de la cendre de bois ou du savon noir en prévention.</li>
                </ul>
            </div>
        </div>
        
        </div>
    </div>
`;
        // Insert before </main>
        content = content.replace('</main>', detailsHtml + '\n  </main>');
        
        fs.writeFileSync(f, content, 'utf8');
        modifiedCount++;
    }
});

fs.unlinkSync('temp_db4.js');
console.log('Fichiers modifiés : ' + modifiedCount);
