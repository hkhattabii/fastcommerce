import { BILL_SERVICE, CART_SERVICE, DELIVERY_SERVICE } from "@/lib/serviceRegistry";
import axios from "axios";

export default async function (req, res) {
  try {
      if (req.method === "GET") {
          const {status, ...response} = await axios.get(BILL_SERVICE.ROOT(req.query.user_id, req.query.bill_id))
          res.status(status).json(response.data)
      } else if (req.method === "POST") {
        const {status: cartStatus, ...cartResponse} = await axios.get(CART_SERVICE.ROOT(req.body.user_id))
        const {status: billStatus, ...billResponse} = await axios.post(BILL_SERVICE.ROOT(), {...req.body, products: cartResponse.data.data})
        await axios.delete(CART_SERVICE.ROOT(req.body.user_id))
        res.status(billStatus).json(billResponse.data)
      } else if (req.method === "DELETE") {
        const {status, ...response} = await axios.delete(BILL_SERVICE.ROOT(req.query.user_id, req.query.bill_id))
        res.status(status).json(response.data)
      } else if (req.method === "PATCH") {
        const {status: statusBill, ...responseBill} = await axios.patch(BILL_SERVICE.ROOT(req.query.user_id, req.query.bill_id))
        const {status: statusDelivery, ...responseDelivery} = await axios.post(DELIVERY_SERVICE.ROOT(), responseBill.data.data)
        res.status(statusDelivery).json(responseDelivery.data)
      }
  } catch (err) {
    console.log('ERR : ', err)
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(515).json(err.message);
  }
}
