const router = require("express").Router();
const key = require("../key.json");
const { google } = require("googleapis");
const scopes = "https://www.googleapis.com/auth/analytics.readonly";
const jwt = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  scopes
);
const view_id = "213589760";
//UA-160668988-1
router.get("/", async (req, res, next) => {
  const response = await jwt.authorize();
  const result = await google.analytics("v3").data.ga.get({
    auth: jwt,
    ids: "ga:" + view_id,
    "start-date": "7daysAgo",
    "end-date": "today",
    metrics: ["ga:sessions,ga:users,ga:pageviews"]
  });
  console.dir(result.data);
  res.send("get google analytics result");
});
module.exports = router;
