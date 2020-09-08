const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  img: { 
    data: Buffer, 
    contentType: String 
  },
  imageName: String
},
  { timestamps: true }
);

const File = mongoose.model("file", fileSchema);

module.exports = File;