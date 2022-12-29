const cookieParser = require("cookie-parser");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

require("dotenv").config();

// database connection
require("./db/connection.js")

const app = express();
const port = process.env.PORT || 4000;

// all the routes file
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");


// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET
})

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//cookie-parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// file uploader
const {upload} = require("./utilities/singleUploader")

// test route
app.use("/home",(req,res) => {
  
  res.status(200).send("I am listening");
})

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute);



app.post("/api/upload",upload.single('image'),(req,res) => {

      try {

        cloudinary.uploader.upload(req.file.path,{
          folder: "Blogapp"
        },(err,response) => {
          if (err) {
            res.status(500).json({ err });
            return;
          }
          
          res.json({
            message: 'Image successfully uploaded to Cloudinary',
            response
          });

        });
        
        // fs.unlink(filepath, (err) =>{
        //   if(err) console.log(err)
        // })
      } catch (error) {
        console.log(error.message);
        res.status(500).json("Failed to upload image");
      }
    
  

  });


app.use(express.static(path.join(__dirname, '/../client/build/')));
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname, '/../client/build/index.html'))
});



app.use((err,req,res,next) => {
  res.status(404).json({ message : err.message });
})

app.listen(port,()=>{
  console.log(`Server is runing on ${port}`)
})