/**
 * RCPN v4.4 - Script de Inteligencia y Control
 * Optimizado para: www.rcpn.me
 * Estado: Estable / Produccion
 */

document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const modal = document.getElementById('news-modal');

    // Función de Renderizado
    function renderizar(items) {
        if(!newsContainer) return;
        newsContainer.innerHTML = '';

        items.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.innerHTML = `
                <span class="date" aria-hidden="true">${item.pubDate}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <button class="btn-read" type="button" aria-label="Leer detalles: ${item.title}">LEER DETALLES</button>
            `;

            function abrirModal() {
                if (modal) {
                    document.getElementById('modal-title').innerText = item.title;
                    document.getElementById('modal-body').innerText  = item.content;
                    document.getElementById('modal-link').href        = item.link;
                    modal.classList.add('is-open');
                    modal.focus();
                }
            }

            card.addEventListener('click', abrirModal);

            newsContainer.appendChild(card);
        });
    }

    // Carga noticias desde JSON; fallback a array vacío si falla
    fetch('data/noticias.json')
        .then(r => { if (!r.ok) throw new Error(); return r.json(); })
        .then(data => renderizar(data.noticias))
        .catch(() => {
            if (newsContainer) {
                newsContainer.innerHTML = '<div class="loading-news">No se pudo cargar el radar. Intenta más tarde.</div>';
            }
        });

    // Menú móvil accesible
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'nav-menu');

        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('nav-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('nav-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menú');
            });
        });
    }

    // Navegación Fluida Blindada
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Cierre de Modal
    function cerrarModal() {
        if (modal) modal.classList.remove('is-open');
    }

    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) closeBtn.addEventListener('click', cerrarModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarModal();
    });

});
