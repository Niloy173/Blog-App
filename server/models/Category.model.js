const mongoose = require("mongoose");

// We didn't use that 
// for the viewers, they can use it  like categorize the post
// create a relation with Category model with Post model
// fetch data based on populate
const CategorySchema = new mongoose.Schema({
  
  name: {
    type:String,
    required: true
  }


}, {
  timestamps: true
});

const CategoryModel = mongoose.model("Category",CategorySchema);
module.exports = CategoryModel