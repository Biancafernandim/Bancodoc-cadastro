// Imports the defineConfig function from Vite, which is used to provide type-safe configuration.
import { defineConfig } from 'vite'
// Imports the official Vite plugin for React, which enables React-specific features like Fast Refresh.
import react from '@vitejs/plugin-react'

// The main configuration for the Vite build tool.
// See https://vite.dev/config/ for more information.
export default defineConfig({
  // An array of plugins to use.
  plugins: [
    // The React plugin is used to enable support for React.
    react()
  ],
})