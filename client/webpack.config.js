const path = require("path");
var HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "./js/test.js"),
  mode: "development",
  devServer: {
    static: { directory: path.join(__dirname, "./dist/html") },
    compress: true,
    open: true,
    hot: true,
    port: 4000,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      { test: /\.css$/, use: ["css-loader", "style-loader"] },
      { test: /\.(js)$/, use: "babel-loader" },
      {
        test: /\.pug$/,
        loader: "pug-loader",
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: { name: "./[name].[ext]" },
          },
        ],
      },
      { test: /\.svg$/, use: "file-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./html/index.pug",
      filename: "./html/index.html",
      minify: false,
      inject: true
    }),
    new HtmlWebpackPugPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new CleanWebpackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
  },
};
