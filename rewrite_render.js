const fs = require('fs');
let html = fs.readFileSync('carnet.html', 'utf8');

const regexRender = /function renderDashboard\(\) \{[\s\S]*?\/\/\s*Handle Form Submit/m;

const newRender = `function renderDashboard() {
            plotsList.innerHTML = '';
            remindersList.innerHTML = '';
            
            if(plots.length === 0) {
                plotsList.innerHTML = '<p class="text-gray-500 text-center py-4 bg-white rounded border border-gray-100">Aucune parcelle ajoutée. Cliquez sur "Nouvelle Parcelle".</p>';
                remindersList.innerHTML = '<p class="text-gray-500 text-center py-4">Pas de tâches pour le moment.</p>';
                if(typeof window.mettreAJourGraphiques === 'function') window.mettreAJourGraphiques(plots);
                return;
            }

            let allTasks = [];

            plots.forEach((plot, index) => {
                const cData = DB.cultures[plot.cultureId];
                if(!cData) return;

                const sowDate = new Date(plot.date);
                const harvestDate = new Date(sowDate);
                harvestDate.setDate(harvestDate.getDate() + (cData.duree_jours || 90));

                // Calculate progress
                const today = new Date();
                const totalDiff = harvestDate - sowDate;
                const elapsedDiff = today - sowDate;
                let progress = Math.max(0, Math.min(100, (elapsedDiff / totalDiff) * 100));

                // --- SUIVI FINANCIER CALCS ---
                const depenses = plot.depenses || [];
                const totalDepenses = depenses.reduce((sum, d) => sum + d.montant, 0);
                
                let budgetPrevu = 0;
                if (cData.budget && cData.budget.cout_intrants !== 'N/A') {
                    const intrants = parseInt(cData.budget.cout_intrants.replace(/\\D/g, '')) || 0;
                    const mainOeuvre = parseInt(cData.budget.cout_main_oeuvre.replace(/\\D/g, '')) || 0;
                    const areaNum = parseFloat(plot.area) || 1;
                    budgetPrevu = (intrants + mainOeuvre) * areaNum;
                }
                
                let percentBudget = budgetPrevu > 0 ? Math.min(100, (totalDepenses / budgetPrevu) * 100) : 0;
                let colorBudget = totalDepenses > budgetPrevu && budgetPrevu > 0 ? 'bg-red-500' : 'bg-yellow-500';
                
                let financeUI = '';
                if (plot.revenuFinal !== undefined) {
                    const benefice = plot.revenuFinal - totalDepenses;
                    const benefColor = benefice >= 0 ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100';
                    financeUI = \`
                        <div class="mt-3 p-3 \${benefColor} rounded border">
                            <div class="flex justify-between items-center mb-2">
                                <div><span class="font-bold">Clôturé :</span> Bénéfice net</div>
                                <div class="font-bold text-lg">\${benefice.toLocaleString('fr-FR')} FCFA</div>
                            </div>
                            <button onclick="window.genererPDFBilan(\${index})" class="w-full text-xs bg-white text-gray-700 py-1 rounded border border-gray-300 hover:bg-gray-100 shadow-sm transition"><i class="fas fa-file-pdf text-red-500"></i> Télécharger Bilan PDF</button>
                        </div>
                    \`;
                } else {
                    financeUI = \`
                        <div class="mt-3 bg-gray-50 p-3 rounded border border-gray-100">
                            <div class="flex justify-between text-xs mb-1 text-gray-600">
                                <span>Dépenses: <b>\${totalDepenses.toLocaleString('fr-FR')} F</b></span>
                                <span>Budget prévu: \${budgetPrevu > 0 ? budgetPrevu.toLocaleString('fr-FR') + ' F' : 'N/A'}</span>
                            </div>
                            \${budgetPrevu > 0 ? \`<div class="w-full bg-gray-200 rounded-full h-1.5 mb-2"><div class="\${colorBudget} h-1.5 rounded-full" style="width: \${percentBudget}%"></div></div>\` : ''}
                            <div class="flex gap-2 mt-2">
                                <button onclick="window.ouvrirModalJournal(\${index})" class="flex-1 text-xs bg-white border border-blue-300 hover:bg-blue-50 text-blue-700 py-1 px-2 rounded shadow-sm"><i class="fas fa-book"></i> Journal</button>
                                <button onclick="window.ouvrirModalDepense(\${index})" class="flex-1 text-xs bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 py-1 px-2 rounded shadow-sm"><i class="fas fa-plus"></i> Dépense</button>
                                <button onclick="window.ouvrirModalBilan(\${index})" class="flex-1 text-xs bg-[#16a34a] hover:bg-green-700 text-white py-1 px-2 rounded shadow-sm"><i class="fas fa-check"></i> Récolter & Bilan</button>
                            </div>
                        </div>
                    \`;
                }

                plotsList.innerHTML += \`
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex flex-col relative overflow-hidden">
                        <div class="absolute left-0 top-0 bottom-0 w-2 bg-brand"></div>
                        <div class="flex justify-between items-start pl-2">
                            <div>
                                <h4 class="font-bold text-gray-800 text-lg">\${cData.nom} <span class="text-sm font-normal text-gray-500">(\${plot.area})</span></h4>
                                <div class="mt-1 flex items-center gap-2 mb-1">
                                    <span class="text-xs text-gray-500">Santé:</span>
                                    <select onchange="window.changerSante(\${index}, this.value)" class="text-xs rounded border border-gray-200 p-1 bg-white outline-none \${plot.sante === 'Malade' ? 'text-red-600 font-bold' : (plot.sante === 'Stress' ? 'text-orange-500 font-bold' : 'text-green-600 font-bold')}">
                                        <option value="Excellente" \${plot.sante === 'Excellente' || !plot.sante ? 'selected' : ''}>🟢 Excellente</option>
                                        <option value="Stress" \${plot.sante === 'Stress' ? 'selected' : ''}>🟡 En Stress</option>
                                        <option value="Malade" \${plot.sante === 'Malade' ? 'selected' : ''}>🔴 Malade</option>
                                    </select>
                                </div>
                                <p class="text-sm text-gray-600 mb-1"><i class="fas fa-map-marker-alt"></i> \${plot.location} &nbsp;|&nbsp; Semis: \${sowDate.toLocaleDateString('fr-FR')}</p>
                                <div class="flex flex-wrap gap-2 text-[10px] sm:text-xs">
                                    \${plot.soil && plot.soil !== 'Non précisé' ? \`<span class="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded shadow-sm">\${plot.soil}</span>\` : ''}
                                    \${plot.water ? \`<span class="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded shadow-sm">\${plot.water}</span>\` : ''}
                                    \${plot.gps ? \`<a href="https://maps.google.com/?q=\${plot.gps}" target="_blank" class="bg-gray-100 text-gray-700 border border-gray-300 px-2 py-0.5 rounded hover:bg-gray-200 shadow-sm transition"><i class="fas fa-satellite"></i> GPS</a>\` : ''}
                                </div>
                            </div>
                            <button onclick="window.deletePlot(\${index})" class="text-gray-300 hover:text-red-500 text-lg" title="Supprimer"><i class="fas fa-trash-alt"></i></button>
                        </div>
                        
                        <div class="mt-4 pl-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Agility -->
                            <div>
                                <div class="flex justify-between text-xs mb-1 text-gray-600">
                                    <span>Croissance</span>
                                    <span>\${Math.round(progress)}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-brand h-2 rounded-full" style="width: \${progress}%"></div>
                                </div>
                                <p class="text-xs text-right mt-1 text-gray-500">Récolte prévue: \${harvestDate.toLocaleDateString('fr-FR')}</p>
                            </div>
                            <!-- Finance -->
                            <div>
                                \${financeUI}
                            </div>
                        </div>
                    </div>
                \`;

                // Generate Tasks safely
                if (cData.etapes && Array.isArray(cData.etapes)) {
                    cData.etapes.forEach(etape => {
                        let daysToAdd = 0;
                        if (etape.jour !== undefined) {
                            daysToAdd = etape.jour;
                        } else if (etape.semaine) {
                            let match = etape.semaine.match(/\\d+/);
                            if (match) daysToAdd = parseInt(match[0]) * 7;
                        }
                        
                        let taskDate = new Date(sowDate);
                        taskDate.setDate(taskDate.getDate() + daysToAdd);

                        allTasks.push({
                            date: taskDate,
                            plotName: cData.nom,
                            title: etape.nom || etape.titre,
                            desc: etape.description || ''
                        });
                    });
                }
            });

            // Update Charts
            if(typeof window.mettreAJourGraphiques === 'function') {
                window.mettreAJourGraphiques(plots);
            }

            // Sort and display next tasks
            allTasks.sort((a,b) => a.date - b.date);
            const now = new Date();
            const nextTasks = allTasks.filter(t => t.date >= new Date(now.setDate(now.getDate() - 7))); 

            if(nextTasks.length === 0) {
                remindersList.innerHTML = '<p class="text-gray-500">Pas de tâches imminentes.</p>';
            } else {
                nextTasks.slice(0, 5).forEach(task => { 
                    const diffDays = Math.round((task.date - new Date()) / (1000 * 60 * 60 * 24));
                    let dateTag = diffDays === 0 ? "Aujourd'hui" : (diffDays < 0 ? "En retard" : \`Dans \${diffDays} j\`);
                    let colorClass = diffDays < 0 ? "bg-red-100 text-red-800" : (diffDays === 0 ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800");

                    remindersList.innerHTML += \`
                        <div class="bg-white p-3 rounded shadow-sm border-l-4 border-yellow-500 flex justify-between items-center mb-2">
                            <div>
                                <h5 class="font-bold text-gray-800 text-sm">\${task.title} <span class="text-xs font-normal text-gray-500">(\${task.plotName})</span></h5>
                                <p class="text-xs text-gray-600 line-clamp-1">\${task.desc}</p>
                            </div>
                            <div class="\${colorClass} text-xs px-2 py-1 rounded font-bold whitespace-nowrap">
                                \${dateTag}
                            </div>
                        </div>
                    \`;
                });
            }
        }

        // Handle Form Submit`;

html = html.replace(regexRender, newRender);
fs.writeFileSync('carnet.html', html);
console.log('renderDashboard completely rewritten properly.');
