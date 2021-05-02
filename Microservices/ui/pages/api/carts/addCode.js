import { CART_SERVICE, DISCOUNT_CODE_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function CartCodeHandler(req, res) {
    try {
        if (req.method === "PATCH") {
            const codeRes = await axios.get(DISCOUNT_CODE_SERVICE.ROOT(req.query.code))
            console.log(codeRes)
            const {status, ...response} = await axios.patch(CART_SERVICE.APPLY_REDUCTION(req.query.user_id, codeRes.data.data.reduction))
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