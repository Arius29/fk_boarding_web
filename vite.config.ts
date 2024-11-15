import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

const envVariables = {}
for (const key in process.env) {
  if (key.startsWith('VITE_')) {
    envVariables[`process.env.${key}`] = JSON.stringify(process.env[key])
  }
}

export default defineConfig({
  plugins: [react()],
  esbuild: {
    logLevel: 'silent',
  },
  define: envVariables,
  server: {
    strictPort: true,
    port: 4200,
  },
})
