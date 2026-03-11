document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const modal = document.getElementById('news-modal');

    // DATOS DE RESPALDO (Aparecen inmediatamente)
    const noticiasLocales = [
        {
            title: "Tesis Jurisprudencial: Inspecciones vehiculares",
            description: "La SCJN determina que la autoridad debe acreditar sospecha razonable antes de una revisión.",
            pubDate: "10 MAR 2026",
            link: "https://sjf2.scjn.gob.mx/",
            content: "Análisis táctico: El Artículo 16 protege tus posesiones. Ningún agente puede revisar tu unidad sin mandamiento escrito o flagrancia evidente. La sospecha subjetiva es insuficiente para molestar al ciudadano."
        },
        {
            title: "Protocolo de Seguridad en Movilizaciones",
            description: "Recomendaciones de la RCPN para actuar en grupos de 5 a 50 personas.",
            pubDate: "09 MAR 2026",
            link: "#",
            content: "Para una resistencia efectiva: 1. Grabación en espejo (mínimo 3 ángulos). 2. Designar un vocero único. 3. Mantener formación de escudo alrededor de la víctima de abuso."
        }
    ];

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
            card.onclick = () => {
                document.getElementById('modal-title').innerText = item.title;
                document.getElementById('modal-body').innerText = item.content;
                document.getElementById('modal-link').href = item.link;
                modal.style.display = "block";
            };
            newsContainer.appendChild(card);
        });
    }

    // Ejecutar renderizado inicial
    renderizar(noticiasLocales);

    // Intento de Sincronización Real con CNDH
    async function sincronizarRadar() {
        const PROXY = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cndh.org.mx/noticias/rss.xml");
        try {
            const response = await fetch(PROXY);
            const data = await response.json();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");
            const items = xmlDoc.querySelectorAll("item");
            
            if(items.length > 0) {
                console.log("Radar: Sincronización exitosa.");
                // Aquí podrías añadir lógica para mezclar noticias si lo deseas
            }
        } catch (error) { console.warn("Radar operando con base de datos interna."); }
    }

    // Controles UI
    const closeBtn = document.querySelector('.close-modal');
    if(closeBtn) closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    window.compartirWhatsApp = () => {
        const titulo = document.getElementById('modal-title').innerText;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Informe RCPN: ' + titulo + ' - Ver más en rcpn.me')}`, '_blank');
    };

    const mb = document.getElementById('mobile-menu');
    if(mb) mb.onclick = () => document.getElementById('nav-menu').classList.toggle('active');

    sincronizarRadar();
});
