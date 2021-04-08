import axios from 'axios';
export default async function signInHandler(req, res) {
  if (req.method === 'POST') {
    try {
      const {status, ...response} = await axios.post('http://localhost:6001/signIn', req.body)
      res.status(status).json(response.data);
    } catch({response}) {
      res.status(response.status).json(response.data);
    }
  }
}
