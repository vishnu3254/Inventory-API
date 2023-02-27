// All imports
// import express
const express = require("express");
const {
  createCustomer,
  createReviews,
  getReviews,
  createOrder,
  getCustomers,
  getOrdersByCustomerId,
  getReviewsByCustomerId,
} = require("../controllers/customer.controller");

// create customerApp
const customerApp = express.Router();

// Create customer
customerApp.post("/customer", createCustomer);

// post reviews
customerApp.post("/customer-review", createReviews);

//Get reviews
customerApp.get("/reviews/:customer_id", getReviews);

// create orders
customerApp.post("/customer-order", createOrder);

// get all customers
customerApp.get("/customer", getCustomers);

// get customer_orders by customer_id
customerApp.get("/customer-orders/:customer_id", getOrdersByCustomerId);

// get all reviews by customer_id
customerApp.get("/customer-reviews/:customer_id", getReviewsByCustomerId);

module.exports = customerApp;
