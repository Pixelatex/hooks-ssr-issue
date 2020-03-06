const http = require("http");
const express = require("express");
const React = require("react");
const { renderToString } = require("react-dom/server");
const serverInstance = express();
const port = 3000;
const app = require("./app");

console.log("SERVER");

serverInstance.get("/", (req, res) => {
  console.log(app, "app");
  const code = React.createElement(app.default || app);
  const result = renderToString(code);
  res.send(result);
});

module.exports = serverInstance;

// const server = http.createServer(serverInstance);

// server.listen(port, () => console.log(`🚀 started on port ${port}`));

// if (module.hot) {
//   console.log(`✅  Server-side (server.js) HMR Enabled! ${process.env.PORT}`);
//   module.hot.accept("./app.js", () => {
//     console.log(`🔁  HMR Reloading './app'...`);
//     try {
//       // eslint-disable-next-line global-require,import/no-unresolved,import/no-dynamic-require
//       const reloadedApp = require("./app");
//       // Recreate a serverInstance with the new fragment version
//       //   const newServerInstance = initServer(
//       //     reloadedFragment,
//       //     fragmentConfig,
//       //     fragmentPlugins
//       //   );
//       //   // Remove the listener from the old instance and link it to the new one
//       //   server.removeListener('request', serverInstance);
//       //   server.on('request', newServerInstance);
//       //   serverInstance = newServerInstance;
//     } catch (error) {
//       console.error(error);
//     }
//   });
// }
