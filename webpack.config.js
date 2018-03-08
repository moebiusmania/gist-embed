
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';
const buildPath = ENV === 'development' ?
  path.join(__dirname, './demo') :
  path.join(__dirname, './dist');

module.exports = {
  entry: {
    demo: './src/index.js'
  },
  mode: ENV,
  output: {
    path: buildPath,
    filename: 'gist_embed.js'
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
