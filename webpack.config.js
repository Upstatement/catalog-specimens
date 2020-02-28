'use strict';

const path = require('path');
const webpack = require('webpack');
// const CopyPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type webpack.Configuration */
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    // TODO: improve names, maybe vary for dev vs. prod
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // {
      //   test: /\.md$/,
      //   use: ['catalog/loader', 'raw-loader'],
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: {
              // Use `dart-sass`
              implementation: require('sass'),
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: 'index.html',
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      // TODO: Review
      chunkFilename: '[id].css',
    }),
    // new CopyPlugin(['public']),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  node: {
    fs: 'empty',
  },
  // TODO: Review
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devtool:
    process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',
  devServer: {
    port: 4000,
  },
};
