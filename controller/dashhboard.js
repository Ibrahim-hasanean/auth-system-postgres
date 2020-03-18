const query = require("../db/db");
const moment = require("moment");
const key = require("../key.json");
const getNewUsers = require("../utils/getNewUsers");
const googleAnalytics = require("../utils/googleAnalytics");
//UA-160668988-1
const dashboard = async (req, res, next) => {
  let allUsers = await (await query.getUsers()).rows;
  let usersCount = allUsers.length;
  let socialMediaUsers = allUsers.filter(
    user => user.googleid || user.facebookid
  );
  let newUsers = getNewUsers(allUsers);
  let day = String(1),
    month = String(3),
    year = String(2020);
  let startDate = moment(`${day}-${month}-${year}`, "DD-MM-YYYY").format(
    "YYYY-MM-DD"
  );
  let endDate = moment("2020-03-17").format("YYYY-MM-DD");
  let result = await googleAnalytics(startDate);
  res.status(200).send({
    status: 200,
    allUsersCount: usersCount,
    socialMediaUsers: socialMediaUsers.length,
    newUsers: newUsers.length,
    monthPageViews: result.data.totalsForAllResults
  });
};

module.exports = dashboard;
