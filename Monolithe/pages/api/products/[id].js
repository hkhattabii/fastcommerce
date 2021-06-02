import productService from "@/services/productService";

export default async function ProductHandler(req, res) {
  try {
    if (req.method === "GET") {
      const { status, ...response } = await productService.getOne(req.query.id, req.query.user_id)
      res.status(status).json(response.data);
    } else if (req.method === "DELETE") {
      const { status, ...response } = await productService.removeProduct({id: req.query.id})
      res.status(status).json(response.data);
    }
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(515).json(err.message);
  }
}
