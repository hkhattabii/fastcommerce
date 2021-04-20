import backupService from "@/services/backupService"

export default async function (req, res) {
    try {
        if (req.method === "GET") {
            const {status, ...response} = await backupService.getAll(req.query.user_id)
            res.status(status).json(response.data)
        } else if (req.method === "POST") {
            const {status, ...response} = await backupService.add(req.body)
            res.status(status).json(response.data)
        } else if (req.method === "DELETE") {
            const {status, ...response} = await backupService.delete(req.query.user_id, req.query.product_id)
            res.status(status).json(response.data)
        }
    } catch (err) {
        if (err.response) {
            return res.status(err.response.status).json(err.response.data)
        }
        res.status(515).json(err.message)
    }
}