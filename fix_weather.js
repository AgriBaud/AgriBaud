const fs = require('fs');
let html = fs.readFileSync('carnet.html', 'utf8');

const newInitWeather = `
    function initWeather() {
        let lat = 9.3077; // Default: Parakou, Benin
        let lon = 2.3158;
        
        try {
            const localPlots = JSON.parse(localStorage.getItem('agr_plots')) || [];
            if (localPlots.length > 0) {
                const plotWithGps = localPlots.find(p => p.gps && p.gps.includes(','));
                if (plotWithGps) {
                    const coords = plotWithGps.gps.split(',');
                    lat = parseFloat(coords[0].trim());
                    lon = parseFloat(coords[1].trim());
                }
            }
        } catch(e) {}
        
        fetchWeather(lat, lon);
    }
`;

// Replace the old initWeather
html = html.replace(/function initWeather\(\) \{[\s\S]*?fetchWeather\(lat, lon\);\n    \}/, newInitWeather.trim());

// Insert initWeather() inside renderDashboard() so it updates on new plot
html = html.replace('remindersList.innerHTML = \'\';', 'remindersList.innerHTML = \'\';\n            initWeather();');

fs.writeFileSync('carnet.html', html);
console.log('Fixed weather logic');
