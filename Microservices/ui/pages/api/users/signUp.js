const { AUTH_SERVICE, CART_SERVICE } = require('@/lib/serviceRegistry')
const axios = require('axios')

export default async function signUpHandler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log(req.body)
      const {status, ...response} = await axios.post(AUTH_SERVICE.SIGNUP, req.body)
      console.log('MEC ????')
      await axios.post(CART_SERVICE.ROOT(), {user_id: response.data.data._id})
      console.log('STATTUS : ', status, ' DATA : ', data)
      res.status(status).json(response.data);
    } catch (err) {
      if (err.response) {
        console.log('ERR STATTUS : ', err.response.status, ' DATA : ', err.response.data)
        return res.status(err.response.status).json(err.response.data);
      } else {
        console.log('ERR : ', err)
        res.status(400).json(err);
      }
    }

  }
}
