const userService = require("@/services/userService");

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
