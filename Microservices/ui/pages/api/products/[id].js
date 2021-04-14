import { PRODUCT_SERVICE } from "@/lib/serviceRegistry"
import axios from "axios"

export default async function ProductHandler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const { status, ...response } = await axios.delete(PRODUCT_SERVICE.DELETE(req.query.id))
            res.status(status).json(response.data)
        } catch ({response}) {
            res.status(response.status).json(response.data)
        }
    }
}