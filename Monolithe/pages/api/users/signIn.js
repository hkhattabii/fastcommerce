const { Pool } = require("pg");
const userService = require("@/services/userService");

const client = new Pool({
  connectionString: "postgresql://postgres:root@localhost:5432/postgres",
});

client.connect();

export default async function signInHandler(req, res) {
  try {
    if (req.method === "POST") {
      const {status, ...response} = await userService.signIn(req.body);
      res.status(status).json(response.data);
    }
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(515).json(err.message);
  }
}
