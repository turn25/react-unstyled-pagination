import { defineConfig } from 'tsup';

export default defineConfig({
  sourcemap: false,
  minify: true,
  dts: true,
  format: ['esm', 'cjs'],
  banner: { js: '"use client";' },
});
