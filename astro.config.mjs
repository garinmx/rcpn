import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'http://localhost:4321',
  server: { host: true, port: 4321, open: true },
  output: 'static',
  devToolbar: { enabled: false } // adiós error del toolbar
});
