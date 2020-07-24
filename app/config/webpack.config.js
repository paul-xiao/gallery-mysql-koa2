const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  stats: 'errors-only',
  entry: {
    main: [
      path.resolve(__dirname, '../../index.js'),
      'webpack-hot-middleware/client?noInfo=true&reload=true',
    ],
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
  },
  externals: [nodeExternals()], // ignore files in node_moudles
  plugins: [new webpack.HotModuleReplacementPlugin()],
}
