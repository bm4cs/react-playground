// minimal react dev environment

// no node support for ESM imports yet, stick with commonjs imports
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web", //web = browser, node = backend
  devtool: "cheap-module-source-map", // source maps expose the original un-transpiled code for debugging
  entry: "./src/index", // app entry point (can omit extension)
  output: {
    // in development mode webpack keeps everything in-memory
    path: path.resolve(__dirname, "build"), // the route to serve the in-memory assets
    publicPath: "/", // the URI to serve in-memory assets to browser
    filename: "bundle.js", // the fake name that can be used to reference the in-memory bundle
  },
  devServer: {
    stats: "minimal", // reduce verbosity of stdout logs
    overlay: true, // overlay any errors that occur in the browser,
    historyApiFallback: true, // route all requests through index.html, to do deep linking with react-router
    disableHostCheck: true, //HACK: chrome bug
    headers: { "Access-Control-Allow-Origin": "*" }, //HACK: chrome bug
    https: false, //HACK: chrome bug
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
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
        use: ["style-loader", "css-loader"], // webpack will bundle any css imported by js
      },
    ],
  },
};
