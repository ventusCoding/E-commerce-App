const express = require("express");
const http = require('http');
const productRoutes = require("./routes/productRoutes");

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/products", productRoutes);

module.exports = { server };
