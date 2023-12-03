const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true
    },
    url: {
      type: String,
      requried: true
    },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
