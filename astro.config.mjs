// @ts-check
import { defineConfig } from 'astro/config';

// URL finale du site (utilisée pour les balises canoniques et Open Graph).
export default defineConfig({
  site: 'https://www.sprint-racing.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
