import { AUTH_SERVICE } from '@/lib/serviceRegistry';
import axios from 'axios';


export default async function UserHandler(req, res) {
  if (req.method === 'GET') {
    try {
      const {status, ...response} = await axios.get(AUTH_SERVICE.ROOT)
      res.status(status).json(response.data);
    } catch({response}) {
      res.status(response.status).json(response.data);
    }
  } else if (req.method === 'DELETE') {
    const {status, ...response} = await axios.delete(AUTH_SERVICE.BYFIELDANDVALUE(req.query.field, req.query.value))
    res.status(status).json(response.data);
  }
}
