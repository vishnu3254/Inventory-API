// import sequelize from db.config
const { DataTypes } = require("sequelize");
const sequelize = require("../db.config");

// creating schema fro address model
exports.Address = sequelize.define(
  "address",
  {
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
