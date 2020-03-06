/* eslint-disable no-useless-escape */
const WebpackBar = require("webpackbar");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

/**
 *
 * @param {string} mode - production or development
 * @param {string} target - web or node
 * @param {string} entry - path to src file
 * @param {object} options
 * @param {object} options.rules
 * @param {object} options.devServer
 * @param {array} options.externalWhiteList
 * @param {array} options.webpackPlugins
 * @param {array} options.aliases
 */
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
              loader: "babel-loader"
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
