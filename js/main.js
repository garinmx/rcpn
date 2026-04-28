/**
 * RCPN v4.4 - Script de Inteligencia y Control
 * Optimizado para: www.rcpn.me
 * Estado: Estable / Produccion
 */

document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const modal = document.getElementById('news-modal');

    // ── Resistencia en Tinta: Caricaturas ──
    function renderizarCaricaturas(items) {
        const container = document.getElementById('caricaturas-container');
        if (!container) return;
        container.innerHTML = '';

        items.forEach(item => {
            const card = document.createElement('article');
            card.className = 'caricatura-card';

            const imgHTML = item.imagen
                ? `<img src="${item.imagen}"
                        alt="${item.titulo} — ${item.autor}"
                        class="caricatura-card__img"
                        loading="lazy" decoding="async"
                        onerror="this.style.display='none'">`
                : '';

            card.innerHTML = `
                <a href="${item.fuente}" target="_blank" rel="noopener noreferrer"
                   aria-label="Ver caricatura: ${item.titulo} de ${item.autor}">
                    <div class="caricatura-card__img-wrap">
                        ${imgHTML}
                        <div class="caricatura-card__placeholder" aria-hidden="true">
                            ✏️<span>${item.publicacion}</span>
                        </div>
                    </div>
                </a>
                <div class="caricatura-card__body">
                    <div class="caricatura-card__meta">
                        <span class="caricatura-card__autor">${item.autor}</span>
                        <span class="caricatura-card__pub">${item.publicacion}</span>
                        <span class="date" aria-hidden="true">${item.fecha}</span>
                    </div>
                    <h3 class="caricatura-card__titulo">${item.titulo}</h3>
                    <p class="caricatura-card__desc">${item.descripcion}</p>
                    <a href="${item.fuente}" target="_blank" rel="noopener noreferrer"
                       class="caricatura-card__link-label"
                       aria-label="Ver original de ${item.titulo}">Ver original →</a>
                </div>
            `;
            container.appendChild(card);
        });
    }

    fetch('data/caricaturas.json?v=' + Date.now(), { cache: 'no-cache' })
        .then(r => { if (!r.ok) throw new Error(); return r.json(); })
        .then(data => renderizarCaricaturas(data.caricaturas))
        .catch(() => {
            const c = document.getElementById('caricaturas-container');
            if (c) c.innerHTML = '<div class="loading-news">No se pudieron cargar las caricaturas.</div>';
        });

    // ── Monitor de Avistamientos ──
    function renderizarMonitor(reportes) {
        const tbody  = document.getElementById('monitor-tbody');
        const mobile = document.getElementById('monitor-cards-mobile');
        if (!tbody || !mobile) return;

        tbody.innerHTML  = '';
        mobile.innerHTML = '';

        if (!reportes || reportes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="color:var(--text-muted);font-style:italic;padding:20px 12px">Sin reportes activos en este momento.</td></tr>';
            return;
        }

        reportes.forEach(r => {
            const nivel = (r.riesgo || 'ALTO').toLowerCase();
            const pulse = nivel === 'alto' ? 'pulse' : '';

            // Fila de tabla (desktop)
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${r.ubicacion}</td>
                <td>${r.corporacion}</td>
                <td><span class="risk-badge ${nivel} ${pulse}">${r.riesgo}</span></td>
                <td style="font-size:.8rem;color:var(--text-muted)">${r.fecha || ''}</td>
            `;
            tbody.appendChild(tr);

            // Tarjeta (móvil)
            const card = document.createElement('div');
            card.className = 'monitor-card-item';
            card.innerHTML = `
                <div class="monitor-card-item__info">
                    <span class="monitor-card-item__loc">${r.ubicacion}</span>
                    <span class="monitor-card-item__corp">${r.corporacion} · ${r.fecha || ''}</span>
                </div>
                <span class="risk-badge ${nivel} ${pulse}">${r.riesgo}</span>
            `;
            mobile.appendChild(card);
        });
    }

    fetch('data/monitor.json?v=' + Date.now(), { cache: 'no-cache' })
        .then(r => { if (!r.ok) throw new Error(); return r.json(); })
        .then(data => renderizarMonitor(data.reportes))
        .catch(() => renderizarMonitor([]));

    // ── Radar de Noticias ──
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
    fetch('data/noticias.json?v=' + Date.now(), { cache: 'no-cache' })
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
