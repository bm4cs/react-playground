// minimal react dev environment

// no node support for ESM imports yet, stick with commonjs imports
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackBundleAnalyzer = require("webpack-bundle-analyzer");
const TerserJSPlugin = require("terser-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

process.env.NODE_ENV = "production";

module.exports = {
  mode: "production",
  target: "web", //web = browser, node = backend
  devtool: "source-map", // source maps expose the original un-transpiled code for debugging
  entry: "./src/index", // app entry point (can omit extension)
  output: {
    // in production mode webpack will actually write out bundled files to path
    path: path.resolve(__dirname, "build"), // the route to serve the in-memory assets
    publicPath: "/", // the URI to serve in-memory assets to browser
    filename: "bundle.js", // the fake name that can be used to reference the in-memory bundle
  },
  plugins: [
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    // what files should webpack handle?
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"], // run babel on all js/jsx files before bundling
      },
      {
        test: /(\.css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
