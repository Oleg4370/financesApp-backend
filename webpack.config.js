const { resolve } = require('path')

const config = {
  entry: {
    main: resolve('./src/app.ts')
  },
  output: {
    path: resolve(__dirname, './dist')
  },
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: ['awesome-typescript-loader?module=es6'],
        exclude: [/node_modules/]
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@src': resolve(__dirname, './src'),
      '@utils': resolve(__dirname, './src/utils')
    },
  },
}

module.exports = config;
