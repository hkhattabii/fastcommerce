import {DISCOUNT_CODE_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function CartCodeHandler(req, res) {
    try {
        if (req.method === "GET") {
            const {status, ...response} = await axios.get(DISCOUNT_CODE_SERVICE.ROOT())
            res.status(status).json(response.data)
        } else if (req.method === "POST") {
            const {status, ...response} = await axios.post(DISCOUNT_CODE_SERVICE.ROOT(), req.body)
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