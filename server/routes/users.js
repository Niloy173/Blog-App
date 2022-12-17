const bcrypt = require("bcrypt");
const router = require("express").Router();
const mongoose = require("mongoose");

// model
const User = require("../models/User.model");
const Post = require("../models/Post.model");


router.put("/:id",async (req,res) => {
  
  const userId = req.params.id;

  try {
    
    const findUser = await User.findOne({ "_id": mongoose.Types.ObjectId(userId)});

    // console.log(req.body)
    if(findUser){

      // hash the password
      if(req.body.password){
        
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);
      }else{
        req.body.password = findUser.password;
      }

      const updateUser = await User.findByIdAndUpdate(userId,{
        $set: req.body,
      }, { new: true });

      res.status(200).json("User updated");
    }else{
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }

});


router.delete("/:id",async (req,res) => {
  
  const userId = req.params.id;

  try {
    
    const findUser = await User.findOne({ "_id": mongoose.Types.ObjectId(userId)});

    if(findUser){

      // delete all post related to this user
      await Post.deleteMany({ username: findUser.username });
      
      // delete the user 
      await User.findByIdAndDelete(req.params.id)

      res.status(200).json('User has been deleted....');
    }else{
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }

});


// single User
router.get("/:id", async (req,res) => {

  try {

    const user = await User.findOne({ "_id": mongoose.Types.ObjectId(req.params.id)});

    if(user){
      const {password, ...others} = user._doc;
      res.status(200).json(others);
    }else{
      res.status(404).json("User not found");
    }
    
  } catch (error) {
    res.status(500).json(error.message);
  }
})

module.exports = router;
