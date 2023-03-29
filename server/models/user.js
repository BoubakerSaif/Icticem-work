const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  role: {
    type: String,
    eunm: ["admin", "user"],
    default: "user",
  },
  password: String,
});
module.exports = mongoose.model("User", userSchema);
