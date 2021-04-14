const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const controller = require("./controllers");

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
      process.env.ENV === 'production'
        ? `mongodb://cart-db:27017`
        : `mongodb://localhost:5008`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Cart service is running on port ${PORT} ...`);
  } catch (e) {
    console.log("ERROR : ", e);
  }
});