const query = require("../db/db");
const moment = require("moment");
const dashboard = async () => {
  let allUsers = await (await query.getUsers()).rows;
  let usersCount = allUsers.length;
  let socialMediaUsers = allUsers.filter(
    user => user.googleid || user.facebookid
  );
  let time = moment();
  let newUsers = allUsers.filter(user => {
    user.createAt = Date.now();
    let createAt = moment(user.createAt);
    let diff = time.diff(createAt, "days");
    if (diff < 30) return user;
    else return;
  });
  console.log("users count: " + usersCount);
  console.log("social media users: " + socialMediaUsers.length);
  console.log("new users: " + newUsers.length);
};
// google analytics json key :75b3fe0d4ea566361314ccfe7e5acef3a4a38ad0
dashboard();
