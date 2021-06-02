const userService = require("@/services/userService");

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
