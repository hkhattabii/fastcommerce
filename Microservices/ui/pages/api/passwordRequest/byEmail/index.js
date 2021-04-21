import { PWD_REQ_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function ByEmail(req, res) {
  try {
    if (req.method === "GET") {
      const { status, ...response } = await axios.get(
        PWD_REQ_SERVICE.BYEMAIL(req.query.email)
      );
      res.status(status).json(response.data);
    }
    if (req.method === "DELETE") {
      const { status, ...response } = await axios.delete(
        PWD_REQ_SERVICE.BYEMAIL(req.query.email)
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
