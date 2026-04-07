import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://pizzapertutti.net',
  base: '/',
  vite: {
    plugins: [tailwindcss()]
  }
})