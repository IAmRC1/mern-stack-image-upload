const mongoose = require("mongoose");
const config = require('./config')

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(config.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`Connected to database ${connection.connections[0].name}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectToDb;