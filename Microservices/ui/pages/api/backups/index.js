import { BACKUP_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function (req, res) {
  try {
      if (req.method === "GET") {
          const {status, ...response} = await axios.get(BACKUP_SERVICE.ROOT(req.query.user_id))
          res.status(status).json(response.data)
      } else if (req.method === "POST") {
          const {status, ...response} = await axios.post(BACKUP_SERVICE.ROOT(), req.body)
          res.status(status).json(response.data)
      } else if (req.method === "DELETE") {
          const {status, ...response} = await axios.delete(BACKUP_SERVICE.ROOT(req.query.user_id, req.query.product_id))
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
