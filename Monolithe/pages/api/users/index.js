const { Pool } = require("pg");
const userService = require("@/services/userService");

const client = new Pool({
  connectionString: "postgresql://postgres:root@localhost:5432/postgres",
});

client.connect();

export default async function UserHandler(req, res) {
  try {
    if (req.method === "GET") {
      const {status, ...response} = await userService.getUsers(req.query.user_id);
      res.status(status).json(response.data);
    }
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(515).json(err.message);
  }
}
