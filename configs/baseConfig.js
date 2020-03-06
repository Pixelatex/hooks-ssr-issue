/* eslint-disable no-useless-escape */
const WebpackBar = require("webpackbar");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

function createBaseConfig(mode, target, entry, output, options) {
  const {
    externalWhiteList = [],
    webpackPlugins,
    devServer,
    aliases
  } = options;
  const devPlugins = [];
  if (mode === "development") {
    devPlugins.push(new webpack.HotModuleReplacementPlugin());
  }
  let externals = {};

  if (target === "node") {
    externals = [
      nodeExternals({
        modulesFromFile: true,
        whitelist: externalWhiteList
      })
    ];
  }
  const config = {
    mode,
    target,
    devtool: mode === "development" ? "inline-source-map" : false,
    watch: mode === "development",
    externals,
    entry,
    output,
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
                plugins: ["@babel/plugin-transform-runtime"]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      ...webpackPlugins,
      new WebpackBar({
        color: target === "node" ? "#c065f4" : "#f56be2",
        name: target === "node" ? "server" : "client"
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      ...devPlugins
    ],
    resolve: {
      alias: aliases
    }
  };
  if (devServer) {
    config.devServer = devServer;
  }

  return config;
}

module.exports = createBaseConfig;
