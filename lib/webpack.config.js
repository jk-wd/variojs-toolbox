const path = require('path');

module.exports = {
    devtool: "eval",
  
    // webpack will take the files from ./src/index
    entry: './src/index.js',
  
    // and output it into /dist as bundle.js
    output: {
      libraryTarget:'umd',
      path: path.join(__dirname, '/dist'),
      filename: 'index.js'
    },
  
    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
  
          // we use babel-loader to load our jsx and tsx files
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          },
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ]
    },
  }