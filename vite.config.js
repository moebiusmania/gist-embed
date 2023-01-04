const { defineConfig } = require("vite");

const isPROD = process.env.NODE_ENV === 'production';

module.exports = defineConfig({
  base: isPROD ? "/gist-embed/" : "/",
  server: {
    port: 3000,
  },
  build: {
    outDir: "demo",
  },
});
