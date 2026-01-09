import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: true,
    allowedHosts: ['localhost', 'frontend']
  },
  watch: {
      usePolling: true, // Essential for Docker/Codespaces to detect file changes
    },
      hmr: {
      // This allows the HMR websocket to work through the Codespace proxy
      clientPort: 443, 
    },
})


