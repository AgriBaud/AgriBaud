const fs = require('fs');

const weatherHTML = `
    <!-- MODULE MÉTÉO (Option B) -->
    <div id="weatherWidget" class="hidden mb-8 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-800 dark:to-gray-900 text-white p-5 rounded-xl shadow-lg flex justify-between items-center animate-fade-in-up">
        <div class="flex items-center gap-4">
            <div class="text-4xl"><i id="weatherIcon" class="fas fa-sun animate-pulse"></i></div>
            <div>
                <h3 class="font-bold text-lg">Météo aux champs</h3>
                <p id="weatherDesc" class="text-blue-100 text-sm">Chargement en cours...</p>
            </div>
        </div>
        <div class="text-right">
            <div id="weatherTemp" class="text-3xl font-extrabold">--°C</div>
            <div id="weatherDetails" class="text-sm text-blue-100">Vent: -- km/h</div>
        </div>
    </div>
`;

const weatherJS = `
    // --- MODULE MÉTÉO ---
    async function fetchWeather(lat, lon) {
        try {
            const res = await fetch(\`https://api.open-meteo.com/v1/forecast?latitude=\${lat}&longitude=\${lon}&current_weather=true\`);
            const data = await res.json();
            const weather = data.current_weather;
            
            let icon = 'fa-sun';
            let desc = 'Dégagé';
            const code = weather.weathercode;
            if (code >= 1 && code <= 3) { icon = 'fa-cloud-sun'; desc = 'Nuageux'; }
            if (code >= 45 && code <= 48) { icon = 'fa-smog'; desc = 'Brouillard'; }
            if (code >= 51 && code <= 67) { icon = 'fa-cloud-rain'; desc = 'Pluie'; }
            if (code >= 71 && code <= 77) { icon = 'fa-snowflake'; desc = 'Neige'; }
            if (code >= 80 && code <= 82) { icon = 'fa-cloud-showers-heavy'; desc = 'Averses'; }
            if (code >= 95) { icon = 'fa-bolt'; desc = 'Orage'; }
            
            document.getElementById('weatherIcon').className = \`fas \${icon}\`;
            document.getElementById('weatherDesc').innerText = desc;
            document.getElementById('weatherTemp').innerText = \`\${weather.temperature}°C\`;
            document.getElementById('weatherDetails').innerText = \`Vent: \${weather.windspeed} km/h\`;
            document.getElementById('weatherWidget').classList.remove('hidden');
        } catch(e) {
            console.error("Erreur météo:", e);
        }
    }

    function initWeather() {
        let lat = 9.3077; // Default: Parakou, Benin
        let lon = 2.3158;
        
        // Find first plot with GPS
        if (typeof plots !== 'undefined' && plots.length > 0) {
            const plotWithGps = plots.find(p => p.gps && p.gps.includes(','));
            if (plotWithGps) {
                const coords = plotWithGps.gps.split(',');
                lat = parseFloat(coords[0]);
                lon = parseFloat(coords[1]);
            }
        }
        fetchWeather(lat, lon);
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initWeather, 500); // slight delay to let plots load
    });
`;

try {
    let carnetHtml = fs.readFileSync('carnet.html', 'utf8');
    
    // Inject Weather HTML just below the user summary
    const userSummaryEnd = `      </div>\n  \n      \n      <!-- MODULE 4 : STATS -->`;
    if (carnetHtml.includes('<!-- MODULE 4 : STATS -->') && !carnetHtml.includes('<!-- MODULE MÉTÉO')) {
        carnetHtml = carnetHtml.replace('<!-- MODULE 4 : STATS -->', weatherHTML + '\n      <!-- MODULE 4 : STATS -->');
    }
    
    // Inject Weather JS inside the script tag at the bottom
    if (!carnetHtml.includes('fetchWeather(')) {
        carnetHtml = carnetHtml.replace('// Check if Chart is defined before using it', weatherJS + '\n              // Check if Chart is defined before using it');
    }
    
    fs.writeFileSync('carnet.html', carnetHtml);
    console.log('Weather module successfully injected into carnet.html');
} catch(e) {
    console.error('Error injecting weather module:', e);
}
