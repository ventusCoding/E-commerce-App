



const products = require("../data/products");


exports.getProducts = (req, res) => {
    res.json(products);
}


exports.getProductById = (req, res) => {
    const product = products.find(product => product._id === req.params.id);
    res.json(product);
  }