#!/bin/bash

update_file() {
    local file=$1
    
    if [ ! -f "$file" ]; then
        echo "⚠️  $file introuvable, ignoré."
        return
    fi
    
    # 1. Ajouter data-theme="dark" à la balise <html>
    sed -i 's|<html lang="fr">|<html lang="fr" data-theme="dark">|' "$file"
    
    # 2. Remplacer les classes Tailwind codées en dur par des classes custom
    sed -i 's|bg-\[#121212\]|bg-input|g' "$file"
    sed -i 's|bg-\[#1c1c1c\]|bg-card|g' "$file"
    sed -i 's|bg-\[#2e2e2e\]|bg-input|g' "$file"
    sed -i 's|text-gray-400|text-muted|g' "$file"
    sed -i 's|text-gray-500|text-dim|g' "$file"
    sed -i 's|text-white|text-main|g' "$file"
    
    # 3. Injecter les variables CSS et les classes utilitaires juste avant </style>
    if ! grep -q 'data-theme="dark"\]' "$file"; then
        sed -i 's|    </style>|        /* Thème dynamique */\n        :root, [data-theme="dark"] { --bg-main: #121212; --bg-header: #1c1c1c; --bg-card: #1c1c1c; --bg-input: #121212; --border-color: #2e2e2e; --text-main: #ededed; --text-muted: #9ca3af; --text-dim: #6b7280; }\n        [data-theme="light"] { --bg-main: #f9fafb; --bg-header: #ffffff; --bg-card: #ffffff; --bg-input: #f3f4f6; --border-color: #e5e7eb; --text-main: #111827; --text-muted: #6b7280; --text-dim: #9ca3af; }\n        body { background-color: var(--bg-main) !important; color: var(--text-main) !important; transition: background-color 0.2s, color 0.2s; }\n        .bg-input { background-color: var(--bg-input) !important; }\n        .bg-main { background-color: var(--bg-main) !important; }\n        .bg-card { background-color: var(--bg-card) !important; }\n        .bg-header { background-color: var(--bg-header) !important; }\n        .bg-sidebar { background-color: var(--bg-header) !important; }\n        .border-dark { border-color: var(--border-color) !important; }\n        .text-main { color: var(--text-main) !important; }\n        .text-muted { color: var(--text-muted) !important; }\n        .text-dim { color: var(--text-dim) !important; }\n    </style>|' "$file"
    fi
    
    # 4. Ajouter le script app.js avant </body> (une seule fois)
    if ! grep -q 'app.js' "$file"; then
        sed -i 's|</body>|<script src="app.js"></script>\n</body>|' "$file"
    fi
    
    echo "✅ $file mis à jour"
}

# Appliquer à tous les fichiers HTML du projet
update_file "index.html"
update_file "profile.html"
update_file "signup.html"
update_file "login.html"

echo ""
echo "🎉 Tous les fichiers ont été traités !"
