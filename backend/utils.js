const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/')
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  },
})

exports.upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)){
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    } else {
      cb(null, true);
    }
  },
  limits: { fileSize: 1000 * 1000 * 5 }, // 5mb
}).single("attachment");