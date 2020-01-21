const express = require("express");
const fetch = require("node-fetch");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const app = express();
const port = 3000;

const webApp = require("../dist/main");

if (process.env.NODE_ENV === "development") {
  fetch("http://localhost:3001")
    .then(res => console.log(res, "res"))
    .catch(err => console.log(err, "err"));
}
// const webApp = require("./app");
app.get("/hello", (req, res) => res.send("Hello World!"));

app.get("/", (req, res) => {
  const reactElement = React.createElement(webApp);
  const result = ReactDOMServer.renderToString(reactElement);
  console.log(react, "result?");
  res.send(result);
});

app.listen(port, () => console.log(`🚀 started on port ${port}`));
if (module.hot) {
  console.log("shit is hot yo");
}
