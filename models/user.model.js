const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
},{timestamps:true});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
