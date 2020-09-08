const multer = require("multer")
const File = require("./file.model");
const { upload, } = require("./utils");
const fs = require('fs');

exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
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
    .then(() => res.status(201).json({ message: "Image uploaded successfully", data: file }))
    .catch(err => console.log('err', err));
  })
};

exports.getAllImage = (req, res) => {
  File.find({}, (err, results) => {
    if (err) res.send(err);
    res.json({ img: results });
  }).sort({ createdAt: "desc" });
}