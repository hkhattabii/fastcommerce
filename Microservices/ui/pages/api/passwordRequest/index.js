const passwordReqService = require("@/services/passwordReqService");
const axios = require("axios");

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { status, ...response } = await axios.get("http://localhost:5003");
      res.status(status).json(response.data);
    } catch ({ response }) {
      res.status(response.status).json(response.data);
    }
  } else if (req.method === "POST") {
    try {
      await axios.get(
        `http://localhost:6001/user?field=email&value=${req.body.email}`
      );
      const response = await axios.post("http://localhost:5003", req.body);
      return res.status(response.status).json(response.data);
    } catch ({ response }) {
      console.log(response)
      return res.status(response.status).json(response.data);
    }
  } else if (req.method === "PUT") {
    try {
      const pwdReqResponse = await axios.get(
        `http://localhost:5003/${req.body.id}/${req.body.code}`
      );
      const response = await axios.put("http://localhost:6001/updatePassword", {
        email: pwdReqResponse.data.data.email,
        password: req.body.password,
        repeatedPassword: req.body.repeatedPassword,
      });
      await axios.delete(`http://localhost:5003/${req.body.id}/${req.body.code}`)
      return res.status(response.status).json(response.data);
    } catch ({ response }) {
      return res.status(response.status).json(response.data);
    }
  } else if (req.method === "DELETE") {
    try {
      const {status, ...response} = await axios.delete(`http://localhost:5003?field=${req.query.field}&value=${req.query.value}`)
      return res.status(200).json(response.data)
    } catch ({response}) {
      return res.status(response.status).json(response.data)
    }
  }
}

module.exports = handler;
