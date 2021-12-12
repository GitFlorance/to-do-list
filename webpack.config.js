const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackProvideGlobalPlugin = require("webpack-provide-global-plugin");

module.exports = {
  mode: 'development',
  entry: {
    polyfill: '@babel/polyfill',
    app: './src/main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src/assets'),
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/assets'),
        use: ExtractTextPlugin.extract({
          use: ['css-loader','sass-loader'],
        }),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts'
          },
        }],
      },
      {
        test: /\.(jpg|png)$/,
        include: path.resolve(__dirname, 'src/assets/img'),
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img'
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: [ '.js','.scss','.png','jpg' ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      jquery: "jquery/src/jquery",
    }
  },

  devServer: {
    contentBase: './dist',
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
    port: 8000,
    stats: {
      normal: true
    }
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template: './src/assets/index.html'}),
    new ExtractTextPlugin('style.css'),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8000,
    }),
    new WebpackProvideGlobalPlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js'
  },
};