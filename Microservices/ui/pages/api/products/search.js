import { PRODUCT_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function SearchHandler(req, res) {
  if (req.method === "GET") {
    try {
      const { status, ...response } = await axios.get(
        PRODUCT_SERVICE.SEARCH(req.query.query),
      );
      return res.status(status).json(response.data);
    } catch ({ response }) {
      res.status(response.status).json(response.data);
    }
  }
}
