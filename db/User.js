const Sequelize = require("sequelize");
const sequelize = require("./sequalize");
const Address = require("./address");
const user_address = require("./user_address");
const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    first_name: {
      type: Sequelize.TEXT
    },
    phone: {
      type: Sequelize.TEXT,
      unique: true
    },
    last_name: {
      type: Sequelize.TEXT
    },
    email: {
      type: Sequelize.TEXT,
      unique: true
    },
    password: {
      type: Sequelize.TEXT
    },
    google_id: {
      type: Sequelize.TEXT
    },
    fb_id: {
      type: Sequelize.TEXT
    },
    is_verified: {
      type: Sequelize.BOOLEAN
    },
    verification_code: {
      type: Sequelize.TEXT
    },
    signup_date: {
      type: Sequelize.DATE
    },
    signup_time: {
      type: Sequelize.TIME
    },
    location: {
      type: Sequelize.DATE
    },
    date_of_birth: {
      type: Sequelize.DATE
    }
  },
  { timestamps: false, freezeTableName: true }
);
// User.belongsToMany(Address, {
//   through: "user_address",
//   foreignKey: "user_id",
//   sourceKey: "id",
//   targetKey: "id"
// });
module.exports = User;
