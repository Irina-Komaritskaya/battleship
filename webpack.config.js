const path = require('path');
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: "./client/js/index.js",
  mode: "development",
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
      filename: "./client/html/index.pug",
      minify: false,
    }),
    new HtmlWebpackPugPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
  },
};
