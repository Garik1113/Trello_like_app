const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + file.originalname.trim());
  },
});
const upload = multer({
  storage,
});

module.exports = { upload };
