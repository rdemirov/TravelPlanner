const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  entry: "./src/client/index.js",
  output: {
    libraryTarget: "var",
    library: "Client"
  },
  mode: "production",
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html"
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/views/newTrip.html",
      filename: "./newTrip.html"
    }),
    new webpack.DefinePlugin({
      app_port: dotenv.parsed.APP_PORT || 8000
    }),
    new WorkboxPlugin.GenerateSW()
  ]
};
