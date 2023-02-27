const exp = require("constants");
const expressAsyncHanlder = require("express-async-handler");
// import Products model
const { Product } = require("../databases/models/product.model");

// create product
const createProduct = expressAsyncHanlder(async (req, res) => {
  await Product.create(req.body);
  res.send({ message: "product created successfully" });
});

// get all products
const getProducts = expressAsyncHanlder(async (req, res) => {
  let products = await Product.findAll();
  // if there are no products
  if (products.length == 0) {
    res.send({ message: "No products found" });
  } else {
    res.send({ message: "All products", payload: products });
  }
});
module.exports = { createProduct, getProducts };
