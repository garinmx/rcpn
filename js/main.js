/**
 * RCPN v4.4 - Script de Inteligencia y Control
 * Optimizado para: www.rcpn.me
 */

document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const modal = document.getElementById('news-modal');

    // Datos Jurídicos de Respaldo para evitar 'Thin Content'
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
            title: "Amparo contra Retenes Ilegales",
            description: "Análisis de la suspensión definitiva obtenida contra revisiones arbitrarias en carreteras federales.",
            pubDate: "08 MAR 2026",
            link: "https://www.scjn.gob.mx/",
            content: "La libertad de tránsito es un derecho fundamental que no puede ser condicionado por revisiones preventivas sin causa probable justificada ante un juez."
        }
    ];

    // Función de Renderizado en el DOM
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
            
            // Lógica para abrir modal con información extendida
            card.onclick = () => {
                if(modal) {
                    const modalTitle = document.getElementById('modal-title');
                    const modalBody = document.getElementById('modal-body');
                    const modalLink = document.getElementById('modal-link');
                    
                    if(modalTitle) modalTitle.innerText = item.title;
                    if(modalBody) modalBody.innerText = item.content;
                    if(modalLink) modalLink.href = item.link;
                    
                    modal.style.display = "block";
                }
            };
            
            newsContainer.appendChild(card);
        });
    }

    // Inicializar Radar
    renderizar(noticiasLocales);

    // Navegación Fluida (Smooth Scroll)
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

    // Control de cierre del Modal
    const closeBtn = document.querySelector('.close-modal');
    if(closeBtn && modal) {
        closeBtn.onclick = () => modal.style.display = "none";
    }

    window.onclick = (e) => {
        if (modal && e.target == modal) modal.style.display = "none";
    };

    console.log("RCPN v4.4: Despliegue de JavaScript exitoso.");
}); // <--- Aquí estaba el error: faltaba cerrar la función principal
