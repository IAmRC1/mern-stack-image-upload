const express = require("express");
const cors = require('cors')
const connectToDb = require("./db");
const router = require("./file.route");
const config = require('./config')

const app = express();

app.use(express.json());
app.use(cors())

connectToDb();

app.use("/api/v1", router);

const PORT = config.PORT || 5000;
app.listen(
  PORT,
  console.log(`server started at port ${PORT}`)
);
