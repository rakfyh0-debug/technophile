# technophile — État du projet

> Fiche de suivi mise à jour après chaque modification majeure.
> Dernière mise à jour : **2026-09-20** (soir)

---

## 1. Description du projet

**technophile** est une plateforme d'apprentissage en ligne pour technophiles.
Modules de formation structurés en leçons progressives, chacune avec un
contenu théorique et un terminal JavaScript interactif (xterm.js) où
l'apprenant écrit du code et le fait valider automatiquement.

Stack : HTML/CSS/JS vanilla, Supabase (auth + profils), localStorage
(progression, préférences), xterm.js en vendor local.

---

## 2. Méthode de travail

- **OS** : Kali Linux, shell zsh
- **Projet** : ~/PROJEt/technophile
- **Édition** : terminal uniquement (cat, sed, python3)

### Workflow pour créer une leçon

1. Créer le HTML avec cat > fichier << 'HTMLEOF' ... HTMLEOF
2. Vérifier : wc -l, grep -c '<html>', '</html>', '<body>', '</body>'
3. Vérifier qu'aucun résidu HTMLEOF ne traîne : grep -n "HTMLEOF"
4. Patcher la leçon précédente avec sed -i pour câbler le bouton Continuer
5. Vérifier le patch : grep -n "location.href"
6. Tester dans le navigateur

### Patches complexes

python3 << 'PYEOF' ... PYEOF avec des assert ancre in s pour garantir
que chaque remplacement est unique.

### Sauvegardes

Toujours cp fichier.html fichier.html.bak avant un sed -i.

---

## 3. Arborescence


---

## 4. État d'avancement

### Module 1 — Logique algorithmique

| # | Leçon | Fichier | Statut |
|---|-------|---------|--------|
| 1 | Qu'est-ce qu'un algorithme ? | logique-algo/lecon-algo-1.html | ✅ |
| 2 | Les 5 qualités d'un bon algorithme | logique-algo/lecon-algo-2.html | ✅ |
| 3 | Les données : variables, constantes, types | logique-algo/lecon-algo-3.html | ✅ |
| 4 | Lire et écrire (entrées / sorties) | logique-algo/lecon-algo-4.html | ✅ |
| 5 | Les opérateurs arithmétiques | logique-algo/lecon-algo-5.html | ✅ |
| 6 | Les opérateurs de comparaison et logiques | logique-algo/lecon-algo-6.html | ✅ |

### Autres pages

Toutes opérationnelles (index, login, signup, profile, projects, stats,
settings, database).

### TODO

- [ ] Refonte propre du lock-row (le déplacer dans .lesson-main)
- [ ] Carte "Logique algorithmique" dynamique sur index.html (pointer vers la première leçon non validée)
- [ ] Carte "Module 1 terminé" sur index.html quand module1_complete = true
- [ ] Module 2 (Structures de contrôle — leçons 7 à 14)
- [ ] Polir la palette GitHub : cartes hexagonales, prompt terminal, titres vocab

---

## 5. Historique

### 2026-09-20

- Création de lecon-algo-2.html (5 qualités d'un bon algorithme)
- Patch lecon-algo-1.html : Continuer → lecon-algo-2.html
- Fix CSS lock-row (margin-right 388px en desktop)
- Fix UX bouton : disabled → aria-disabled + toast pédagogique
- Création ETAT-PROJET.md
- Création du dossier logique-algo/ et rangement des leçons

### 2026-09-20 (soir) — Module 1 terminé

- Création des leçons 3, 4, 5 et 6 (fichiers dans logique-algo/)
- Leçon 3 : Variables, constantes et types — exercices estEntier, estTexte, typeDe
- Leçon 4 : Lire et écrire — exercices presentation, convertirNombre, formaterPrix
- Leçon 5 : Opérateurs arithmétiques — exercices aireRectangle, minutesEnHeures, moyenne
- Leçon 6 : Comparaison et logiques — exercices estMajeur, estAdo, estWeekend (fin Module 1)
- Ajout d'un bouton "← Précédent" sur chaque leçon 2 à 6
- Patch partials.js : les liens du rail s'adaptent au sous-dossier (../ depuis logique-algo/)
- Patch index.html : la carte "Logique algorithmique" pointe vers logique-algo/lecon-algo-1.html
- Fix scroll : le rail et la topbar restent fixes, seul le contenu central défile
- Palette fond GitHub Dark (--bg-0 #0d1117, --bg-1 #161b22, --border #30363d, etc.)
- Nouvelle palette boutons : btn-primary en bleu (#1f6feb), btn-outline hover en orange (#f0883e)
- Icônes du rail : active et hover en orange (#f0883e)
- Responsive mobile sur les 6 leçons : media queries @1024px / @768px / @480px
  (rail horizontal, terminal réduit, lock-row en colonne, tables scrollables)

### 2026-09-20 (nuit) — Phase A : Design system + extraction CSS

- Enrichissement de :root dans style.css : tokens d'espacement (--space-1..8),
  rayons (--radius-sm), largeurs de layout (--lesson-side-width, --lesson-page-max,
  --topbar-height, --lesson-side-gap)
- Création de css/lesson.css : extraction du CSS dupliqué dans les 6 leçons
- Les 6 leçons passent d'environ 550 lignes à 390-480 lignes, plus aucun bloc
  <style> local
- Suppression des magic numbers dans css/lesson.css (360px, 388px, 1320px
  remplacés par var(--lesson-*))
- Ordre de chargement : style.css → xterm.css → lesson.css

TODO Phase B/C/D restants :
- Phase B : propager les tokens dans style.css (autres magic numbers)
- Phase C : data/lecons.json + js/progress.js (progression dynamique)
- Phase D : carte "Logique algorithmique" dynamique sur index.html
