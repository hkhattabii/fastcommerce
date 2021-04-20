import { PRODUCT_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function ProductHandler(req, res) {
  if (req.method === "GET") {
    try {
      const { status, ...response } = await axios.get(PRODUCT_SERVICE.ALL);
      return res.status(status).json(response.data);
    } catch ({ response }) {
      return res.status(response.status).json(response.data);
    }
  } else if (req.method === "POST") {
    try {
      const { status, ...response } = await axios.post(
        PRODUCT_SERVICE.ROOT,
        req.body
      );
      return res.status(status).json(response.data);
    } catch ({ response }) {
      return res.status(response.status).json(response.data);
    }
  } else if (req.method === "DELETE") {
    try {
      const { status, ...response } = await axios.delete(PRODUCT_SERVICE.ROOT);
      return res.status(status).json(response.data);
    } catch ({ response }) {
      return res.status(response.status).json(response.data);
    }
  }
}
