import { AUTH_SERVICE } from '@/lib/serviceRegistry';
import axios from 'axios';
export default async function signInHandler(req, res) {
  if (req.method === 'POST') {
    try {
      const {status, ...response} = await axios.post(AUTH_SERVICE.SIGNIN, req.body)
      res.status(status).json(response.data);
    } catch({response}) {
      res.status(response.status).json(response.data);
    }
  }
}
