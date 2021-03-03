var express = require("express");
var router = express.Router();
const userscontroller = require("../controllers/users.controller");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", userscontroller.createUser);

module.exports = router;
