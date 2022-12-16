require('esbuild').build({
  entryPoints: ['src/reikai-log.ts'],
  outdir: 'dist',
  bundle: true,
  platform: 'node',
  sourcemap: process.env.NODE_ENV === "production" ? false : "inline",
  minify: process.env.NODE_ENV === "production",
  drop: process.env.NODE_ENV === "production" ? ['console'] : [],
}).catch(() => process.exit(1))
