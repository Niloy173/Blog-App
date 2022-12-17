const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Register
router.post("/register", async (req,res) => {
  try {

    // check for existing user/email 
    // recommand one user with one email/username
    const person = await User.find({
      "$or": [
        { "username" : req.body.username},
        { "email" : req.body.email  }
      ]
    });

    if(person.length > 0){
      res.status(404).json("Duplicate User.try again");

    }else{

      // becrpt the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);


      // new user creation
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      // save user
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (error) {
    
    res.status(500).json(error.message);
  }
});


router.post("/login",async(req,res) => {
  try {
      const user = await User.findOne({ email: req.body.email});

      const validated = user && await bcrypt.compare(req.body.password, user.password);

       if(!user || !validated ){

        res.status(400).json("Wrong Credrntial");

       }else{

        const {password,...others} = user._doc;
        // console.log(others);

        const token = jwt.sign({
          userid: others._id,
          username: others.username,
          useremail: others.email,
          profile: others.profilePicture
        },process.env.JWT_TOKEN,{
          expiresIn: process.env.JWT_EXPIRE
        });

        res.status(200).json(token);
      }
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message);
  }
});

module.exports = router