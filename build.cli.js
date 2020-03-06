#!/usr/bin/env node
/* eslint-disable promise/always-return */
/* eslint-disable no-console */
const webpack = require("webpack");
const rimraf = require('rimraf');
const chalk = require("chalk");
const DevServer = require("webpack-dev-server");
const createServerConfig = require("./configs/server");
const createClientConfig = require("./configs/client");

// Webpack compile in a try-catch
function compile(compiler, name) {
  try {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        // Handle errors here
        const info = stats.toJson();
        console.error(chalk.red(info.errors), "Fragment compilation error!");
      } else {
        console.log(chalk.green(`Finished ${name} Build`));
      }
    });
  } catch (e) {
    console.error(name, e);
    process.exit(1);
  }
}

// Clear output
rimraf("build/*", {}, e => e && console.error(e, "clearBuild error"));

// Create configs
const clientConfig = createClientConfig("development");
const serverConfig = createServerConfig("development");
// Ensure the server doesn't start until everything has booted correctly.
const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);
const clientPromise = new Promise((resolve, reject) => {
  try {
    const clientDevServer = new DevServer(
      clientCompiler,
      clientConfig.devServer
    );
    clientCompiler.hooks.done.tap("Client", () => {
      resolve(clientDevServer);
    });
  } catch (err) {
    reject(err);
  }
});
const serverPromise = new Promise((resolve, reject) => {
  try {
    compile(serverCompiler, "server");
    clientCompiler.hooks.done.tap("Client", () => {
      resolve(true);
    });
  } catch (err) {
    reject(err);
  }
});
Promise.all([clientPromise, serverPromise])
  .then(res => {
    const client = res[0];
    const server = res[1];

    if (client && server) {
      // Create a new instance of Webpack-dev-server for our client assets.
      // This will actually run on a different port than the users app.
      client.listen((parseInt(process.env.PORT, 10) || 3000) + 1, err => {
        if (err) {
          console.error(err);
        }
      });
    }
  })
  .catch(err => console.log(err));
