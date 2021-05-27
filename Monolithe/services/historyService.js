const { INSERT_HISTORY_ROW } = require("@/constants/queries/insertion");
const SELECT_STATEMENT = require("@/constants/queries/select");
const dbConnector = require("@/lib/db-connector");
const response = require("@/lib/response");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: dbConnector(process.env.ENV)
});

pool.connect()

const historyService = {
  getAll: async (user_id) => {
    try {
        let hxReq = {}
        if (user_id) {
            hxReq = await pool.query(SELECT_STATEMENT.HISTORY.BYUSER, [user_id])
        } else {
            hxReq = await pool.query(SELECT_STATEMENT.HISTORY.ALL)
        }

      return response.success(null, hxReq.rows);
    } catch (err) {
      throw response.error(err.message);
    }
  },
  add: async ({ user_id, product_id }) => {
    try {
      await pool.query(INSERT_HISTORY_ROW, [user_id, product_id]);
      return response.success();
    } catch (err) {
      throw response.error(err.message);
    }
  },
};

module.exports = historyService;
