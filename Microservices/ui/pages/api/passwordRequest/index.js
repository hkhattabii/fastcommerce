const axios = require("axios");
const { AUTH_SERVICE, PWD_REQ_SERVICE } = require("@/lib/serviceRegistry");

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { status, ...response } = await axios.get(PWD_REQ_SERVICE.ROOT);
      res.status(status).json(response.data);
    } catch ({ response }) {
      res.status(response.status).json(response.data);
    }
  } else if (req.method === "POST") {
    try {
      await axios.get(AUTH_SERVICE.BYEMAIL(req.body.email));
      const response = await axios.post(PWD_REQ_SERVICE.ROOT, req.body);
      return res.status(response.status).json(response.data);
    } catch ({ response }) {
      return res.status(response.status).json(response.data);
    }
  } else if (req.method === "PUT") {
    try {
      const pwdReqResponse = await axios.get(PWD_REQ_SERVICE.BYIDANDCODE(req.body.id, req.body.code));
      const response = await axios.put(AUTH_SERVICE.UPDATEPWD, {
        email: pwdReqResponse.data.data.email,
        password: req.body.password,
        repeatedPassword: req.body.repeatedPassword,
      });
      await axios.delete(PWD_REQ_SERVICE.BYIDANDCODE(req.body.id, req.body.code))
      return res.status(response.status).json(response.data);
    } catch ({ response }) {
      return res.status(response.status).json(response.data);
    }
  } else if (req.method === "DELETE") {
    try {
      const {status, ...response} = await axios.delete(PWD_REQ_SERVICE.BYFIELDANDVALUE(req.query.field, req.query.value))
      return res.status(200).json(response.data)
    } catch ({response}) {
      return res.status(response.status).json(response.data)
    }
  }
}

module.exports = handler;
