// import express
const express = require("express");
const productApp = express.Router();

const { createProduct,getProducts } = require("../controllers/product.controller");

// create product
productApp.post("/product", createProduct);

// get all producta
productApp.get("/product",getProducts)

module.exports = productApp;
