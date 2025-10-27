import { defineConfig } from 'astro/config';

// Añadirás site y la integración de sitemap cuando apruebes "go live".
export default defineConfig({
  // site: 'https://tu-dominio.tld', // definir al publicar
  integrations: [
    // import sitemap desde '@astrojs/sitemap' cuando definas `site`
    // sitemap()
  ],
});
