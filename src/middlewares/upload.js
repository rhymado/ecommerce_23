const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;
    cb(null, nameFormat);
  },
});

// const fileFilter = (req, file, cb) => {
//   const fileType = /jpg|png/;
//   const isFileAccepted = fileType.test(path.extname(file.filename));
//   const fileType = ["jpg", "png"];
//   const isFileAccepted = fileType.includes(path.extname(file.filename));
//   if (!isFileAccepted) return cb(new Error("Error: JPG or PNG only"));
//   return cb(null, true);
// };

// 2 * 1000 * 1000 v
// 2000000 x

const upload = multer({ storage });

module.exports = upload;
