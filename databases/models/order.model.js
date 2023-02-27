// import sequelize from database config
const { DataTypes } = require("sequelize");
const sequelize = require("../db.config");

// creating the schema for order model
exports.Order = sequelize.define(
  "orders",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
