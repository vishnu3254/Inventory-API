// import express-async-handler
const expressAsyncHandler = require("express-async-handler");
// importing models
const { Customer } = require("../databases/models/customer.model");
const { Review } = require("../databases/models/reviews.model");
const { Product } = require("../databases/models/product.model");
// const { cursorTo } = require("readline");
const { Order } = require("../databases/models/order.model");
const { Address } = require("../databases/models/address.model");

const customerApp = require("../routers/customer.route");

// association between Customer and product through reviews that is many-to-many relationship
Customer.Product = Customer.belongsToMany(Product, {
  through: Review,
  foreignKey: "customer_id",
  timestamps: false,
});

// association from product to customer
Product.Customer = Product.belongsToMany(Customer, {
  through: Review,
  foreignKey: "product_id",
  timestamps: false,
});

// Customer product  association throug orders as a junction model
Customer.Product = Customer.belongsToMany(Product, {
  through: Order,
  foreignKey: "customer_id",
  timestamps: false,
});

// from product to customer through orders
Product.Customer = Product.belongsToMany(Customer, {
  through: Order,
  foreignKey: "product_id",
  timestamps: false,
});

// Customer has one adddress  association
Customer.Address = Customer.hasOne(Address, {
  foreignKey: "customer_id",
  timestamps: false,
});

Address.Customer = Address.belongsTo(Customer, {
  foreignKey: "customer_id",
  timestamps: false,
});

// create customers
const createCustomer = expressAsyncHandler(async (req, res) => {
  // save the data into the table or model
  let { customer_name, customer_email } = req.body;
  let { address } = req.body;
  // check if the customer_email exists or not
  let checkEmail = await Customer.findOne({
    where: {
      customer_email: customer_email,
    },
  });
  //if customer alerady exists then add address to the address model
  // if customer exsits then add address to address model
  if (checkEmail != undefined) {
    // create address
    let address = await Address.create(req.body.address);
    // set address
    let row = await checkEmail.setAddress(address);
    res.send({ message: "Customer already Existed! Address added" });
  }
  // if customer not found then create customer and address
  else {
    let row = await Customer.create(req.body, {
      include: [
        {
          association: Customer.Address,
        },
      ],
    });

    res
      .status(200)
      .send({ message: "Customer created Successfully with address" });
  }
});

// wrting reviews
const createReviews = expressAsyncHandler(async (req, res) => {
  await Review.create(req.body, {
    // include: [
    //   {
    //     association: Customer.Product,
    //   },
    // ],
  });
  res.send({ message: "Product review created" });
});

// get reviews
const getReviews = expressAsyncHandler(async (req, res) => {
  // get customer id from url
  let customerIdFromUrl = req.params.customer_id;

  let result = await Review.findAll({
    attributes: { exclude: ["customer_id"] },
    where: {
      customer_id: customerIdFromUrl,
    },
  });
  // if there is no customer
  if (result.length == 0) {
    res.send({ message: "No Customer found with that id" });
  } else {
    res.send({
      message: "Reviews by the customer",
      customer_id: req.params.customer_id,
      reviews: result,
    });
  }
});

// create orders
const createOrder = expressAsyncHandler(async (req, res) => {
  await Order.create(req.body);
  res.send({ message: "Order created" });
});

// get all customers
const getCustomers = expressAsyncHandler(async (req, res) => {
  let customers = await Customer.findAll();
  if (customers.length == 0) {
    res.send({ message: "No customers found" });
  } else {
    res.send({ message: "All customer", payload: customers });
  }
});

// getOrdersByCustomerId
const getOrdersByCustomerId = expressAsyncHandler(async (req, res) => {
  // get the customer_id from url
  let customerIdFromUrl = req.params.customer_id;
  let orders = await Order.findAll({
    where: {
      customer_id: customerIdFromUrl,
    },
  });
  // if no orders found
  if (orders.length == 0) {
    res.send({ message: "No orders found with that id" });
  } else {
    res.send({ message: "All Orders with that id", payload: orders });
  }
});

// getReviewsByCustomerId
const getReviewsByCustomerId = expressAsyncHandler(async (req, res) => {
  // get customerIdFromUrl
  let customerIdFromUrl = req.params.customer_id;
  // find the reviews in reviews model
  let reviews = await Review.findAll({
    where: {
      customer_id: customerIdFromUrl,
    },
  });
  // if there are no reviews
  if (reviews.length == 0) {
    res.send({ message: "No reviews found with that id" });
  } else {
    res.send({ message: "All reviews with that id", payload: reviews });
  }
});

// exportng controllers
module.exports = {
  createCustomer,
  createReviews,
  getReviews,
  createOrder,
  getCustomers,
  getOrdersByCustomerId,
  getReviewsByCustomerId,
};
