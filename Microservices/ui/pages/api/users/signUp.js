const { AUTH_SERVICE, CART_SERVICE } = require('@/lib/serviceRegistry')
const axios = require('axios')

export default async function signUpHandler(req, res) {
  if (req.method === 'POST') {
    try {
      const {status, ...response} = await axios.post(AUTH_SERVICE.SIGNUP, req.body)
      await axios.post(CART_SERVICE.ROOT(), {user_id: response.data.data._id})
      res.status(status).json(response.data);
    } catch (err) {
      if (err.response) {
        return res.status(err.response.status).json(err.response.data);
      } else {
        res.status(400).json(err);
      }
    }

  }
}
