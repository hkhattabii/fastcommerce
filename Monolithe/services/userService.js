const { INSERT_USR, INSERT_CRT } = require("@/constants/queries/insertion");
const SELECT_STATEMENT = require("@/constants/queries/select");
const response = require("@/lib/response");

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres:root@localhost:5432/postgres",
});

pool.connect();

const userService = {
  getUsers: async (id) => {
    let userQuery;
    try {
      if (id) {
        userQuery = await pool.query(SELECT_STATEMENT.USR.BYID, [id]);
      } else {
        userQuery = await pool.query(SELECT_STATEMENT.USR.ALL);
      }
      return response.success(null, userQuery.rows)
    } catch (err) {
      throw response.error(err.message);
    }
  },
  signUp: async ({ email, password, repeatedPassword }) => {
    if (password !== repeatedPassword) {
      throw response.error("Les mots de passe doivent être identiques")
    }
    try {
      pool.query('BEGIN')
      const user = await pool.query(INSERT_USR, [email, password]);
      await pool.query(INSERT_CRT, [user.rows[0].id])
      pool.query('COMMIT')
      return response.success("Merci pour votre inscription")
    } catch (err) {
      throw response.error(err.message)
    }
  },
  signIn: async ({ email, password }) => {
    const query = await pool.query(SELECT_STATEMENT.USR.BYEMAIL, [email]);

    if (query.rowCount == 0) {
      throw response.error("Le compte n'éxiste pas", 404)
    }
    if (query.rows[0].password !== password) {
      throw response.error("Le mot de passe ne correspond pas au compte")
    }
    return response.success("Vous êtes connecté !")
  },
};

module.exports = userService;
