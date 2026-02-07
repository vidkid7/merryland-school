import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  build: {
    // Use esbuild for minification (faster and built-in)
    minify: 'esbuild',
    
    // Chunk size warning limit (500KB)
    chunkSizeWarningLimit: 500,
    
    // Rollup options for code splitting
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: (id) => {
          // React core libraries (highest priority)
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          
          // React Router
          if (id.includes('node_modules/react-router-dom') || 
              id.includes('node_modules/react-router') ||
              id.includes('node_modules/@remix-run')) {
            return 'vendor-router';
          }
          
          // Animation library
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-animation';
          }
          
          // Internationalization
          if (id.includes('node_modules/i18next') || 
              id.includes('node_modules/react-i18next')) {
            return 'vendor-i18n';
          }
          
          // Firebase
          if (id.includes('node_modules/firebase') || 
              id.includes('node_modules/@firebase')) {
            return 'vendor-firebase';
          }
          
          // Icons library
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-icons';
          }
        },
        
        // Naming pattern for chunks
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    
    // Source map configuration (disabled for production)
    sourcemap: false,
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Report compressed size
    reportCompressedSize: true,
    
    // Target modern browsers for better optimization
    target: 'es2015',
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
    ],
  },
  
  // Esbuild options for better tree-shaking
  esbuild: {
    drop: ['console', 'debugger'], // Remove console and debugger in production
    legalComments: 'none', // Remove comments
  },
  
  // Server configuration for development
  server: {
    // Enable compression in dev mode
    compress: true,
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: true,
  },
})
