const uploader = require("../utilities/singleUploader")

function avatarUpload(req, res, next) {
  const upload = uploader(
    "Images",
    ["image/jpeg", "image/jpg", "image/png"],
    10000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // call the middleware function
  upload.single("photo")(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json(err.message);
    } else {
      res.status(200).json("file uploaded")
    }
  });
}

module.exports = {
  avatarUpload,
};