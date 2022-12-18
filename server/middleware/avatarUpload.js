const uploader = require("../utilities/singleUploader")
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

const uploaded_directory = path.join(`${__dirname}/../Images`);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET
})


function avatarUpload(req, res, next) {
  const upload = uploader(
    "Images",
    ["image/jpeg", "image/jpg", "image/png"],
    10 * 1024 * 1024, // 10MB
    "Only .jpg, jpeg or .png format allowed!"
  );

  // call the middleware function
  upload.single("photo")(req, res,async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json(err.message);
    } else {
      // res.status(200).json("file uploaded")
      // const filepath = path.join(uploaded_directory,req.body.name);
        try {

          const result = await cloudinary.uploader.upload(req.body.name,{
            folder: "Blogapp"
          });
          console.log(result);
          res.status(200).json(result.secure_url);
          // fs.unlink(filepath, (err) => {
            
          //   if(err) console.log(err);
            
            
          // });
          
          
        } catch (error) {
          res.status(500).json("Failed to upload image");
        }
      
    }
  });
}

module.exports = {
  avatarUpload,
};