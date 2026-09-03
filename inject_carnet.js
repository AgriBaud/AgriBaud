const fs = require('fs');
let html = fs.readFileSync('carnet.html', 'utf8');

const calendarSection = `
    <section class="bg-white p-6 rounded-lg shadow mt-8 mb-8 border border-green-100">
      <h2 class="text-2xl font-bold text-[#16a34a] mb-4"><i class="fas fa-calendar-alt"></i> Mon Calendrier de Suivi</h2>
      
      <div class="flex justify-between items-center mb-4">
        <button id="btnMoisPrec" class="text-[#16a34a] font-bold px-3 py-1 bg-green-50 rounded-full hover:bg-green-100 transition"><i class="fas fa-chevron-left"></i> Précédent</button>
        <span id="moisAnneeAffiche" class="font-bold text-gray-700 text-lg uppercase tracking-wide"></span>
        <button id="btnMoisSuiv" class="text-[#16a34a] font-bold px-3 py-1 bg-green-50 rounded-full hover:bg-green-100 transition">Suivant <i class="fas fa-chevron-right"></i></button>
      </div>

      <!-- Noms des jours de la semaine -->
      <div class="grid grid-cols-7 gap-2 mb-2 text-center font-bold text-gray-400 text-xs">
        <div>LUN</div><div>MAR</div><div>MER</div><div>JEU</div><div>VEN</div><div>SAM</div><div>DIM</div>
      </div>
      
      <div id="calendrier" class="grid grid-cols-7 gap-2"></div>
      
      <p class="text-sm text-gray-500 mt-4 flex items-center gap-2">
         <span class="w-3 h-3 rounded-full bg-[#f0fdf4] border border-[#16a34a] inline-block"></span> 
         Les jours avec tâches sont en vert. Cliquez pour voir le détail.
      </p>
    </section>

    <!-- POPUP MODALE -->
    <div id="popupTache" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 transition-opacity">
      <div class="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl transform transition-all">
        <h3 id="popupDate" class="font-bold text-xl text-green-800 mb-3 border-b pb-2"></h3>
        <div id="popupContenu" class="space-y-3 mb-4 max-h-64 overflow-y-auto pr-2"></div>
        <button onclick="fermerPopup()" class="w-full bg-[#16a34a] hover:bg-green-700 text-white font-bold px-4 py-3 rounded-xl transition shadow">Fermer</button>
      </div>
    </div>
`;

if (!html.includes('Mon Calendrier de Suivi')) {
    html = html.replace('<!-- Reminders -->', calendarSection + '\n    <!-- Reminders -->');
    fs.writeFileSync('carnet.html', html);
    console.log('carnet.html mis à jour');
} else {
    console.log('Calendrier déjà présent.');
}
