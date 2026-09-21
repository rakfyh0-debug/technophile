#!/bin/bash
# scripts/backup.sh — Sauvegarde tar.gz du projet
set -e

DATE=$(date +%Y%m%d_%H%M%S)
DEST="$HOME/backups/technophile"
SRC="$HOME/PROJEt/technophile"

mkdir -p "$DEST"

tar -czf "$DEST/technophile_$DATE.tar.gz" \
  --exclude="*.bak" \
  --exclude=".git" \
  -C "$SRC" .

echo "✅ Sauvegarde créée : $DEST/technophile_$DATE.tar.gz"

# Ne garder que les 14 dernières archives
ls -1t "$DEST"/technophile_*.tar.gz | tail -n +15 | xargs -r rm
echo "   (nettoyage : 14 dernières archives conservées)"
