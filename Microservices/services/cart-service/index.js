const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const controller = require("./controllers");
const dbConnector = require("./db-connector");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost"
}))
app.use("/", controller);


const PORT = process.env.PORT || 5007


app.listen(PORT, async () => {
  try {
    await mongoose.connect(
      dbConnector(process.env.ENV),
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    );
    console.log(`Signup service is running on port ${PORT} ...`);
  } catch (e) {
    console.log("ERROR : ", e);
  }
});
