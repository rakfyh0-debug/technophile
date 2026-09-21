// js/progress.js — API de progression des leçons
// Lit data/lecons.json + technophile_algo_progress (localStorage)

(function () {
  const PROGRESS_KEY = 'technophile_algo_progress';
  let CURRICULUM = null;

  function getProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch { return {}; }
  }

  async function loadCurriculum() {
    if (CURRICULUM) return CURRICULUM;
    try {
      const r = await fetch('data/lecons.json');
      CURRICULUM = await r.json();
      return CURRICULUM;
    } catch (e) {
      console.warn('Curriculum load failed:', e);
      return null;
    }
  }

  // Renvoie { total, done, next, label, file, isComplete }
  async function getModuleState(moduleId) {
    const curriculum = await loadCurriculum();
    if (!curriculum || !curriculum[moduleId]) return null;

    const module = curriculum[moduleId];
    const allLessons = module.modules.flatMap(m => m.lecons);
    const progress = getProgress();

    const done = allLessons.filter(l => progress[l.cle]).length;
    const total = allLessons.length;
    const nextLesson = allLessons.find(l => !progress[l.cle]) || null;

    const base = module.dossier;
    let label, file;
    if (done === 0) {
      label = 'Commencer';
      file = base + '/' + allLessons[0].fichier;
    } else if (done === total) {
      label = '✓ Module terminé';
      file = base + '/' + allLessons[allLessons.length - 1].fichier;
    } else {
      label = 'Continuer — leçon ' + nextLesson.numero;
      file = base + '/' + nextLesson.fichier;
    }

    return { total, done, next: nextLesson, label, file, isComplete: done === total };
  }

  window.Progress = { getModuleState, loadCurriculum, getProgress };
})();
