const fs = require('fs');

function removeDarkMode(filename) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf8');

    // 1. Remove Dark Mode Button
    content = content.replace(/<button onclick="toggleDarkMode\(\)".*?<\/button>/g, '');

    // 2. Remove Dark Mode Script Block
    content = content.replace(/\/\/ Dark mode check[\s\S]*?localStorage\.theme = document\.documentElement\.classList\.contains\('dark'\) \? 'dark' : 'light';\n\s*\}/g, '');

    // 3. Remove dark: utility classes
    content = content.replace(/dark:[a-zA-Z0-9\-]+/g, '');
    
    // 4. Remove darkMode config from tailwind
    content = content.replace(/darkMode:\s*'class',/g, '');

    // 5. Clean up multiple spaces left by replacing classes
    content = content.replace(/ +(?=")/g, ''); // spaces right before a quote
    content = content.replace(/" +/g, '"');   // spaces right after a quote
    content = content.replace(/  +/g, ' ');   // double spaces

    fs.writeFileSync(filename, content);
    console.log(filename + ' cleaned from dark mode.');
}

removeDarkMode('index.html');
removeDarkMode('carnet.html');
removeDarkMode('app.js');
