const Sequelize = require("sequelize");
const sequelize = require("./sequalize");
const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      primaryKey: true
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
  { timestamps: false }
);

module.exports = User;
