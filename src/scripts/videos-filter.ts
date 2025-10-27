// /src/scripts/videos-filter.ts
(() => {
  const filtros = document.getElementById('filtros') as HTMLDivElement | null;
  const bloques = Array.from(
    document.querySelectorAll<HTMLElement>('.bloque-categoria')
  );

  if (!filtros) return;

  filtros.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const btn = target.closest('button') as HTMLButtonElement | null;
    if (!btn) return;

    const categoria = (btn.dataset?.categoria as string) || 'Todas';

    // Estado visual de botones
    filtros.querySelectorAll('button').forEach((b) => b.classList.remove('activo'));
    btn.classList.add('activo');

    // Mostrar/ocultar bloques por categoría
    if (categoria === 'Todas') {
      bloques.forEach((sec) => sec.style.removeProperty('display'));
    } else {
      bloques.forEach((sec) => {
        if (sec.dataset?.nombre === categoria) {
          sec.style.removeProperty('display');
        } else {
          sec.style.display = 'none';
        }
      });
    }

    const cont = document.getElementById('videosCategorias') as HTMLElement | null;
    cont?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
