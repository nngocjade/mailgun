const User = require("../model/user");

const createUser = async (req, res) => {
  const user = new User({ email: req.body.email });
  await user.save();
  res.json(user);
};

module.exports = {
  createUser,
};
