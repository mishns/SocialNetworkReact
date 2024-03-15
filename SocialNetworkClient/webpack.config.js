const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === "development";
const IS_PROD = NODE_ENV === "production";

module.exports = {
  entry: ["./src/main.tsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: IS_PROD ? "asset" : "asset/resource",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "/src/index.html",
      filename: "index.html",
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@constants": path.resolve(__dirname, "/src/constants.ts"),
      "@fonts": path.resolve(__dirname, "/src/fonts"),
      "@api": path.resolve(__dirname, "/src/api"),
      "@components": path.resolve(__dirname, "/src/components"),
      "@root": path.resolve(__dirname, "/"),
    },
  },
  devServer: {
    hot: true,
    host: "127.0.0.1",
    port: "8080"
  },
  devtool: "source-map",
};
