// technophile — logique JS corrigée (sélection dynamique des cartes)

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('global-search');
  const statusFilter = document.getElementById('status-filter');
  const sortToggle = document.getElementById('sort-toggle');
  const projectList = document.querySelector('.side-projects');

  // Raccourci Ctrl+K / Cmd+K pour focus la recherche
  if (searchInput) {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  function applyFilters() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    const status = (statusFilter?.value || '').toLowerCase();
    const currentCards = Array.from(document.querySelectorAll('.proj-card'));

    currentCards.forEach((card) => {
      const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
      const tag = card.querySelector('.status-tag')?.textContent.toLowerCase() || '';

      const matchQuery = !query || title.includes(query) || desc.includes(query);
      const matchStatus = !status || tag.includes(status);

      card.classList.toggle('hidden', !(matchQuery && matchStatus));
    });
  }

  searchInput?.addEventListener('input', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);

  // Tri alphabétique dynamique
  let sortAscending = true;
  sortToggle?.addEventListener('click', () => {
    sortAscending = !sortAscending;
    const currentCards = Array.from(document.querySelectorAll('.proj-card'));
    const sorted = [...currentCards].sort((a, b) => {
      const nameA = a.querySelector('h4')?.textContent.trim().toLowerCase() || '';
      const nameB = b.querySelector('h4')?.textContent.trim().toLowerCase() || '';
      return sortAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    sorted.forEach((card) => projectList.appendChild(card));
    sortToggle.textContent = sortAscending ? '↑ Trié par nom (A→Z)' : '↓ Trié par nom (Z→A)';
  });

  // Bascule vue grille / liste
  const viewGrid = document.getElementById('view-grid');
  const viewList = document.getElementById('view-list');
  const sideProjectsEl = document.querySelector('.side-projects');

  function setView(isGrid) {
    sideProjectsEl?.classList.toggle('grid-view', isGrid);
    viewGrid?.classList.toggle('active', isGrid);
    viewList?.classList.toggle('active', !isGrid);
  }

  viewGrid?.addEventListener('click', () => setView(true));
  viewList?.addEventListener('click', () => setView(false));
});

// --- Store local des projets de l'utilisateur (localStorage) ---
const PROJECTS_KEY = 'technophile_projects';

function uid() {
  return (crypto.randomUUID ? crypto.randomUUID() : 'p_' + Date.now() + '_' + Math.random().toString(16).slice(2));
}

function getProjects() {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProjects(list) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(list));
}

function seedProjectsIfEmpty() {
  if (getProjects().length > 0) return;
  const now = Date.now();
  const seed = [
    { id: uid(), title: 'Script de sauvegarde automatique', description: "Un script Bash qui archive et sauvegarde un dossier selon un planning cron.", level: 'débutant', createdAt: now - 5 * 86400000 },
    { id: uid(), title: 'API REST minimale', description: "Construis une petite API avec quelques routes et une base de données SQLite.", level: 'intermédiaire', createdAt: now - 4 * 86400000 },
    { id: uid(), title: 'Bot Discord simple', description: "Un bot qui répond à des commandes et automatise une tâche du serveur.", level: 'intermédiaire', createdAt: now - 3 * 86400000 },
    { id: uid(), title: 'Dashboard système en local', description: "Une page qui affiche en direct l'utilisation CPU, RAM et disque de ta machine.", level: 'avancé', createdAt: now - 2 * 86400000 },
    { id: uid(), title: 'Termux Desktop Sabamdarif', description: "Installe un environnement de bureau graphique complet sur Termux (Android), étape par étape.", level: 'avancé', createdAt: now - 1 * 86400000 },
  ];
  saveProjects(seed);
}
