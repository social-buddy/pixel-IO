import { replace } from 'esbuild-plugin-replace'
import { defineConfig } from 'tsup'
import { execSync } from 'child_process'

const revision = execSync('git rev-parse HEAD').toString().trim()

const exportUri = () => {
  switch (process.env.NODE_ENV) {
    case 'dev':
      return { url: `http://localhost:8080`, dest: 'pixelio.min.js' }
    case 'test':
      return {
        url: `https://mb-test.pixel.swello.com`,
        dest: 'pixelio.test.min.js',
      }
    default:
      return { url: `https://mb.pixel.swello.com`, dest: 'pixelio.min.js' }
  }
}

const uris = exportUri()

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm', 'iife'],
    globalName: 'PixelIOLib',
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: true,
    minify: !options.watch,
    esbuildPlugins: [
      replace({
        URI: uris.url,
        pio_version: revision,
      }),
    ],
  }
})
