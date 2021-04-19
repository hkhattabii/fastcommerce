import billService from "@/services/billService";

export default async function (req, res) {
  try {
    if (req.method === "GET") {
      const { status, ...response } = await billService.getAll();
      return res.status(status).json(response.data);
    } else if (req.method === "POST") {
      const { status, ...response } = await billService.add(req.body);
      return res.status(status).json(response.data);
    } else if (req.method === "DELETE") {
      const { status, ...response } = await billService.deleteAll(req.body);
      return res.status(status).json(response.data);
    }
  } catch (err) {
      if (err.response) {
        return res.status(err.response.status).json(err.response.data);
      }
      res.status(515).json(err.message)
  }
}
