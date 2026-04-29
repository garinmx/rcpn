/**
 * RCPN v4.4 - Script de Inteligencia y Control
 * Optimizado para: www.rcpn.me
 * Estado: Estable / Produccion
 */

document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const modal = document.getElementById('news-modal');

    // ── Quiz Constitucional ──
    const QUIZ_PREGUNTAS = [
        {
            texto: '¿Qué artículo de la Constitución Mexicana protege a los ciudadanos de revisiones y detenciones arbitrarias?',
            opciones: ['Artículo 1°', 'Artículo 11', 'Artículo 16', 'Artículo 29'],
            correcta: 2,
            explicacion: 'El Artículo 16 establece que nadie puede ser molestado en su persona, familia o posesiones sin mandamiento escrito de autoridad competente, fundado y motivado legalmente.'
        },
        {
            texto: '¿Puedes negarte a abrir la cajuela de tu vehículo si un elemento de la Guardia Nacional te lo pide sin mostrar una orden escrita?',
            opciones: ['No, siempre debes obedecer a la autoridad', 'Sí, el Artículo 16 te protege sin orden judicial', 'Solo si el vehículo es tuyo', 'Depende del estado en que estés'],
            correcta: 1,
            explicacion: 'Sí. El Artículo 16 Constitucional exige mandamiento escrito fundado y motivado. Sin orden escrita, ninguna autoridad puede revisar tu vehículo, equipaje o domicilio.'
        },
        {
            texto: '¿Qué artículo constitucional garantiza el derecho de todo mexicano a transitar libremente por el territorio nacional?',
            opciones: ['Artículo 5°', 'Artículo 9°', 'Artículo 11', 'Artículo 16'],
            correcta: 2,
            explicacion: 'El Artículo 11 reconoce el derecho de toda persona a entrar, salir, viajar y mudar su residencia sin necesidad de carta de seguridad, pasaporte ni ningún otro requisito semejante.'
        },
        {
            texto: 'Si eres detenido por una autoridad, ¿cuál es el PRIMER derecho que debes ejercer?',
            opciones: ['Pagar la multa para salir pronto', 'Firmar el acta que te presenten', 'Conocer los cargos en tu contra y comunicarte con un abogado', 'Permanecer en silencio total sin decir nada'],
            correcta: 2,
            explicacion: 'El Artículo 20 Constitucional garantiza el derecho a conocer los cargos, a designar defensor y a comunicarse con quien desees desde el momento de la detención. Nunca firmes sin leer.'
        },
        {
            texto: '¿Cuántas horas como máximo puede la autoridad retenerte sin presentarte ante el Ministerio Público?',
            opciones: ['24 horas', '48 horas', '72 horas', 'No existe límite si es por seguridad nacional'],
            correcta: 1,
            explicacion: 'Ninguna autoridad puede retenerte más de 48 horas sin ponerlo a disposición del Ministerio Público. Superado ese plazo, la detención se convierte en detención arbitraria.'
        },
        {
            texto: '¿Qué es la Resistencia Civil Pacífica Nacional (RCPN)?',
            opciones: ['Un partido político de oposición', 'Un movimiento de defensa constitucional y derechos ciudadanos', 'Una dependencia del gobierno federal', 'Una asociación de abogados penalistas'],
            correcta: 1,
            explicacion: 'La RCPN es un movimiento civil independiente dedicado a empoderar al ciudadano mexicano a través del conocimiento jurídico, la organización colectiva y la acción constitucional frente al abuso de autoridad.'
        },
        {
            texto: '¿Quién coordina la Resistencia Civil Pacífica Nacional a nivel nacional?',
            opciones: ['Un comité anónimo rotativo', 'La Comisión Nacional de Derechos Humanos', 'Arturo Morales Camargo', 'El Senado de la República'],
            correcta: 2,
            explicacion: 'Arturo Morales Camargo es el Coordinador Nacional de la RCPN. Su trabajo ha sistematizado estrategias legales para ciudadanos que enfrentan abusos de autoridad en todo el territorio nacional.'
        },
        {
            texto: '¿Ante qué institución puedes presentar una queja formal por abuso de autoridad de manera gratuita?',
            opciones: ['La Suprema Corte de Justicia de la Nación', 'El SAT', 'La Comisión Nacional de los Derechos Humanos (CNDH)', 'El IMSS'],
            correcta: 2,
            explicacion: 'La CNDH recibe quejas de forma gratuita contra autoridades federales. En el ámbito estatal, las Comisiones Estatales de Derechos Humanos cumplen la misma función.'
        },
        {
            texto: '¿Qué principio jurídico establece que toda persona debe ser considerada inocente mientras no se pruebe lo contrario ante un juez?',
            opciones: ['Principio de legalidad', 'Presunción de inocencia', 'Principio de proporcionalidad', 'Non bis in idem'],
            correcta: 1,
            explicacion: 'La presunción de inocencia, consagrada en el Artículo 20 Constitucional, es una garantía irrenunciable: nadie puede ser tratado como culpable sin una sentencia firme dictada por un juez.'
        },
        {
            texto: '¿Puede un elemento de cualquier corporación de seguridad ingresar a tu domicilio sin orden judicial escrita, aunque diga tener una "orden verbal"?',
            opciones: ['Sí, si lo ordena un superior jerárquico', 'Sí, en caso de delito flagrante siempre', 'No, requiere orden judicial escrita en todos los casos', 'Solo puede hacerlo la Guardia Nacional, no la policía estatal'],
            correcta: 2,
            explicacion: 'El Artículo 16 es claro: el domicilio es inviolable. Solo se puede ingresar con orden escrita de un juez. La excepción del delito flagrante es muy específica y no ampara revisiones de rutina.'
        }
    ];

    const QUIZ_NIVELES = [
        { min: 0,  max: 3,  icono: '📖', nivel: 'Ciudadano en Formación',    msg: 'La información es tu primer escudo. Te invitamos a explorar el Radar Jurídico para fortalecer tu conocimiento constitucional.' },
        { min: 4,  max: 6,  icono: '⚖️', nivel: 'Ciudadano Informado',        msg: 'Conoces los fundamentos. Con un poco más de práctica, serás un defensor constitucional activo en tu comunidad.' },
        { min: 7,  max: 9,  icono: '🛡️', nivel: 'Defensor Activo',            msg: 'Sólido conocimiento constitucional. La RCPN te necesita. Comparte lo que sabes y organiza a quienes te rodean.' },
        { min: 10, max: 10, icono: '⭐', nivel: 'Guardián Constitucional',    msg: '¡Puntaje perfecto! Eres exactamente el tipo de ciudadano que México necesita. La Resistencia cuenta contigo.' }
    ];

    let quizEstado = { preguntaActual: 0, puntaje: 0, respondida: false };

    function quizMostrarPregunta(idx) {
        const p = QUIZ_PREGUNTAS[idx];
        const total = QUIZ_PREGUNTAS.length;
        quizEstado.respondida = false;

        document.getElementById('quiz-counter').textContent = `Pregunta ${idx + 1} de ${total}`;
        document.getElementById('quiz-bar-fill').style.width = `${(idx / total) * 100}%`;
        document.getElementById('quiz-question').textContent = p.texto;

        const feedback = document.getElementById('quiz-feedback');
        feedback.hidden = true;
        feedback.className = 'quiz-feedback';

        const btnNext = document.getElementById('quiz-btn-next');
        btnNext.hidden = true;
        btnNext.textContent = idx + 1 < total ? 'Siguiente →' : 'Ver resultado →';

        const opcionesEl = document.getElementById('quiz-options');
        opcionesEl.innerHTML = '';
        p.opciones.forEach((texto, i) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = texto;
            btn.type = 'button';
            btn.addEventListener('click', () => quizSeleccionar(i, p));
            opcionesEl.appendChild(btn);
        });
    }

    function quizSeleccionar(idx, pregunta) {
        if (quizEstado.respondida) return;
        quizEstado.respondida = true;

        const botones = document.querySelectorAll('.quiz-option');
        botones.forEach((btn, i) => {
            btn.disabled = true;
            if (i === pregunta.correcta) btn.classList.add('correcta');
            else if (i === idx) btn.classList.add('incorrecta');
        });

        if (idx === pregunta.correcta) quizEstado.puntaje++;

        const feedback = document.getElementById('quiz-feedback');
        feedback.textContent = pregunta.explicacion;
        feedback.className = 'quiz-feedback ' + (idx === pregunta.correcta ? 'ok' : 'fail');
        feedback.hidden = false;

        document.getElementById('quiz-btn-next').hidden = false;
    }

    function quizMostrarResultado() {
        document.getElementById('quiz-game').hidden = true;
        const resultEl = document.getElementById('quiz-result');
        resultEl.hidden = false;

        const score = quizEstado.puntaje;
        const nivel = QUIZ_NIVELES.find(n => score >= n.min && score <= n.max);

        document.getElementById('quiz-result-badge').textContent = nivel.icono;
        document.getElementById('quiz-result-score').textContent = `${score} / ${QUIZ_PREGUNTAS.length}`;
        document.getElementById('quiz-result-nivel').textContent = nivel.nivel;
        document.getElementById('quiz-result-msg').textContent = nivel.msg;
    }

    function quizReiniciar() {
        quizEstado = { preguntaActual: 0, puntaje: 0, respondida: false };
        document.getElementById('quiz-result').hidden = true;
        document.getElementById('quiz-start').hidden = true;
        document.getElementById('quiz-game').hidden = false;
        quizMostrarPregunta(0);
    }

    const btnStart = document.getElementById('quiz-btn-start');
    if (btnStart) {
        btnStart.addEventListener('click', () => {
            document.getElementById('quiz-start').hidden = true;
            document.getElementById('quiz-game').hidden = false;
            quizMostrarPregunta(0);
        });
    }

    const btnNext = document.getElementById('quiz-btn-next');
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            quizEstado.preguntaActual++;
            if (quizEstado.preguntaActual < QUIZ_PREGUNTAS.length) {
                quizMostrarPregunta(quizEstado.preguntaActual);
            } else {
                document.getElementById('quiz-bar-fill').style.width = '100%';
                quizMostrarResultado();
            }
        });
    }

    const btnRetry = document.getElementById('quiz-btn-retry');
    if (btnRetry) btnRetry.addEventListener('click', quizReiniciar);

    // ── Formulario de Contacto ──
    const contactoForm = document.getElementById('contacto-form');
    if (contactoForm) {
        contactoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('cf-submit');
            const submitText = submitBtn.querySelector('.cf-submit-text');
            const submitLoading = submitBtn.querySelector('.cf-submit-loading');

            submitBtn.disabled = true;
            submitText.hidden = true;
            submitLoading.hidden = false;

            const data = new FormData(contactoForm);

            try {
                const res = await fetch('https://formsubmit.co/ajax/psp.edo.mex@gmail.com', {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (!res.ok) throw new Error();
                contactoForm.hidden = true;
                document.getElementById('contacto-success').hidden = false;
            } catch {
                submitBtn.disabled = false;
                submitText.hidden = false;
                submitLoading.hidden = true;
                alert('Hubo un error al enviar tu mensaje. Por favor intenta de nuevo o escríbenos directamente a psp.edo.mex@gmail.com');
            }
        });
    }

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

    // Navegación Fluida Blindada — solo enlaces del nav
    document.querySelectorAll('#nav-menu a[href^="#"]').forEach(anchor => {
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
