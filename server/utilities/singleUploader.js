const multer = require("multer");
const path = require("path");
const createError = require("http-errors")

// upload folder path
const UPLOAD_FOLDER = `${__dirname}/../Images`;

// define storage
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, UPLOAD_FOLDER);
    },

    filename: (req, file, cb) => {
      // const FileExt = path.extname(file.originalname);
      // const filename =
      //   file.originalname
      //     .replace(FileExt, "")
      //     .toLowerCase()
      //     .split(" ")
      //     .join("-") +
      //   "-" +
      //   Date.now();

      cb(null, req.body.name);
    },
  });

// prepare the final multer object
const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 20 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (["image/jpeg", "image/jpg", "image/png"].includes("image/"+req.body.name.toString().split(".")[1])) {
        cb(null, true);
      } else {
        cb(createError("Only .jpg, jpeg or .png format allowed!"));
      }
    },
  });




module.exports = {
  upload
};