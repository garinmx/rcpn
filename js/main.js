/**
 * RCPN v3.0 - Sistema de Inteligencia Autónoma
 * Conexión en tiempo real con bases de datos de Derechos Humanos
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Configuración de API (RSS to JSON)
    const FEED_URL = "https://www.cndh.org.mx/noticias/rss.xml";
    const API_CONVERTER = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`;

    const newsContainer = document.getElementById('news-container');
    const modal = document.getElementById('news-modal');
    const closeBtn = document.querySelector('.close-modal');

    // 2. Función de Extracción Dinámica
    async function sincronizarRadar() {
        if(!newsContainer) return;

        try {
            const response = await fetch(API_CONVERTER);
            const data = await response.json();

            if (data.status === 'ok') {
                newsContainer.innerHTML = ''; // Limpiamos el cargador

                data.items.slice(0, 6).forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'news-card';
                    
                    const fecha = new Date(item.pubDate).toLocaleDateString('es-MX', {
                        day: '2-digit', month: 'short', year: 'numeric'
                    });

                    card.innerHTML = `
                        <span class="date">${fecha}</span>
                        <h3>${item.title}</h3>
                        <p>${item.description.replace(/<[^>]*>?/gm, '').substring(0, 110)}...</p>
                        <span class="btn-read">Ver Detalles y Fuente</span>
                    `;

                    card.onclick = () => abrirModal(item, fecha);
                    newsContainer.appendChild(card);
                });
            }
        } catch (error) {
            console.error("Fallo de sincronización:", error);
            newsContainer.innerHTML = '<p class="loading-news" style="color:#e74c3c;">Error: No se pudo conectar con el radar de noticias oficial.</p>';
        }
    }

    // 3. Gestión del Modal
    function abrirModal(item, fecha) {
        document.getElementById('modal-title').innerText = item.title;
        document.getElementById('modal-date').innerText = fecha;
        
        // Limpieza de HTML de la descripción
        const cleanBody = item.content || item.description;
        document.getElementById('modal-body').innerHTML = cleanBody;
        
        const linkBtn = document.getElementById('modal-link');
        linkBtn.href = item.link;
        linkBtn.innerText = "Consultar Fuente en CNDH";
        
        modal.style.display = "block";
    }

    if(closeBtn) {
        closeBtn.onclick = () => modal.style.display = "none";
    }

    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = "none";
    };

    // 4. Compartir WhatsApp
    window.compartirWhatsApp = () => {
        const titulo = document.getElementById('modal-title').innerText;
        const link = document.getElementById('modal-link').href;
        const texto = `📌 RCPN - Informe de Justicia: ${titulo}\n\nLee más aquí: ${link}`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`, '_blank');
    };

    // 5. Menú Móvil
    const mobileBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    if(mobileBtn) {
        mobileBtn.onclick = () => navMenu.classList.toggle('active');
    }

    // Iniciar Sincronización
    sincronizarRadar();
});