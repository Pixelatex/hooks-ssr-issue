const express = require("express");
const fetch = require("node-fetch");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const app = express();
const port = 3000;

const webApp = require("../dist/main");

app.get("/", (req, res) => {
  const reactElement = React.createElement(webApp);
  // it fails here, rendertostring refuses to render hooks.
  const result = ReactDOMServer.renderToString(reactElement);
  res.send(result);
});

app.listen(port, () => console.log(`🚀 started on port ${port}`));
