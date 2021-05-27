import { HISTORY_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function (req, res) {
  try {
      if (req.method === "GET") {
          const {status, ...response} = await axios.get(HISTORY_SERVICE.ROOT(req.query.user_id))
          res.status(status).json(response.data)
      } else if (req.method === "DELETE") {
          const {status, ...response} = await axios.delete(HISTORY_SERVICE.ROOT(req.query.user_id, req.query.product_id))
          res.status(status).json(response.data)
      } 
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    } else {
      res.status(400).json(err);
    }
  }
}
