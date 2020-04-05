const Sequelize = require("sequelize");
const sequelize = require("./sequalize");
const User = require("./User");
const user_address = require("./user_address");
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
  { timestamps: false, freezeTableName: true }
);
// Address.belongsToMany(User, {
//   through: "user_address",
//   foreignKey: "address_id",
//   sourceKey: "id",
//   targetKey: "id"
// });
module.exports = Address;
