const fs = require('fs');
let html = fs.readFileSync('carnet.html', 'utf8');

// Add null check around cData.etapes.forEach
html = html.replace(
    /cData\.etapes\.forEach\(\(etape\) => \{/g,
    'if (cData.etapes) { cData.etapes.forEach((etape) => {' // Wait, the current code is cData.etapes.forEach(etape => {
);
html = html.replace(
    /cData\.etapes\.forEach\(etape => \{/g,
    'if (cData.etapes) { cData.etapes.forEach(etape => {'
);
html = html.replace(
    /allTasks\.push\(\{([\s\S]*?)\}\);\s*\}\);/g,
    'allTasks.push({$1});\n                    });\n                }'
);

// We need to be careful with string replacements. Let's do it cleanly with a regex replacing the entire block.
const blockToReplaceRegex = /cData\.etapes\.forEach\(etape => \{[\s\S]*?allTasks\.push\(\{[\s\S]*?\}\);\s*\}\);/g;

html = html.replace(blockToReplaceRegex, (match) => {
    if (match.startsWith('if (cData.etapes)')) return match;
    return 'if (cData.etapes) {\n' + match + '\n}';
});

// Also, double check if there's another replace issue.
fs.writeFileSync('carnet.html', html);
console.log('Fixed cData.etapes null check');
