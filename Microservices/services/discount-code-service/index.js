const express = require("express");
const cors = require('cors')
const controller = require("./controllers");
const init = require("./db/init");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost"
}))
app.use("/", controller);


const PORT = process.env.PORT || 5009


init().then(() => {
  console.log('OUOOOOH')
  app.listen(PORT, async () => console.log(`Discount code service is running on port ${PORT} ...`));
}).catch(err => console.log('There are database issue'))


