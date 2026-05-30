import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const fallbackLocalSite = 'http://localhost:4321';
const productionSite = 'https://paddletoday.com';
const isProduction = process.env.NODE_ENV === 'production';
const site = process.env.SITE_URL || process.env.PUBLIC_SITE_URL || (isProduction ? productionSite : fallbackLocalSite);
const apiOrigin = process.env.CANOE_API_ORIGIN || 'http://127.0.0.1:4322';

if (isProduction && !process.env.SITE_URL && !process.env.PUBLIC_SITE_URL) {
  console.warn(
    `SITE_URL or PUBLIC_SITE_URL is not set; production canonicals and sitemap URLs will use ${productionSite}.`
  );
}

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
