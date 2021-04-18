const DELETE_STATEMENT = require("@/constants/queries/delete");
const INSERT_STATEMENT = require("@/constants/queries/insertion");
const SELECT_STATEMENT = require("@/constants/queries/select");
const UPDATE_STATEMENT = require("@/constants/queries/update");
const response = require("@/lib/response");
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: "postgresql://postgres:root@localhost:5432/postgres",
});

pool.connect();

const cartService = {
  get: async (user_id) => {
    try {
      const carts = await pool.query(SELECT_STATEMENT.CRT.BYUSER, [user_id]);
      return response.success(null, carts.rows);
    } catch (err) {
      throw response.error(err.message);
    }
  },
  add: async ({ user_id, product_id }) => {
    try {
      await pool.query(INSERT_STATEMENT.INSER_CRT_ROW, [user_id, product_id]);
      return response.success("Le produit a été ajouté au panier");
    } catch (err) {
      throw response.error(err.message);
    }
  },
  increase: async ({ user_id, product_id }) => {
    try {
      await pool.query(UPDATE_STATEMENT.CRT_ROW.INCREASE_QTY, [
        user_id,
        product_id,
      ]);
      return response.success("La quantitié du produit a été augmentée de 1");
    } catch (err) {
      throw response.error(err.message);
    }
  },
  decrease: async ({ user_id, product_id }) => {
    try {
      await pool.query(UPDATE_STATEMENT.CRT_ROW.DECREASE_QTY, [
        user_id,
        product_id,
      ]);
      return response.success("La quantitié du produit a été diminuée de 1");
    } catch (err) {
      throw response.error(err.message);
    }
  },
  clear: async (user_id) => {
    try {
        await pool.query(DELETE_STATEMENT.CRT_ROW.BYUSER, [user_id])
        return response.success('Le panier a été reinitilisé')
    } catch (err) {
      throw response.error(err.message);
    }
  },
};

module.exports = cartService;
