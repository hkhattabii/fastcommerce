const DELETE_STATEMENT = require("@/constants/queries/delete");
const INSERT_STATEMENT = require("@/constants/queries/insertion");
const SELECT_STATEMENT = require("@/constants/queries/select");
const UPDATE_STATEMENT = require("@/constants/queries/update");
const response = require("@/lib/response");
const { Pool } = require("pg");
const cartService = require("./cartService");
const pool = new Pool({
  connectionString: "postgresql://postgres:root@localhost:5432/postgres",
});

pool.connect();

const billService = {
  getAll: async () => {
    try {
      const billReq = await pool.query(SELECT_STATEMENT.BILL.ALL);
      const bills = await Promise.all(
        billReq.rows.map(async (bill) => {
          const bill_prdt = await pool.query(SELECT_STATEMENT.BILL_PRDT.ALL, [
            bill.id,
          ]);
          return { ...bill, products: bill_prdt.rows };
        })
      );
      return response.success(null, bills);
    } catch (err) {
      throw response.error(err.message);
    }
  },
  getByUser: async (user_id) => {
    try {
      const billReq = await pool.query(SELECT_STATEMENT.BILL.BYUSER, [user_id]);
      const bills = await Promise.all(
        billReq.rows.map(async (bill) => {
          const bill_prdt = await pool.query(SELECT_STATEMENT.BILL_PRDT.ALL, [
            bill.id,
          ]);
          return { ...bill, products: bill_prdt.rows };
        })
      );
      return response.success(null, bills);
    } catch (err) {
      throw response.error(err.message);
    }
  },
  getByUserAndId: async (user_id, bill_id) => {
    try {
      const billReq = await pool.query(SELECT_STATEMENT.BILL.BYUSERANDID, [
        user_id,
        bill_id,
      ]);
      const bills = await Promise.all(
        billReq.rows.map(async (bill) => {
          const bill_prdt = await pool.query(SELECT_STATEMENT.BILL_PRDT.ALL, [
            bill.id,
          ]);
          return { ...bill, products: bill_prdt.rows[0] };
        })
      );
      return response.success(null, bills);
    } catch (err) {
      throw response.error(err.message);
    }
  },
  add: async ({ user_id, address }) => {
    const { street, streetNumber, zipcode, city, country } = address;
    try {
      pool.query("BEGIN");
      const addressReq = await pool.query(INSERT_STATEMENT.INSERT_ADDRESS, [street, streetNumber, zipcode, city, country]);
      const insertBillReq = await pool.query(INSERT_STATEMENT.INSERT_BILL, [
        user_id,
        addressReq.rows[0].id
      ]);
      const productCarts = await cartService.get(user_id);
      await Promise.all(
        productCarts.data.data.map(async (productCart) => {
          await pool.query(INSERT_STATEMENT.INSERT_BILL_PRDT, [
            insertBillReq.rows[0].id,
            productCart.id,
            productCart.quantity,
          ]);
        })
      );
      await cartService.clear(user_id);
      pool.query("COMMIT");
      return response.success(
        "Votre panier a été validé ! Procédez au paiement"
      );
    } catch (err) {
      pool.query("ROLLBACK");
      throw response.error(err.message);
    }
  },
  deleteById: async (user_id, id) => {
    try {
      await pool.query(DELETE_STATEMENT.BILL.BYID, [user_id, id]);
      return response.success("La facture a été supprimée");
    } catch (err) {
      throw response.error(err.message);
    }
  },
  deleteAllByUser: async (user_id) => {
    try {
      await pool.query(DELETE_STATEMENT.BILL.BYUSER, [user_id]);
      return response.success(
        `Toute les factures de l'utilisateur ${user_id} ont été supprimées`
      );
    } catch (err) {
      throw response.error(err.message);
    }
  },
  deleteAll: async () => {
    try {
      await pool.query(DELETE_STATEMENT.BILL.ALL);
      return response.success("Toutes les factures ont été supprimées");
    } catch (err) {
      throw response.error(err.message);
    }
  },
  pay: async (user_id, id) => {
    try {
      await pool.query('BEGIN')
      const billReq = await pool.query(UPDATE_STATEMENT.BILL.PAY, [user_id, id]);
      const deliveryReq = await pool.query(INSERT_STATEMENT.INSERT_DELIVERY, [
        new Date(),
        id,
        billReq.rows[0].address_id
      ])
      await pool.query('COMMIT')
      return response.success(`Votre paiement a été accepté ! voici l'ID de la livraison pour suivre votre colis : ${deliveryReq.rows[0].id}`)
    } catch (err) {
      await pool.query('ROLLBACK')
      throw response.error(err.message);
    }
  },
};

module.exports = billService;
