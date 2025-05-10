import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    // Enable global test utilities like describe, it, expect
    globals: true,

    // Environment to run tests in
    environment: 'happy-dom',

    // File patterns to include
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],

    // File patterns to exclude
    exclude: ['**/node_modules/**', '**/dist/**'],

    // Directory where coverage reports will be output
    coverage: {
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage'
    },

    // Aliases for imports (makes test paths cleaner)
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
