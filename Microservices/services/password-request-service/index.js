const express = require("express");
const cors = require('cors')
const controller = require("./controllers");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost"
}))
app.use("/", controller);


const PORT = process.env.PORT || 5003

app.listen(PORT, async () => {
  console.log(`Password requests service is running on port ${PORT} ...`);
});
