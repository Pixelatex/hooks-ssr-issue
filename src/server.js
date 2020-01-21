const express = require("express");
const fetch = require("node-fetch");
console.log("SERVER.JS");
var React = require("react");
const ReactDOMServer = require("react-dom/server");
global.React = React;
const app = express();
const port = 3000;
console.log("webapp include");
const webApp = require("../dist/main");

app.get("/", (req, res) => {
  console.log(webApp);
  // const result = "test";
  const reactElement = React.createElement(webApp);
  console.log(reactElement);
  // it fails here, rendertostring refuses to render hooks.
  const result = ReactDOMServer.renderToString(reactElement);
  res.send(result);
});

app.listen(port, () => console.log(`🚀 started on port ${port}`));
