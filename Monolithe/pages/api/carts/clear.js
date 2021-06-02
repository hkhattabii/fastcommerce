import cartService from "@/services/cartService"

export default async (req, res) => {
    try {
        if (req.method === "DELETE") {
            const {status, ...response} = await cartService.clear(req.query.user_id)
            return res.status(status).json(response.data)
        }
    } catch (err) {
        if (err.response) {
            return res.status(err.response.status).json(err.response.data)
        } 
        res.status(515).json(err.message)
    }
}