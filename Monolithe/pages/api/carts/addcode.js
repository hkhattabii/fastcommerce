import cartService from "@/services/cartService";

export default async function (req, res) {
  if (req.method === "PATCH") {
    try {
      const {status, ...response} = await cartService.addCode({ code: req.query.code, user_id: req.query.user_id});
      
      return res.status(status).json(response.data);
    } catch (err) {
        if (err.response) {
            return res.status(err.response.status).json(err.response.data)
        }
        res.status(515).json(err.message)
    }
  }
}
