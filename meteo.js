/* Module Météo Hyper-Locale & Calculateur d'Évapotranspiration (ETo) pour JardinExpress */

const BENIN_CITIES = {
  cotonou: { name: "Cotonou", lat: 6.3654, lon: 2.4183 },
  portonovo: { name: "Porto-Novo", lat: 6.4965, lon: 2.6289 },
  parakou: { name: "Parakou", lat: 9.3372, lon: 2.6303 },
  abomey: { name: "Abomey / Bohicon", lat: 7.1829, lon: 1.9912 },
  natitingou: { name: "Natitingou", lat: 10.3042, lon: 1.3796 },
  kandi: { name: "Kandi", lat: 11.1343, lon: 2.9386 }
};

let currentCityKey = 'cotonou';

async function fetchWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erreur serveur météo");
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn("Impossible d'obtenir la météo en direct, mode hors-ligne activé:", err);
    return null;
  }
}

// Calcul des conseils d'arrosage intelligents basés sur la température, les précipitations et le vent
function calculateIrrigationAdvice(currentTemp, humidity, rainProbability, dailyRainSum, windSpeed) {
  if (dailyRainSum > 5 || rainProbability > 70) {
    return {
      status: "suspended",
      color: "#2196F3",
      icon: "🌧️",
      title: "Arrosage Suspendu (Pluie Détectée)",
      advice: `Pluie importante prévue (${dailyRainSum || 'forte'} mm, probabilité ${rainProbability}%). L'humidité du sol sera suffisante. Économisez l'eau !`
    };
  }

  if (currentTemp > 32 || (currentTemp > 28 && humidity < 50)) {
    return {
      status: "heavy",
      color: "#e53935",
      icon: "☀️🔥",
      title: "Arrosage Renforcé Requis",
      advice: `Chaleur intense (${currentTemp}°C, humidité ${humidity}%). Évapotranspiration très forte. Arrosez généreusement au pied tôt le matin ou après 17h30 avec un paillage.`
    };
  }

  if (currentTemp < 24) {
    return {
      status: "light",
      color: "#4CAF50",
      icon: "🌤️",
      title: "Arrosage Modéré",
      advice: `Température douce (${currentTemp}°C). Maintenir un arrosage léger au pied sans détremper.`
    };
  }

  return {
    status: "normal",
    color: "#2e7d32",
    icon: "💧",
    title: "Arrosage Normal",
    advice: `Conditions normales (${currentTemp}°C, vent ${windSpeed} km/h). Suivez le calendrier d'arrosage habituel de vos plantes.`
  };
}

// Rendu du widget météo dans le DOM
async function renderWeatherWidget(containerId = 'weatherWidgetContainer') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div style="background: white; padding: 15px; border-radius: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); margin: 15px 0;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div style="font-weight:bold; font-size:16px; color:#2e7d32; display:flex; align-items:center; gap:8px;">
          <span>🌤️ Météo Agricole & Conseils Arrosage</span>
        </div>
        <div>
          <select id="citySelect" style="padding:6px 10px; border-radius:8px; border:1px solid #ccc; font-size:13px; font-weight:600; color:#333;">
            ${Object.keys(BENIN_CITIES).map(k => `<option value="${k}" ${k===currentCityKey?'selected':''}>🇧🇯 ${BENIN_CITIES[k].name}</option>`).join('')}
          </select>
        </div>
      </div>
      <div id="weatherContent" style="margin-top:12px;">
        <p style="color:#666; font-size:13px;">Chargement des données météo en direct...</p>
      </div>
    </div>
  `;

  document.getElementById('citySelect').addEventListener('change', async (e) => {
    currentCityKey = e.target.value;
    await loadWeatherData(containerId);
  });

  await loadWeatherData(containerId);
}

async function loadWeatherData(containerId) {
  const contentDiv = document.getElementById('weatherContent');
  const city = BENIN_CITIES[currentCityKey];
  const data = await fetchWeather(city.lat, city.lon);

  if (!data || !data.current) {
    contentDiv.innerHTML = `
      <div style="padding:10px; background:#fff3e0; border-radius:8px; color:#e65100; font-size:13px;">
        ⚠️ Mode hors-ligne : Données météo temporairement indisponibles. Suivez les recommandations générales de saison.
      </div>
    `;
    return;
  }

  const cur = data.current;
  const daily = data.daily;
  const temp = cur.temperature_2m;
  const humidity = cur.relative_humidity_2m;
  const wind = cur.wind_speed_10m;
  const rainProb = daily.precipitation_probability_max[0] || 0;
  const rainSum = daily.precipitation_sum[0] || 0;

  const adviceObj = calculateIrrigationAdvice(temp, humidity, rainProb, rainSum, wind);

  contentDiv.innerHTML = `
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:10px; text-align:center; margin-bottom:12px;">
      <div style="background:#f4f8f4; padding:8px; border-radius:8px;">
        <span style="font-size:11px; color:#666;">Température</span>
        <div style="font-size:18px; font-weight:bold; color:#2e7d32;">${temp}°C</div>
      </div>
      <div style="background:#f4f8f4; padding:8px; border-radius:8px;">
        <span style="font-size:11px; color:#666;">Humidité Air</span>
        <div style="font-size:18px; font-weight:bold; color:#0288d1;">${humidity}%</div>
      </div>
      <div style="background:#f4f8f4; padding:8px; border-radius:8px;">
        <span style="font-size:11px; color:#666;">Risque Pluie</span>
        <div style="font-size:18px; font-weight:bold; color:#ff9800;">${rainProb}% (${rainSum}mm)</div>
      </div>
      <div style="background:#f4f8f4; padding:8px; border-radius:8px;">
        <span style="font-size:11px; color:#666;">Vent</span>
        <div style="font-size:18px; font-weight:bold; color:#555;">${wind} km/h</div>
      </div>
    </div>

    <div style="background:${adviceObj.color}15; border-left:4px solid ${adviceObj.color}; padding:10px; border-radius:8px;">
      <div style="font-weight:bold; color:${adviceObj.color}; font-size:14px;">${adviceObj.icon} ${adviceObj.title}</div>
      <p style="margin:4px 0 0 0; font-size:13px; color:#333;">${adviceObj.advice}</p>
    </div>
  `;
}
