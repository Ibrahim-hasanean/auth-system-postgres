const Sequelize = require("sequelize");
const User = require("./User");
const sequelize = new Sequelize(
  "postgres://hndwlgwf:71PkG8Zq1H86Hxgbn2tBq8bma0hRmoKh@isilo.db.elephantsql.com:5432/hndwlgwf"
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
module.exports = sequelize;
