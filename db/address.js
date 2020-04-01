const Sequelize = require("sequelize");
const sequelize = require("./sequalize");
const Address = sequelize.define(
  "address",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    city: {
      type: Sequelize.TEXT
    },
    block: {
      type: Sequelize.TEXT
    },
    street: {
      type: Sequelize.TEXT
    },
    details: {
      type: Sequelize.TEXT
    }
  },
  { timestamps: false }
);

module.exports = Address;
