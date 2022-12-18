const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,

  },

  password: {
    type: String,
    required: true,
  },

  profilePicture: {
    type: String,
  },
  



}, {
  timestamps: true
});

const UserModel = mongoose.model("User",UserSchema);
module.exports = UserModel