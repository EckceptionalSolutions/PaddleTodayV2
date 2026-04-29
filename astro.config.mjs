import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || process.env.PUBLIC_SITE_URL || 'http://localhost:4321';
const apiOrigin = process.env.CANOE_API_ORIGIN || 'http://127.0.0.1:4322';

export default defineConfig({
  site,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/') && !page.includes('/alerts/unsubscribe/'),
    }),
  ],
  vite: {
    server: {
      proxy: {
        '/api': apiOrigin,
      },
    },
  },
});
