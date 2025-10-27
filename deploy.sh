#!/bin/bash

# Script de deploy sincronizado para RCPN
# Uso: ./deploy.sh "Mensaje del commit"

if [ -z "$1" ]; then
  echo "❌ Error: Debes proporcionar un mensaje de commit"
  echo "Uso: ./deploy.sh \"Tu mensaje aquí\""
  exit 1
fi

echo "🔄 Sincronizando con remoto..."
git pull origin main

if [ $? -ne 0 ]; then
  echo "⚠️  Conflictos detectados. Resuélvelos manualmente y vuelve a ejecutar."
  exit 1
fi

echo "📦 Agregando archivos..."
git add -A

if git diff-index --quiet HEAD --; then
  echo "ℹ️  No hay cambios para hacer commit"
  exit 0
fi

echo "💾 Haciendo commit..."
git commit -m "$1"

echo "🚀 Subiendo a GitHub..."
git push origin main

echo "✅ Deploy completado. Revisa el workflow en:"
echo "https://github.com/garinmx/rcpn/actions"
