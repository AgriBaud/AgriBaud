const fs = require('fs');

// 1. CREATE MANIFEST.JSON
const manifest = {
  "name": "AgriBaud+",
  "short_name": "AgriBaud+",
  "description": "Le standard agricole de suivi des parcelles.",
  "start_url": "./index.html",
  "display": "standalone",
  "background_color": "#f0fdf4",
  "theme_color": "#16a34a",
  "icons": [
    {
      "src": "LOGO.jpeg",
      "sizes": "192x192 512x512",
      "type": "image/jpeg"
    }
  ]
};
fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));

// 2. CREATE SERVICE WORKER (sw.js)
const sw = `
const CACHE_NAME = 'agribaud-v1';
const urlsToCache = [
  './',
  './index.html',
  './carnet.html',
  './db.js',
  './app.js',
  './LOGO.jpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});
`;
fs.writeFileSync('sw.js', sw);

// 3. COMMON STRINGS TO INJECT
const headInjections = `
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#16a34a">
  <script>
    // Dark mode check
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    function toggleDarkMode() {
      document.documentElement.classList.toggle('dark');
      localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js');
      });
    }
  </script>
`;

const tailwindConfig = `
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: { extend: { colors: { brand: '#16a34a', bgLight: '#f0fdf4', bgDark: '#0f172a', cardDark: '#1e293b' } } }
    }
  </script>
`;

const globalStyles = `
  <style> 
    body { font-family: 'Segoe UI', system-ui, sans-serif; } 
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
    /* Hide scrollbar for a cleaner look */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    .dark ::-webkit-scrollbar-thumb { background: #334155; }
  </style>
`;

const darkModeBtn = `<button onclick="toggleDarkMode()" class="text-white hover:text-green-200 text-xl mx-3 transition-transform hover:scale-110" title="Changer de thème"><i class="fas fa-moon dark:hidden"></i><i class="fas fa-sun hidden dark:inline"></i></button>`;

function upgradeFile(filename) {
    if (!fs.existsSync(filename)) return;
    let html = fs.readFileSync(filename, 'utf8');

    // 1. Update Tailwind config
    html = html.replace(/<script>\s*tailwind\.config = \{[\s\S]*?\}\s*<\/script>/, tailwindConfig);

    // 2. Inject Head Tags (Manifest, SW, Dark mode init)
    if (!html.includes('manifest.json')) {
        html = html.replace('</head>', headInjections + '\n</head>');
    }

    // 3. Inject CSS animations & scrollbar
    html = html.replace(/<style>[\s\S]*?<\/style>/, globalStyles);

    // 4. Update Body classes for dark mode and transitions
    html = html.replace(/<body class="bg-bgLight text-gray-800/g, '<body class="bg-bgLight text-gray-800 dark:bg-bgDark dark:text-gray-200 transition-colors duration-300');

    // 5. Inject Dark Mode Button in Headers
    if (!html.includes('toggleDarkMode()')) {
        // Find the place right before the mobile menu button or end of flex container
        if (filename === 'index.html') {
            html = html.replace('</nav>', '</nav>\n        ' + darkModeBtn);
            // Also add for mobile
            html = html.replace('id="mobileMenuBtn"', darkModeBtn + '\n        <button id="mobileMenuBtn"');
        } else if (filename === 'carnet.html') {
            html = html.replace('<h1 class="text-xl font-bold leading-tight">Mon Carnet</h1>\n      </div>', '<h1 class="text-xl font-bold leading-tight">Mon Carnet</h1>\n      </div>\n      ' + darkModeBtn);
        }
    }

    // 6. Add animation class and dark classes to hardcoded cards
    if (filename === 'index.html') {
        // Fix hardcoded blocks
        html = html.replace(/bg-white/g, 'bg-white dark:bg-cardDark dark:border-gray-700');
        // Add animation to header content
        html = html.replace('<h2 class="text-4xl md:text-5xl font-extrabold mb-4', '<h2 class="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-up');
    }

    fs.writeFileSync(filename, html);
    console.log(filename + ' upgraded to Premium UI.');
}

// Upgrade Main Pages
upgradeFile('index.html');
upgradeFile('carnet.html');

// 4. Update dynamic cards in app.js and carnet.html
let appJs = fs.readFileSync('app.js', 'utf8');
// Fix culture cards generated by JS
appJs = appJs.replace(/class="bg-white rounded-xl shadow-md overflow-hidden/g, 'class="bg-white dark:bg-cardDark dark:border-gray-700 border dark:text-gray-200 rounded-xl shadow-md overflow-hidden animate-fade-in-up hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1');
fs.writeFileSync('app.js', appJs);

let carnetHtml = fs.readFileSync('carnet.html', 'utf8');
// Fix plot cards generated by JS
carnetHtml = carnetHtml.replace(/<div class="bg-white p-4 rounded-xl shadow-sm border border-green-100/g, '<div class="bg-white dark:bg-cardDark dark:border-gray-700 p-4 rounded-xl shadow-sm border border-green-100 dark:border-gray-700 animate-fade-in-up hover:shadow-md transition-all duration-300');
carnetHtml = carnetHtml.replace(/text-gray-800/g, 'text-gray-800 dark:text-gray-100');
carnetHtml = carnetHtml.replace(/text-gray-700/g, 'text-gray-700 dark:text-gray-200');
carnetHtml = carnetHtml.replace(/bg-gray-50/g, 'bg-gray-50 dark:bg-gray-800');
carnetHtml = carnetHtml.replace(/bg-white p-6 rounded-2xl/g, 'bg-white dark:bg-cardDark p-6 rounded-2xl border dark:border-gray-700'); // Modals
fs.writeFileSync('carnet.html', carnetHtml);

console.log('Premium UI modifications complete.');
