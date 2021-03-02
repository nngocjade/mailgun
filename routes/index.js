var express = require("express");
var router = express.Router();

const email = require("../helpers/email");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* Temporary GET route to send myself an email. */
router.get("/test-email", (req, res) => {
  email.sendTestEmail();
  res.send("email sent");
});

module.exports = router;
