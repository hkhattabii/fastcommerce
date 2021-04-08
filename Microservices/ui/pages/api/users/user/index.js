import axios from "axios";

export default async function UserHandler(req, res) {
    if (req.method === "GET") {
        try {
            const {status, ...response} = await axios.get(`http://localhost:6001/user?field=${req.query.field}&value=${req.query.value}`)
            res.status(status).json(response.data)
        } catch ({response}) {
            res.status(response.status).json(response.data)
        }
    }
}