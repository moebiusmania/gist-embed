const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/gistembed.ts"),
      name: "GistEmbed",
      fileName: (format) => `gistembed.${format}.js`,
    },
  },
});