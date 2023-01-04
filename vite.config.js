const path = require("path");
const { defineConfig } = require("vite");

if (process.env.NODE_ENV === "production") {
  module.exports = defineConfig({
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/gistembed.ts"),
        name: "GistEmbed",
        fileName: (format) => `gistembed.${format}.js`,
      },
    },
  });
}

if (process.env.NODE_ENV !== "production") {
  module.exports = defineConfig({
    server: {
      port: 3000,
    },
    build: {
      outDir: "demo",
    },
  });
}
