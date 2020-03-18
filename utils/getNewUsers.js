const moment = require("moment");
module.exports = allUsers => {
  let todayDate = moment();
  let newUsers = allUsers.filter(user => {
    let createAt = moment(user.signup_date);
    let diff = todayDate.diff(createAt, "days");
    if (diff < 30) return user;
    else return;
  });
  return newUsers;
};
