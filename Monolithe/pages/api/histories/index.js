import historyService from "@/services/historyService";

export default async function (req, res) {
  try {
      if (req.method === "GET") {
          const {status, ...response} = await historyService.getAll(req.query.user_id)
          res.status(status).json(response.data)
      } else if (req.method === "POST") {
          const {status, ...response} = await historyService.add(req.body)
          res.status(status).json(response.data)
      }
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(515).json(err.message);
  }
}
