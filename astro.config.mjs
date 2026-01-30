// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://martxelaran.github.io',
  base: '/PizzaPerTutti/',
  vite: {
    plugins: [tailwindcss()]
  }
});
