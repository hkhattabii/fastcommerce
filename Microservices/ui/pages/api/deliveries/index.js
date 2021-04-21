import {  DELIVERY_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function (req, res) {
  try {
      if (req.method === "GET") {
          const {status, ...response} = await axios.get(DELIVERY_SERVICE.ROOT(req.query.user_id, req.query.delivery_id, req.query.bill_id))
          res.status(status).json(response.data)
      } else if (req.method === "DELETE") {
        const {status, ...response} = await axios.delete(DELIVERY_SERVICE.ROOT(req.query.user_id, req.query.delivery_id, req.query.bill_id))
        res.status(status).json(response.data)
      }
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(515).json(err.message);
  }
}
