const Sequelize = require("sequelize");
const sequelize = require("./sequalize");
const User = require("./User");
const Address = require("./address");
const user_address = sequelize.define(
  "user_address",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    address_id: {
      type: Sequelize.INTEGER
    }
  },
  { timestamps: false, freezeTableName: true }
);
// user_address.belongsTo(User, { foreignKey: "user_id" });
// user_address.belongsTo(Address, { foreignKey: "address_id" });
module.exports = user_address;
