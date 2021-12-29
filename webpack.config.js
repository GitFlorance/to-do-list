const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/scripts/main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src/scripts'),
      },
      {
        test: /\.scss$/,
        use: [  miniCss.loader, "css-loader", "sass-loader"]
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
        include: path.resolve(__dirname, 'src/img'),
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
      '@': path.resolve(__dirname, 'src')
    }
  },

  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 3000,
    hot: "only",
    static: {
      directory: './dist',
    },
    client: {
      overlay: true,
    }
  },

  plugins: [
    new CleanWebpackPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
    }),
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new miniCss({
      filename: 'style.css',
   }),
  ],
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js'
  },
};