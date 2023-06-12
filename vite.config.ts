import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins: [
    vue(),
    copy({
      targets: [{ src: 'src/manifest.json', dest: 'dist' }],
    }),
  ],
  build: {
    sourcemap: env.mode === 'development',
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'popup.html'),
        options: path.resolve(__dirname, 'options.html'),
        background: path.resolve(__dirname, 'src/background/index.ts'),
      },
      output: {
        entryFileNames(chunkInfo) {
          if (chunkInfo.name === 'background') {
            return 'background.js'
          } else {
            return `assets/[name].js`
          }
        },
        assetFileNames: `assets/[name].[ext]`,
        chunkFileNames: `assets/[name].js`,
        // manualChunks: (id) => {
        //   if (id.includes('node_modules')) {
        //     return 'vendor'
        //   }
        // },
      },
    },
  },
}))
