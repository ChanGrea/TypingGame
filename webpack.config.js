const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
require("@babel/register");

module.exports = {
  mode: "none",
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public")
  },
  devServer: {
    port: 9000,
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      hash: true
    }),
    new MiniCssExtractPlugin({ filename: "index.css" }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "source-map"
};
