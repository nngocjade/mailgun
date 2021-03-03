const mongoose = require("mongoose");
const emailsHelper = require("../helpers/email");

// Borrowed from https://stackoverflow.com/a/48031564/396324
function generateToken(n) {
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var token = "";
  for (var i = 0; i < n; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  emailVerifiedAt: { type: Date, default: Date.now },
  emailVerificationCode: String,
});

userSchema.pre("save", function (next) {
  if (this.isNew) {
    this.emailVerificationCode = generateToken(15);
    this.wasNew = true; // Read why at https://stackoverflow.com/a/18305924/396324, but tl;dr so the post hook knows if we need to send the sendVerification email
  }
  next();
});

userSchema.post("save", function (doc, next) {
  if (doc.wasNew) {
    emailsHelper.sendVerificationEmail(doc);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
