const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = [
  {
    devtool: "inline-source-map",
  
    // webpack will take the files from ./src/index
    entry: ["babel-polyfill", './src/index.tsx'],
  
    // and output it into /dist as bundle.js
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'variojs-dev-tools.js'
    },
    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: 9099
    },
    plugins: [new ForkTsCheckerWebpackPlugin()],
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
      ]
    },
  },
];