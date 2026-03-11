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
        }
    ];

    // Funcion de Renderizado - Asegura contenido en el Radar
    function renderizar(items) {
        if(!newsContainer) return;
        newsContainer.innerHTML = ''; 
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.innerHTML = `
                <span class="date">${item.pubDate}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="btn-read">LEER DETALLES</span>
            `;
            
            // Logica de apertura de modal si existe
            card.onclick = () => {
                if(modal) {
                    const mTitle = document.getElementById('modal-title');
                    const mBody = document.getElementById('modal-body');
                    if(mTitle) mTitle.innerText = item.title;
                    if(mBody) mBody.innerText = item.content;
                    modal.style.display = "block";
                }
            };
            
            newsContainer.appendChild(card);
        });
    }

    renderizar(noticiasLocales);

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

    console.log("RCPN v4.4: Despliegue de JavaScript exitoso.");
});
