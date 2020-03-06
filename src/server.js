const http = require("http");
const express = require("express");
const { renderToString } = require("react-dom/server");
const serverInstance = express();
const port = 3000;
const app = require("./app");

console.log("SERVER");

serverInstance.get("/", (req, res) => {
  console.log(app, "app");
  const result = renderToString(app);
  res.send(result);
});

const server = http.createServer(serverInstance);

server.listen(port, () => console.log(`🚀 started on port ${port}`));
