#!/bin/bash
# scripts/deploy.sh — Audit + commit + push en une commande
set -e
cd "$(dirname "$0")/.."

echo "▶ Lancement de l'audit..."
if ! ./scripts/audit.sh; then
  echo ""
  echo "❌ Audit échoué. Corrige les erreurs avant de déployer."
  exit 1
fi

echo ""
read -p "Message de commit : " MSG
if [ -z "$MSG" ]; then
  echo "❌ Message vide, abandon."
  exit 1
fi

git add -A
git commit -m "$MSG"
git push origin main

echo ""
echo "✅ Déployé. Vérifie dans 1-2 min :"
echo "   https://rakfyh0-debug.github.io/technophile/"
