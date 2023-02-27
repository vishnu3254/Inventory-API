// All imports
const { Sequelize } = require("sequelize");
const mysql = require("mysql2");

// instantiating sequelize class
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    hostname: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
