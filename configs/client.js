const path = require("path");
const createBaseConfig = require("./baseConfig");

const cwd = process.cwd();

function createConfig(mode) {
  // Options object
  let options = {
    webpackPlugins: [],
    publicPath: mode === "development" ? "http://localhost:3001" : "/"
  };

  // Define the app entry file
  const entry = ["./src/client.js"];
  const output =
    mode === "development"
      ? {
          publicPath: "http://localhost:3001}/",
          filename: "client.bundle.js"
        }
      : {
          filename: "client.bundle.js",
          publicPath: "/",
          path: path.join(cwd, "build")
        };

  // Development only variables.
  if (mode === "development") {
    options.devServer = {
      host: "localhost",
      port: 3001,
      historyApiFallback: true,
      disableHostCheck: true,
      noInfo: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      hot: true,
      watchOptions: {
        ignored: /node_modules/
      }
    };
  }

  return createBaseConfig(mode, "web", entry, output, options);
}

module.exports = createConfig;
