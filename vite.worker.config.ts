import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: 'worker/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    outDir: 'dist-worker',
    target: 'es2022',
  },
})
