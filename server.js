// creating server import express
const express = require("express");
// create express application
const app = express();

// dotenv
require("dotenv").config();
// sequelize connection from db.config.js
const sequelize = require("./databases/db.config");
// importing customerAPP from customer route
const customerApp = require("./routers/customer.route");
// importing productApp from product 
const productApp = require("./routers/product.route");

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on ${port}....`));

// checking sequelize connection
sequelize
  .authenticate()
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.log("DB Connection failed"));

// create or sync the table using sequelize sync
sequelize.sync();

// body parser
app.use(express.json());

// route control
app.use("/customer-api", customerApp);
app.use("/product-api", productApp);

// invalid path
app.use("*", (req, res, next) => {
  res.send({ message: "Invalid Path..." });
});

// error handling middleware
app.use((err, req, res, next) => {
  res.send({ message: err.message });
});
