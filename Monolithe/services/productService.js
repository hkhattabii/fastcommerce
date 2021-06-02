const DELETE_STATEMENT = require("@/constants/queries/delete");
const INSERT_STATEMENT = require("@/constants/queries/insertion");
const SELECT_STATEMENT = require("@/constants/queries/select");
const dbConnector = require("@/lib/db-connector");
const response = require("@/lib/response");
const { Pool } = require("pg");


const pool = new Pool({
  connectionString: dbConnector(process.env.ENV)
});

pool.connect()

const productService = {
  getAll: async ({ filter, direction }) => {
    try {
      request = {};
      switch (filter) {
        case "price":
          request = await pool.query(
            SELECT_STATEMENT.PRDT.ALLBASE.concat(
              direction === "asc"
                ? SELECT_STATEMENT.PRDT.ALLBYPRICEASC
                : SELECT_STATEMENT.PRDT.ALLBYPRICEDESC
            )
          );
        case "date":
        default:
          request = await pool.query(
            SELECT_STATEMENT.PRDT.ALLBASE.concat(
              direction === "asc"
                ? SELECT_STATEMENT.PRDT.ALLBYDATEASC
                : SELECT_STATEMENT.PRDT.ALLBYDATEDESC
            )
          );
      }

      return response.success(null, request.rows);
    } catch (err) {
      throw response.error(err.message);
    }
  },
  getOne: async (product_id, user_id) => {
    try {
      request = await pool.query(SELECT_STATEMENT.PRDT.BYID, [product_id])
      await pool.query(INSERT_STATEMENT.INSERT_HISTORY_ROW, [user_id, product_id])
      return response.success(null, request.rows[0])
    } catch (err) {
      throw response.error(err.message);
    }
  },
  createProduct: async ({ imgs, ...body }) => {
    try {
      await pool.query(
        INSERT_STATEMENT.INSERT_PRDT,
        Object.keys(body).map((key) => body[key])
      );
      return response.success("Le produit a bien été ajouté !");
    } catch (err) {
      throw response.error(err.message);
    }
  },

  removeProduct: async ({ id }) => {
    try {
      await pool.query(DELETE_STATEMENT.PRDT.BYID, [id]);
      return response.success("Le produit a bien été supprimé !");
    } catch (err) {
      throw response.error(err.message)
    }
  },
};

module.exports = productService;
