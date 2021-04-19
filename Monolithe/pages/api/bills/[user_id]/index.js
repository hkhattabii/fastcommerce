import billService from "@/services/billService";

export default async function (req, res) {
  try {
    if (req.method === "GET") {
      const { status, ...response } = await billService.getByUser(
        req.query.user_id
      );
      return res.status(status).json(response.data);
    } else if (req.method === "DELETE") {
      const { status, ...response } = await billService.deleteAllByUser(
        req.query.user_id
      );
      return res.status(status).json(response.data);
    }
  } catch ({response}) {
    return res.status(response.status).json(response.data);
  }
}
