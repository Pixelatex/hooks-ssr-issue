const path = require("path");
const StartServerPlugin = require("start-server-webpack-plugin");
const createBaseConfig = require("./baseConfig");

function createConfig(mode) {
  // Options object
  let options = {
    webpackPlugins: [],
    externalWhiteList: [],
    aliases: []
  };
  // Define the app entry file
  const entry = ["./src/index.js"];
  const output = {
    filename: "server.bundle.js",
    path: path.resolve("build")
  };

  // Development only variables.
  if (mode === "development") {
    // Needed for hot reloading
    options.externalWhiteList.unshift("webpack/hot/poll?300");
    options.aliases["webpack/hot/poll"] = require.resolve("webpack/hot/poll");
    entry.unshift("webpack/hot/poll?300");
    options.webpackPlugins.push(
      new StartServerPlugin({ name: "server.bundle.js", keyboard: true })
    );
  }

  const config = createBaseConfig(mode, "node", entry, output, options);
  console.log(config, "config");
  return config;
}

module.exports = createConfig;
