const express = require("express");
const products = require("./data/products");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/products", (req, res) => {
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = products.find(product => product._id === req.params.id);
    res.json(product);
  });

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
