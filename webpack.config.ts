import * as path from "path";

import webpack = require("webpack");

let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

let webpackConfig:webpack.Configuration = {
  target: "web",
  entry: {
    app: "./src/client/app",
  },
  output: {
    path: path.join(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      vue: "vue/dist/vue.js",
    },
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/},
      {test: /\.vue$/, loader: "vue-loader"},
      {test: /\.css$/, loaders: ["style-loader", "css-loader"], },
      {test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"], },
      {test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader", query: {prefix: "dist/fonts/", name:"fonts/[name].[ext]", limit: 10000, mimetype: "application/font-woff"}},
      {test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader", query: {name: "fonts/[name].[ext]"}},
    ],
  },
  plugins: process.env.NODE_ENV == "production" ? [new UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    mangle: {
      keep_fnames: true,
    },
    sourceMap: true,
  })] : [],
  devtool: "source-map",
  devServer: {
    contentBase: "./public",
    publicPath: "/dist/",
    host: "localhost",
    port: 8080,
    //hot: true,
    historyApiFallback: true,
    inline: true,
    open: true,
    proxy: {
      "**": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
};

export = webpackConfig;
