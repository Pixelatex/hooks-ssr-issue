const http = require("http");
let app = require("./server");
const port = 3000;
const server = http.createServer(app);

let currentApp = app;

server.listen(port, error => {
  if (error) {
    console.log(error);
  }

  console.log(`🚀 started on port ${port}`);
});

if (module.hot) {
  console.log(`✅  Server-side HMR Enabled! ${port}`);

  module.hot.accept("./server.js", () => {
    console.log("🔁  HMR Reloading `./server`...");
    try {
      app = require("./server.js");
      server.removeListener("request", currentApp);
      server.on("request", app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}
