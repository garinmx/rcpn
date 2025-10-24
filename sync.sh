#!/bin/bash
# Script para actualizar el repo RCPN rápidamente

MSG=${1:-"actualización automática"}

echo "🚀 Subiendo cambios a GitHub con mensaje: $MSG"
git add .
git commit -m "$MSG"
git pull --rebase origin main
git push origin main
echo "✅ Sincronización completa"
