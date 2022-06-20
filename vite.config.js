import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})/*
import { defineConfig } from 'vite' 
import react from '@vitejs/plugin-react'
export default defineConfig(({command, mode }) => { 
  return { assetsDir: 'res', plugins: [reacty()], 
      publicDir: 'dist', 
      root: 'src', 
      build: { emptyOutDir: true, outDir: '../dist' }
     }
    }
  )*/
