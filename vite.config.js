import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/https://github.com/mehdi-charafi/Cards-Game-Emperor-Citizen-Slave/',
  plugins: [
    tailwindcss(),
  ],
})
