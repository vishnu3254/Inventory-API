const { DataTypes } = require("sequelize");
// import sequelize
const sequelize = require("../db.config");
// importing models
const { Customer } = require("./customer.model");
const { Product } = require("./product.model");

// defining the review model or table
exports.Review = sequelize.define(
  "reviews",
  {
    review_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    review_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    review_desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
