import { CART_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function ClearHander(req, res) {
    try {
        if (req.method === "DELETE") {
            const {status, ...response} = await axios.delete(CART_SERVICE.CLEAR(req.query.user_id))
            res.status(status).json(response.data)
        }
    } catch (err) {
        if (err.response) {
            return res.status(err.response.status).json(err.response.data);
        } else {
            res.status(400).json(err);
        }
    }
}