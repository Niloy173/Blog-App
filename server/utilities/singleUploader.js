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
      const FileExt = path.extname(file.originalname);
      const filename =
        file.originalname
          .replace(FileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, filename+FileExt);
    },
  });

// prepare the final multer object
const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 20 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg") {
        cb(null, true);
      } else {
        cb(createError("Only .jpg, jpeg or .png format allowed!"));
      }
    },
  });




module.exports = {
  upload
};