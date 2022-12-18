const uploader = require("../utilities/singleUploader")

function avatarUpload(req, res, next) {
  const upload = uploader(
    "Images",
    ["image/jpeg", "image/jpg", "image/png"],
    10 * 1024 * 1024, // 10MB
    "Only .jpg, jpeg or .png format allowed!"
  );

  // call the middleware function
  upload.single("photo")(req, res,next, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json(err.message);
    } else {
      // res.status(200).json("file uploaded")
      next();
    }
  });
}

module.exports = {
  avatarUpload,
};