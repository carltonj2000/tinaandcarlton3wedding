const express = require("express");
const path = require("path");
const app = express();

const debug = false; // enable logging during debug
if (debug) {
  const morgan = require("morgan");
  app.use(morgan("combined"));  
}

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
