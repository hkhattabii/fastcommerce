const DELETE_STATEMENT = require("@/constants/queries/delete");
const INSERT_STATEMENT = require("@/constants/queries/insertion");
const SELECT_STATEMENT = require("@/constants/queries/select");
const response = require("@/lib/response");
const pool = require('@/lib/db')

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
