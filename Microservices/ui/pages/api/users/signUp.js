const { AUTH_SERVICE } = require('@/lib/serviceRegistry')
const axios = require('axios')

export default async function signUpHandler(req, res) {
  if (req.method === 'POST') {
    try {
      const {status, ...response} = await axios.post(AUTH_SERVICE.SIGNUP, req.body)
      res.status(status).json(response.data);
    } catch({response}) {
      res.status(response.status).json(response.data);
    }

  }
}
