const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack')
const dotenv = require('dotenv')

const srcDir = 'src'
const distDir = 'dist'

// TODO: add postcss and autoprefixer
// TODO: add minification
module.exports = (env, argv) => {
  const { analyze, mode = 'development' } = argv;
  const isProduction = mode === 'production';

  // Plugins
  const plugins = [
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/worker/service_worker.ts'),
      filename: 'sw.js',
      publicPath: './',
      excludes: ['**/*'],
    }),
    new MonacoWebpackPlugin({
      languages: ['typescript', 'html'],
      features: ['suggest', 'snippets', 'hover']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ]

  // Environment
  if (!isProduction) {
    const envPath = fs.existsSync('.env') ? '.env' : '.env.development'

    plugins.push(
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(dotenv.config({ path: envPath }).parsed)
      }),
    )
  } else {
    plugins.push(
      new webpack.EnvironmentPlugin([
        'GITHUB_CLIENT_ID',
      ])
    )
  }

  // Bundle analyzer
  if (analyze) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 3002,
      })
    )
  }

  // Style loader
  const styleLoader = (modules) => [
    isProduction ? {
      loader: MiniCssExtractPlugin.loader,
    } : { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        modules,
        sourceMap: !isProduction, 
      }
    },
    'sass-loader',
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: !isProduction,
      },
    }
  ]

  return {
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
          test: /\.(s?css)$/,
          exclude: /\.module\.scss$/,
          use: styleLoader(false)
        },
        {
          test: /\.module\.scss$/,
          use: styleLoader(true)
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
      filename: 'bundle.[hash].js',
      path: path.resolve(__dirname, distDir),
      publicPath: isProduction ? './' : '/',
    },
    devtool: isProduction ? undefined : 'inline-source-map',
    devServer: {
      index: 'index.html',
      contentBase: path.join(__dirname, distDir),
      compress: true,
      historyApiFallback: true,
      port: 4000,
    },
    plugins,

    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
  }
}
