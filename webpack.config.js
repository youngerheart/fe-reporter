const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const SentryPlugin = require('@sentry/webpack-plugin')
const webpack = require('webpack');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    demo: './demo/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/',
    chunkFilename: '[name].[hash].js',
    library: 'error-reporter',
    libraryTarget: 'umd'
  },
  devServer: {
    open: false,
    host: '0.0.0.0',
    stats: 'errors-only',
    clientLogLevel: 'warning',
    disableHostCheck: true
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8089',
    //     pathRewrite: {'^/api' : ''}
    //   }
    // }
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('demo')],
        options: {
          fix: true,
          formatter: require('eslint-friendly-formatter')
        }
      }, {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['demo'],
      template: 'demo/index.tpl',
      filename: 'index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env.CI_COMMIT_SHA': JSON.stringify(process.env.CI_COMMIT_SHA)
    })
  ]
}

module.exports = config;
