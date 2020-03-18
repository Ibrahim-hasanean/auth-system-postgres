const { google } = require("googleapis");
const scopes = "https://www.googleapis.com/auth/analytics.readonly";
const key = require("../key.json");
const moment = require("moment");
const jwt = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  scopes
);
const view_id = "213589760";
let todayDate = moment().format("YYYY-MM-DD");
module.exports = async (startDate, endDate = todayDate) => {
  const result = await google.analytics("v3").data.ga.get({
    auth: jwt,
    ids: "ga:" + view_id,
    "start-date": startDate,
    dimensions: "ga:source",
    "end-date": endDate,
    metrics: ["ga:sessions,ga:users,ga:pageviews"]
  });
  return result;
};
