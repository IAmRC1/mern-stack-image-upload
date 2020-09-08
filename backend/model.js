const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  img: { 
    data: Buffer, 
    contentType: String 
  },
  imageName: String
},{ timestamps: true });

mongoose.model("file", fileSchema);