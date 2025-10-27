#!/bin/bash

# Script de deploy rápido para RCPN
# Uso: ./deploy.sh "Mensaje del commit"

if [ -z "$1" ]; then
  echo "❌ Error: Debes proporcionar un mensaje de commit"
  echo "Uso: ./deploy.sh \"Tu mensaje aquí\""
  exit 1
fi

echo "📦 Agregando archivos..."
git add -A

echo "💾 Haciendo commit..."
git commit -m "$1"

echo "🚀 Subiendo a GitHub..."
git push origin main

echo "✅ Deploy completado. Revisa el workflow en:"
echo "https://github.com/garinmx/rcpn/actions"
