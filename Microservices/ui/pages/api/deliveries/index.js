import {  DELIVERY_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function (req, res) {
  try {
      if (req.method === "GET") {
          const {status, ...response} = await axios.get(DELIVERY_SERVICE.ROOT)
          res.status(status).json(response.data)
      }
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(515).json(err.message);
  }
}
