const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  server: {
    port: 3000,
  },
  build: {
    outDir: "demo",
  },
});
