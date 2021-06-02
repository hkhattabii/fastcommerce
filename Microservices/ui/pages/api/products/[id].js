import { PRODUCT_SERVICE, HISTORY_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function ProductHandler(req, res) {
  try {
    if (req.method === "GET") {
      const { status, ...response } = await axios.get(PRODUCT_SERVICE.BYID(req.query.id))
      console.log(response.data)
      await axios.post(HISTORY_SERVICE.ROOT(), {
        user_id: req.query.user_id,
        product_id: req.query.id,
        product: {
          name: response.data.data._source.name,
          imageUrl: response.data.data._source.imageUrl,
        }
      });
      res.status(status).json(response.data);
    } else if (req.method === "DELETE") {
      const { status, ...response } = await axios.delete(
        PRODUCT_SERVICE.BYID(req.query.id)
      );
      res.status(status).json(response.data);
    }
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(515).json(err.message);
  }
}
