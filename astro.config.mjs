import { defineConfig } from 'astro/config';

export default defineConfig({
  site: '(https://rcpn.me'),
  server: { host: true, port: 4321, open: true },
  output: 'static',
  devToolbar: { enabled: false } // adiós error del toolbar
});
