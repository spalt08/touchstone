const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

const srcDir = 'src'
const distDir = 'dist'
const isProduction = process.env.NODE_ENV === 'production'

// TODO: add postcss and autoprefixer
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
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
            }
          },
          'sass-loader',
        ]
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, distDir),
    publicPath: isProduction ? './' : '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/worker/service_worker.ts'),
      filename: 'sw.js',
      publicPath: './',
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
