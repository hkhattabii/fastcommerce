import response from "@/lib/response";
import billService from "@/services/billService";

export default async function (req, res) {
  try {
    if (req.method === "GET") {
      const { status, ...response } = await billService.getByUserAndId(
        req.query.user_id,
        req.query.id
      );
      return res.status(status).json(response.data);
    } else if (req.method === "DELETE") {
      const { status, ...response } = await billService.deleteById(
        req.query.user_id,
        req.query.id
      );
      return res.status(status).json(response.data);
    } else if (req.method === "PATCH") {
      const { status, ...response } = await billService.pay(
        req.query.user_id,
        req.query.id
      );
      return res.status(status).json(response);
    }
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    return res.status(515).json(err.message)
  }
}
