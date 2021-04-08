const { INSERT_USR } = require('@/constants/queries/insertion');
const SELECT_STATEMENT = require('@/constants/queries/select');

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:root@localhost:5432/postgres',
});

pool.connect();

const userService = {
  getUsers: async () => {
    const query = await pool.query(SELECT_STATEMENT.USR.ALL);
    return { success: true, status: 200, data: query.rows };
  },
  getUserById: async ({ id }) => {
    const query = await pool.query(SELECT_STATEMENT.USR.BYID, [id]);
    return { success: true, status: 200, data: query.rows[0] };
  },
  signUp: async ({ email, password, repeatedPassword }) => {
    if (password !== repeatedPassword) {
      return {
        message: 'Les mots de passe doivent être identiques',
        success: false,
        status: 400,
      };
    }
    try {
      await pool.query(INSERT_USR, [email, password]);
      return {
        message: 'Merci pour votre inscription',
        success: true,
        status: 200,
      };
    } catch (err) {
      return {
        message: err.detail,
        success: false,
        status: 409,
      };
    }
  },
  signIn: async ({ email, password }) => {
    const query = await pool.query(SELECT_STATEMENT.USR.BYEMAIL, [email]);

    if (query.rowCount == 0) {
      return {
        message: "Le compte n'éxiste pas",
        success: false,
        status: 404,
      };
    }
    if (query.rows[0].password !== password) {
      return {
        message: 'Le mot de passe ne correspond pas au compte',
        success: false,
        status: 400,
      };
    }
    return {
      message: 'Vous êtes connecté !',
      success: true,
      status: 200,
    };
  },
};

module.exports = userService;
