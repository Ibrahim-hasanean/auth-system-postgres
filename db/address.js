const Sequelize = require("sequelize");

const address = Sequelize.define("address", {
  id: {
    type: Sequelize.INTEGER
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
});

module.exports = address;
