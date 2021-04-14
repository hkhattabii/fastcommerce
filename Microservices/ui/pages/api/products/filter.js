import { PRODUCT_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function FilterHandler(req, res) {
  if (req.method === "POST") {
    try {
      const { status, ...response } = await axios.post(
        PRODUCT_SERVICE.FILTER,
        req.body
      );
      return res.status(status).json(response.data);
    } catch ({ response }) {
      return res.status(response.status).json(response.data);
    }
  }
}
