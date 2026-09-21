#!/bin/bash
# scripts/audit.sh — Audit anti-vibe-coding avant chaque push
cd "$(dirname "$0")/.."

FAIL=0
ok()   { echo "  ✅ $1"; }
warn() { echo "  ⚠️  $1"; }
err()  { echo "  ❌ $1"; FAIL=1; }

echo "==============================================="
echo "  AUDIT technophile"
echo "==============================================="

echo ""
echo "=== 1. Résidus de clone Supabase Studio ==="
HITS=$(grep -rn "Interface Studio\|Studio - Proj\|forfait gratuit\|Passez à la version Pro\|usage-panel" *.html 2>/dev/null || true)
if [ -z "$HITS" ]; then ok "Aucun"; else echo "$HITS"; err "Résidus détectés"; fi

echo ""
echo "=== 2. Résidus de heredoc (HTMLEOF, PYEOF, SHEOF) ==="
HITS=$(grep -rln "^HTMLEOF$\|^PYEOF$\|^SHEOF$\|^JSONEOF$" *.html logique-algo/*.html 2>/dev/null || true)
if [ -z "$HITS" ]; then ok "Aucun"; else echo "$HITS"; err "Heredoc mal fermé"; fi

echo ""
echo "=== 3. Badges / IDs factices ==="
HITS=$(grep -rn "ADMINISTRATEUR\|usr_8f9a2b\|14 Sept\. 2026\|Aujourd'hui à 16:34" *.html 2>/dev/null || true)
if [ -z "$HITS" ]; then ok "Aucun"; else echo "$HITS"; err "Factices détectés"; fi

echo ""
echo "=== 4. Structure HTML des pages racine ==="
for f in index.html login.html signup.html profile.html settings.html projects.html stats.html database.html; do
  [ -f "$f" ] || continue
  html=$(grep -c "<html" "$f")
  body=$(grep -c "<body" "$f")
  end=$(grep -c "</html>" "$f")
  scripts_open=$(grep -c "<script" "$f")
  scripts_close=$(grep -c "</script>" "$f")
  if [ "$html" = "1" ] && [ "$body" = "1" ] && [ "$end" = "1" ] && [ "$scripts_open" = "$scripts_close" ]; then
    ok "$f"
  else
    err "$f (html=$html body=$body /html=$end script=$scripts_open/$scripts_close)"
  fi
done

echo ""
echo "=== 5. Structure HTML des leçons ==="
for f in logique-algo/lecon-algo-*.html; do
  [ -f "$f" ] || continue
  html=$(grep -c "<html" "$f")
  body=$(grep -c "<body" "$f")
  end=$(grep -c "</html>" "$f")
  scripts_open=$(grep -c "<script" "$f")
  scripts_close=$(grep -c "</script>" "$f")
  if [ "$html" = "1" ] && [ "$body" = "1" ] && [ "$end" = "1" ] && [ "$scripts_open" = "$scripts_close" ]; then
    ok "$f"
  else
    err "$f (html=$html body=$body /html=$end script=$scripts_open/$scripts_close)"
  fi
done

echo ""
echo "=== 6. Fichiers .bak traînants ==="
HITS=$(find . -name "*.bak" -not -path "./.git/*" 2>/dev/null || true)
if [ -z "$HITS" ]; then ok "Aucun"; else echo "$HITS"; warn "Fichiers .bak à supprimer"; fi

echo ""
echo "=== 7. Leçons verrouillées ou déverrouillées (info) ==="
LOCKED=$(grep -l 'class="lock-row unlocked"' logique-algo/*.html 2>/dev/null | wc -l)
TOTAL=$(ls logique-algo/lecon-algo-*.html 2>/dev/null | wc -l)
echo "  ℹ️  $LOCKED / $TOTAL leçons en mode déverrouillé"

echo ""
echo "==============================================="
if [ "$FAIL" = "0" ]; then
  echo "  ✅ AUDIT OK — prêt à push"
else
  echo "  ❌ AUDIT ÉCHOUÉ — corriger avant push"
fi
echo "==============================================="
exit $FAIL
