/**
 * RCPN v4.4 - Script de Inteligencia y Control
 * Optimizado para: www.rcpn.me
 * Estado: Estable / Produccion
 */

document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const modal = document.getElementById('news-modal');

    // Datos Jurídicos de Respaldo - Aumenta la densidad de palabras para SEO
    const noticiasLocales = [
        {
            title: "Tesis Jurisprudencial: Inspecciones vehiculares",
            description: "La SCJN determina que la autoridad debe acreditar sospecha razonable antes de una revisión.",
            pubDate: "10 MAR 2026",
            link: "https://sjf2.scjn.gob.mx/",
            content: "Nadie puede ser molestado en su persona o posesiones sin un mandamiento escrito que funde y motive la causa legal del procedimiento. La RCPN vigila el cumplimiento del Artículo 16."
        },
        {
            title: "Derecho a Documentar con Celular",
            description: "La CNDH ratifica que grabar servidores públicos es un ejercicio legítimo de transparencia.",
            pubDate: "09 MAR 2026",
            link: "https://www.cndh.org.mx/",
            content: "Documentar el actuar de la autoridad es un derecho. No constituye delito ni falta administrativa siempre que no se obstruya físicamente la labor policial."
        },
        {
            title: "Victoria en Querétaro: Retén Arbitrario Anulado por Amparo Ciudadano",
            description: "La RCPN acompañó jurídicamente a un grupo de 8 conductores detenidos sin causa razonable en la caseta de Tepotzotlán, logrando la interposición de un amparo indirecto que obligó a la Guardia Nacional a liberar a las personas retenidas en menos de 4 horas. La resolución del Juzgado de Distrito determinó que la revisión carecía de fundamento legal al no existir mandamiento escrito ni sospecha razonable debidamente acreditada, sentando un precedente aplicable en toda la región.",
            pubDate: "28 MAR 2026",
            link: "https://sjf2.scjn.gob.mx/",
            content: "Este caso demuestra que la organización ciudadana y el conocimiento jurídico son las herramientas más eficaces frente al abuso de autoridad. La RCPN documentó cada paso del procedimiento, desde la detención arbitraria hasta la resolución judicial, y pone este expediente a disposición de cualquier ciudadano que enfrente una situación similar en las vías generales de comunicación de la República Mexicana."
        },
        {
            title: "RCPN Protege a 14 Conductores Retenidos Ilegalmente en la México-Puebla",
            description: "En un operativo coordinado desde nuestra red de alertas en tiempo real, integrantes de la RCPN respondieron al reporte de 14 conductores de carga retenidos por más de 6 horas en el tramo Río Frío de la autopista México-Puebla, sin que mediara orden de autoridad competente ni se les informara el motivo de la detención. La intervención de nuestros asesores jurídicos, apoyada en la grabación en video del procedimiento y la notificación formal a la CNDH, derivó en la liberación inmediata de las personas y el inicio de una queja administrativa contra los elementos responsables.",
            pubDate: "20 MAR 2026",
            link: "https://www.cndh.org.mx/",
            content: "El derecho a circular libremente por las vías generales de comunicación está garantizado por el Artículo 11 Constitucional. Toda restricción a este derecho exige fundamento legal expreso y motivación suficiente. La RCPN reitera que cualquier ciudadano tiene derecho a conocer los motivos de cualquier detención y a comunicarse con un abogado o familiar desde el primer momento."
        },
        {
            title: "Nuevo Precedente: La SCJN Reitera que Toda Inspección sin Causa Viola el Artículo 16",
            description: "La Primera Sala de la Suprema Corte de Justicia de la Nación emitió una tesis jurisprudencial que refuerza la posición histórica de la RCPN: ninguna corporación de seguridad pública, federal, estatal o municipal, puede practicar revisiones a personas o vehículos sin acreditar previamente una sospecha razonable individualizada y documentada. La resolución es aplicable a toda inspección realizada en retenes, operativos carreteros y puntos de revisión, y constituye una herramienta legal de primer orden para quienes hayan sido objeto de revisiones arbitrarias en el territorio nacional.",
            pubDate: "15 MAR 2026",
            link: "https://sjf2.scjn.gob.mx/",
            content: "Esta tesis jurisprudencial es una victoria para todos los ciudadanos mexicanos. La RCPN la incorpora de inmediato a su arsenal de defensa y la pone a disposición gratuita de cualquier persona que la requiera para impugnar una revisión arbitraria ante las autoridades competentes. Conocer tus derechos es el primer paso para ejercerlos."
        }
    ];

    // Funcion de Renderizado - Asegura contenido en el Radar
    function renderizar(items) {
        if(!newsContainer) return;
        newsContainer.innerHTML = ''; 
        
        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            const titleId = `news-title-${index}`;
            card.setAttribute('aria-labelledby', titleId);
            card.innerHTML = `
                <span class="date" aria-hidden="true">${item.pubDate}</span>
                <h3 id="${titleId}">${item.title}</h3>
                <p>${item.description}</p>
                <span class="btn-read" aria-hidden="true">LEER DETALLES</span>
            `;

            function abrirModal() {
                if (modal) {
                    const mTitle = document.getElementById('modal-title');
                    const mBody = document.getElementById('modal-body');
                    if (mTitle) mTitle.innerText = item.title;
                    if (mBody) mBody.innerText = item.content;
                    modal.style.display = 'block';
                }
            }

            card.addEventListener('click', abrirModal);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    abrirModal();
                }
            });
            
            newsContainer.appendChild(card);
        });
    }

    renderizar(noticiasLocales);

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

    // Cierre de Modal seguro
    const closeBtn = document.querySelector('.close-modal');
    if(closeBtn && modal) {
        closeBtn.onclick = () => { modal.style.display = "none"; };
    }

    window.onclick = (event) => {
        if (modal && event.target == modal) {
            modal.style.display = "none";
        }
    };

});
