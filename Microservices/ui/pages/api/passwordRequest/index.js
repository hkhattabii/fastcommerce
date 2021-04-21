const axios = require("axios");
const { AUTH_SERVICE, PWD_REQ_SERVICE } = require("@/lib/serviceRegistry");

async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { status, ...response } = await axios.get(PWD_REQ_SERVICE.ROOT);
      res.status(status).json(response.data);
    } else if (req.method === "POST") {
      await axios.get(AUTH_SERVICE.BYEMAIL(req.body.email))
      const {status, ...response} = await axios.post(PWD_REQ_SERVICE.ROOT, req.body);
      res.status(status).json(response.data);
    } else if (req.method === "PUT") {
      const pwdReqResponse = await axios.get(PWD_REQ_SERVICE.BYIDANDCODE(req.body.id, req.body.code));
      const {status, ...response} = await axios.put(AUTH_SERVICE.UPDATEPWD, {
        email: pwdReqResponse.data.data.email,
        password: req.body.password,
        repeatedPassword: req.body.repeatedPassword,
      });
      axios.delete(PWD_REQ_SERVICE.BYIDANDCODE(req.body.id, req.body.code));
      res.status(status).json(response.data);
    } else if (req.method === "DELETE") {
      const { status, ...response } = await axios.delete(
        PWD_REQ_SERVICE.BYFIELDANDVALUE(req.query.field, req.query.value)
      );
      res.status(status).json(response.data);
    }
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    } else {
      res.status(400).json(err);
    }
  }
}

module.exports = handler;
