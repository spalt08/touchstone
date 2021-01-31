const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const { DefinePlugin } = require('webpack')
const dotenv = require('dotenv')

const srcDir = 'src'
const distDir = 'dist'
const isProduction = process.env.NODE_ENV === 'production'

// Plugins
const plugins = [
  new ServiceWorkerWebpackPlugin({
    entry: path.join(__dirname, 'src/worker/service_worker.ts'),
    filename: 'sw.js',
    publicPath: './',
    excludes: ['**/*'],
  }),
  new MonacoWebpackPlugin({
    languages: ['javascript', 'typescript', 'css', 'html'],
    features: ['suggest', 'snippets', 'hover']
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'index.html')
  }),
]

if (!isProduction) {
  const envPath = fs.existsSync('.env') ? '.env' : '.env.development'

  plugins.push(
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config({ path: envPath }).parsed)
    }),
  )
}

// TODO: add postcss and autoprefixer
// TODO: add minification
module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, srcDir, 'index.tsx')
  },
  target: 'web',
  node: {
    fs: 'empty',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, srcDir), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(scss|css)$/,
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
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, distDir),
    publicPath: isProduction ? './' : '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    index: 'index.html',
    contentBase: path.join(__dirname, distDir),
    compress: true,
    historyApiFallback: true,
    port: 4000,
  },
  plugins,
}
