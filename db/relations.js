const User = require("./User");
const Address = require("./address");
const user_address = require("./user_address");

User.belongsToMany(Address, {
  through: user_address,
  foreignKey: "user_id",
  sourceKey: "id",
  targetKey: "id"
});
Address.belongsToMany(User, {
  through: user_address,
  foreignKey: "address_id",
  sourceKey: "id",
  targetKey: "id"
});
user_address.belongsTo(User, { foreignKey: "user_id" });
user_address.belongsTo(Address, { foreignKey: "address_id" });
