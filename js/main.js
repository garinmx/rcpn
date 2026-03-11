/**
 * RCPN v3.6 - Sistema de Inteligencia Autónoma
 * Sincronización Optimizada para Dominio rcpn.me
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Motor de Noticias (Fuentes diversificadas)
    const newsContainer = document.getElementById('news-container');
    const modal = document.getElementById('news-modal');
    
    // Plan C: Noticias de respaldo internas (por si la API externa falla)
    const backupNews = [
        {
            title: "Tesis Jurisprudencial: Inspecciones vehiculares",
            description: "La SCJN determina que la autoridad debe acreditar sospecha razonable antes de una revisión.",
            pubDate: "2026-03-10",
            link: "https://sjf2.scjn.gob.mx/",
            content: "Recordatorio táctico: El Artículo 16 protege tus posesiones. Ningún agente puede revisar tu unidad sin mandamiento escrito o flagrancia evidente."
        },
        {
            title: "Protocolo de Seguridad en Movilizaciones",
            description: "Recomendaciones de la RCPN para actuar en grupos de 5 a 50 personas.",
            pubDate: "2026-03-09",
            link: "#",
            content: "Mantener siempre la grabación en espejo y designar un vocero único para interlocución con la autoridad."
        }
    ];

    async function sincronizarRadar() {
        if(!newsContainer) return;

        // Intentamos usar un proxy gratuito para evitar bloqueos de CORS en rcpn.me
        const FEED_URL = "https://www.cndh.org.mx/noticias/rss.xml";
        const PROXY = "https://api.allorigins.win/get?url=" + encodeURIComponent(FEED_URL);

        try {
            const response = await fetch(PROXY);
            if (!response.ok) throw new Error();
            const data = await response.json();
            
            // Convertimos el XML de la CNDH a objetos legibles
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");
            const items = xmlDoc.querySelectorAll("item");

            if(items.length > 0) {
                newsContainer.innerHTML = '';
                items.forEach((item, index) => {
                    if(index < 6) {
                        renderCard({
                            title: item.querySelector("title").textContent,
                            description: item.querySelector("description").textContent,
                            pubDate: item.querySelector("pubDate").textContent,
                            link: item.querySelector("link").textContent,
                            content: item.querySelector("description").textContent
                        });
                    }
                });
            } else {
                throw new Error();
            }

        } catch (error) {
            console.warn("Sincronización externa fallida. Activando Radar Interno.");
            newsContainer.innerHTML = '';
            backupNews.forEach(nota => renderCard(nota));
        }
    }

    function renderCard(item) {
        const card = document.createElement('div');
        card.className = 'news-card';
        const fecha = new Date(item.pubDate).toLocaleDateString('es-MX', {day:'2-digit', month:'short'});
        
        card.innerHTML = `
            <span class="date">${fecha}</span>
            <h3>${item.title}</h3>
            <p>${item.description.replace(/<[^>]*>?/gm, '').substring(0, 110)}...</p>
            <span class="btn-read">Ver Detalles</span>
        `;
        card.onclick = () => abrirModal(item, fecha);
        newsContainer.appendChild(card);
    }

    function abrirModal(item, fecha) {
        document.getElementById('modal-title').innerText = item.title;
        document.getElementById('modal-date').innerText = fecha;
        document.getElementById('modal-body').innerHTML = item.content || item.description;
        document.getElementById('modal-link').href = item.link;
        modal.style.display = "block";
    }

    // Controles de Interfaz
    const closeBtn = document.querySelector('.close-modal');
    if(closeBtn) closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    window.compartirWhatsApp = () => {
        const titulo = document.getElementById('modal-title').innerText;
        const link = document.getElementById('modal-link').href;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Informe RCPN: ' + titulo + ' ' + link)}`, '_blank');
    };

    // Menú Móvil
    const mb = document.getElementById('mobile-menu');
    if(mb) mb.onclick = () => document.getElementById('nav-menu').classList.toggle('active');

    sincronizarRadar();
});
