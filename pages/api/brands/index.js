import productService from '@/services/productService';

export default async function BrandHandler(req, res) {
  if (req.method === 'POST') {
    const { status, ...response } = await productService.createBrand(req.body);
    return res.status(status).json(response);
  } else if (req.method === 'DELETE') {
    const { status, ...response } = await productService.removeBrand(req.body);
    return res.status(status).json(response);
  }
}
