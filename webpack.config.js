const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

const srcDir = 'src'
const distDir = 'dist'

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, srcDir, 'index.tsx')
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, srcDir), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, distDir)
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/worker/service_worker.ts'),
      filename: 'sw.js',
      excludes: ['**/*'],
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, distDir),
    compress: true,
    port: 4000
  }
}
