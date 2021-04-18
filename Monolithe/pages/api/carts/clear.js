import cartService from "@/services/cartService"

export default async function (req, res) {
    if (req.method === "DELETE") {
        try {
            const {status, ...response} = await cartService.clear(req.query.user_id)
            res.status(status).json(response.data)
        } catch ({ response }) {
            res.status(response.status).json(response.data)
        }
    }
}