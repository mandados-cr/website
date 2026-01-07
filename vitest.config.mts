import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'components/**/*.{js,jsx,ts,tsx}',
        'lib/**/*.{js,jsx,ts,tsx}',
        'app/**/*.{js,jsx,ts,tsx}',
      ],
      exclude: [
        '**/*.d.ts',
        '**/node_modules/**',
        '**/.next/**',
        '**/__tests__/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
