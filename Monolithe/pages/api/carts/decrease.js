import cartService from "@/services/cartService";

export default async function (req, res) {
  if (req.method === "PATCH") {
    try {
      const { status, ...response } = await cartService.decrease({ user_id: req.query.user_id, product_id: req.query.product_id});
      console.log(status)
      return res.status(status).json(response.data);
    } catch ({ response }) {
      res.status(response.status).json(response.data);
    }
  }
}
