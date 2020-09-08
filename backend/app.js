const express = require("express");
const mongoose  = require("mongoose");
const multer = require("multer");
require("./model")
const File = mongoose.model("file");
const router = express.Router();
const cors = require('cors')
const fs = require('fs');

const app = express();
app.use(cors())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/')
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  },
})

const upload = multer({
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

router.post("/upload", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.send({ err: "Multer Error"})
    } else if (err) {
      return res.send({ err })
    }
    const file = new File();
    file.img.data = fs.readFileSync(req.file.path)
    file.img.contentType = req.file.mimetype;
    file.imageName = req.body.name;
    file.save()
    .then(() => res.status(201).json({ message: "image uploaded successfully", data: file }))
    .catch(err => console.log('err', err));
  })
});

router.get("/upload", (req, res) => {
  File.find({}, (err, results) => {
    if (err) res.send(err);
    //res.set('Content-Type', results.contentType)
    res.json({ img: results });
  }).sort({ createdAt: "desc" });
});

app.use(router);

mongoose.connect("mongodb://localhost:27017/file-upload", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
}).then(() => console.log("DB is connected"))

app.listen(5000, () => {
  console.log(`Server runnning on 5000`)
});
