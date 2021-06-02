import cartService from "@/services/cartService";

export default async function CartHandler(req, res) {
  try {
    if (req.method === "GET") {
      const { status, ...response } = await cartService.get(req.query.user_id, req.query.product_id);
      return res.status(status).json(response.data);
    } else if (req.method === "POST") {
      const { status, ...response } = await cartService.add(req.body);
      return res.status(status).json(response.data);
    } else if (req.method === "DELETE") {
      const { status, ...response } = await cartService.remove({cart_id: req.query.user_id, product_id: req.query.product_id});
      return res.status(status).json(response.data);
    }
  } catch ({ response }) {
    res.status(response.status).json(response.data);
  }
}
