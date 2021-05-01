import discountCodeService from "@/services/discountCodeService";

export default async function DiscountCodeHandler(req, res) {
  try {
    if (req.method === "GET") {
      const { status, ...response } = await discountCodeService.get(req.query.discount_code_id, req.query.code);
      return res.status(status).json(response.data);
    } else if (req.method === "POST") {
      const { status, ...response } = await discountCodeService.add(req.body);
      return res.status(status).json(response.data);
    } else if (req.method === "DELETE") {
      const { status, ...response } = await discountCodeService.remove(req.query.discount_code_id);
      return res.status(status).json(response.data);
    }
  } catch ({ response }) {
    res.status(response.status).json(response.data);
  }
}
