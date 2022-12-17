const { default: mongoose } = require("mongoose");
const Post = require("../models/Post.model");
const Category = require("../models/Category.model");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {tokenVerfication} = require("../middleware/Identitiy")
const fs = require("fs");

// create post
router.post("/", async (req,res) => {

  // check if there is any existing title 
  // with that post
  try {

  const foundPost = await Post.findOne({ title: req.body.title  });

    if(foundPost){
      res.status(404).json("Choose a different title");
    }else{

      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
  
});

// update post
router.put("/update-post/:id",tokenVerfication,  async (req,res) => {

  try {

    const currentPost = await Post.findOne({ "_id": mongoose.Types.ObjectId(req.params.id) });

    if(currentPost.username === req.body.username){

        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
          $set: req.body
        }, { new: true });

        res.status(200).json(updatedPost);

    }else{
        res.status(404).json("You can update only your post!")
      }

  } catch (error) {
    res.status(404).json(error.message)
  }
  
});


// delete post
router.delete("/delete-post/:id", tokenVerfication, async (req,res) => {

  try {

    const currentPost = await Post.findOne({ "_id": mongoose.Types.ObjectId(req.params.id) });

    if(currentPost.username === req.body.username){

      // delete the co-responding file 
      // related to the post
      currentPost.photo && fs.unlink(`${__dirname}/../Images/`+currentPost.photo, (err) => {
        if(err) console.log(err);
      })

        await currentPost.delete();
        res.status(200).json("Post has been deleted...");

      }else{
        res.status(404).json("You can delete only your post!")
      }
    
  } catch (error) {
    res.status(404).json(error.message)
  }
  
});


// for a single post request 
router.get("/:id", async(req,res) => {
  try {

    const post = await Post.findOne({ "_id": mongoose.Types.ObjectId(req.params.id)  });
    res.status(200).json(post);

  } catch (error) {
    res.status(500).json(error.message);
  }
});


router.get("/", async(req,res) => {

  try {
    
    let posts;

    const username = req.query.username;
    const catName = req.query.category;

    if(username){
      posts = await Post.find({ username })
      
    }else if(catName)
    {
      // posts = await Post.find({ categories: {
      //   $in : [catName]
      // }})

      posts = await Post.find({ category: catName })
    }else{
      posts = await Post.find();
      
    }

 
      res.status(200).json(posts);
    

   
  } catch (error) {
    res.status(500).json(error.message);
  }
})
module.exports = router;