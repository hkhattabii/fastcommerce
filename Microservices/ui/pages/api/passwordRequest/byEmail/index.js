import { PWD_REQ_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function ByEmail(req, res) {
  if (req.method === "GET") {
    try {
      const { status, ...response } = await axios.get(
        PWD_REQ_SERVICE.BYEMAIL(req.query.email)
      );
      res.status(status).json(response.data);
    } catch ({ response }) {
      res.status(response.status).json(response.data);
    }
  }
  if (req.method === "DELETE") {
    try {
      const { status, ...response } = await axios.delete(PWD_REQ_SERVICE.BYEMAIL(req.query.email));
      res.status(status).json(response.data);
    } catch ({ response }) {
      res.status(response.status).json(response.data);
    }
  }
}
