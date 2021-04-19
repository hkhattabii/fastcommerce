import productService from "@/services/productService";

export default async function ProductHandler(req, res) {
  try {
    if (req.method === "GET") {
      const { status, ...response } = await productService.getAll(req.query);
      return res.status(status).json(response);
    } else if (req.method === "POST") {
      const { status, ...response } = await productService.createProduct(
        req.body
      );
      return res.status(status).json(response);
    } else if (req.method === "DELETE") {
      const { status, ...response } = await productService.removeProduct(
        req.body
      );
      return res.status(status).json(response);
    }
  } catch ({response}) {
    res.status(response.status).json(response.data)
  }
}
