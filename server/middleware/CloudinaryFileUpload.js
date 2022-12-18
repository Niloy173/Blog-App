const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

const uploaded_directory = path.join(__dirname,"/../Images/")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET
})



const  FileUploader = async (req,res,next) => {

  const filepath = path.join(uploaded_directory,req.body.name);

  try {

    const result = await cloudinary.uploader.upload(filepath,{
      folder: "Blogapp"
    });
    // console.log(result);
    fs.unlink(filepath, (err) => {
      
      if(err) console.log(err);
      res.status(200).json(result.secure_url);
      
    });
    
    
  } catch (error) {
    res.status(500).json("Failed to upload image");
  }
  
 
}

module.exports = {
  FileUploader
}