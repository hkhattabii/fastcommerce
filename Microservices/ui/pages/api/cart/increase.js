import { CART_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function CartIncreaseHandler(req, res) {
    try {
        if (req.method === "PATCH") {
            const {status, ...response} = await axios.patch(CART_SERVICE.INCREASE(req.query.user_id, req.query.product_id))
            res.status(status).json(response.data)
        }
    } catch (err) {
        if (err.response) {
            res.status(err.response.status).json(err.response.data);
        } else {
            res.status(400).json(err);
        }
    }
}