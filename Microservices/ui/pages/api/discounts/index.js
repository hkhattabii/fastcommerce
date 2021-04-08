import productService from '@/services/productService';

export default async function DiscountHandler(req, res) {
  if (req.method === 'POST') {
    const { status, ...response } = await productService.createDiscount(
      req.body
    );
    return res.status(status).json(response);
  } else if (req.method === 'DELETE') {
    const { status, ...response } = await productService.removeDiscount(
      req.body
    );
    return res.status(status).json(response);
  }
}
