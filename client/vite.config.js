import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5005",
        secure:false,
      },
    },
  },
  plugins: [react()],
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({

//   server: {

//     proxy: {

//       '/api': {
//         target: 'http://localhost:5005',
//         // changeOrigin: true,
//         secure: false,
//       },

//       '/admin': {
//         target: 'http://localhost:5005',
//         // changeOrigin: true,
//         secure: false,
//       },

//     },

//   },

//   plugins: [react()],
  
// });
