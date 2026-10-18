import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Относительные пути: сборка работает из любой подпапки,
  // в том числе https://<user>.github.io/<repo>/ на GitHub Pages.
  // Роутера нет (страница одна, номер страницы хранится в состоянии), поэтому 404 при обновлении не бывает.
  base: './',
})
