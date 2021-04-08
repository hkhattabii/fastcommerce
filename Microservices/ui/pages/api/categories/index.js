import productService from '@/services/productService';

export default async function CategoryHandler(req, res) {
  if (req.method === 'GET') {
    const { status, ...response } = await productService.getAllCategories();
    return res.status(status).json(response);
  }
  if (req.method === 'POST') {
    const { status, ...response } = await productService.createCategory(
      req.body
    );
    return res.status(status).json(response);
  } else if (req.method === 'DELETE') {
    const { status, ...response } = await productService.removeCategory(
      req.body
    );
    return res.status(status).json(response);
  }
}
