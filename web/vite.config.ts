// @ts-ignore
import { defineConfig } from 'vite'

// @ts-ignore
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: "./",
  server: {
    host: "0.0.0.0"
  }
})
