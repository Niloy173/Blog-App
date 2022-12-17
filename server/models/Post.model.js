const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
  
  title: {
    type:String,
    required: true,
    unique:true
  },

  desc: {
    type: String,
    required: true
  },

  photo: {
    type: String,

  },

  username: {
    type:String,
    required: true
  },

  category: {
    type: String,
    required: true
  }

  


}, {
  timestamps: true
});

const PostModel = mongoose.model("Post",PostSchema);
module.exports = PostModel