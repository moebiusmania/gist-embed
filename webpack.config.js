const path = require('path');

module.exports = {
  entry: {
    demo: './src/index.js'
  },
  mode: 'development',
  output: {
    path: path.join(__dirname, './demo'),
    filename: 'demo.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    watchContentBase: true,
    watchOptions: {
      poll: true
    },
    compress: true,
    port: 8081,
    host: 'localhost',
    hot: true,
    inline: true
  }
};
