const INSERT_STATEMENT = require('@/constants/queries/insertion');
const SELECT_STATEMENT = require('@/constants/queries/select');
const randomize = require('randomatic');
const { Pool } = require('pg');
const UPDATE_STATEMENT = require('@/constants/queries/update');
const DELETE_STATEMENT = require('@/constants/queries/delete');
const pool = new Pool({
  connectionString: 'postgresql://postgres:root@localhost:5432/postgres',
});

pool.connect();

const passwordReqService = {
  getAll: async () => {
    const getAllPwdReq = await pool.query(SELECT_STATEMENT.PWD_REQ.ALL);
    return {
      success: true,
      status: 200,
      data: getAllPwdReq.rows,
    };
  },
  requestPassword: async ({ email }) => {
    const getUserByMail = await pool.query(SELECT_STATEMENT.USR.BYEMAIL, [
      email,
    ]);

    if (getUserByMail.rowCount === 0) {
      return {
        message: 'Le compte est introuvable',
        success: false,
        status: 404,
      };
    }

    const getPasswordReqByMail = await pool.query(
      SELECT_STATEMENT.PWD_REQ.BYEMAIl,
      [email]
    );

    if (getPasswordReqByMail.rowCount > 0) {
      return {
        message: 'Un code a déjà été envoyé vers votre boite mail',
        success: false,
        status: 409,
      };
    }

    const code = randomize('0', 4);
    await pool.query(INSERT_STATEMENT.INSERT_PWD_REQ, [email, code]);
    return {
      message: 'Un code a été envoyé vers votre boite mail !',
      success: true,
      status: 200,
    };
  },
  resetPassword: async ({ id, code, password, repeatedPassword }) => {
    if (password !== repeatedPassword) {
      return {
        message: 'Les mots de passe doivent être identiques',
        success: false,
        status: 400,
      };
    }

    const getByIdAndCode = await pool.query(
      SELECT_STATEMENT.PWD_REQ.BYIDANDCODE,
      [id, code]
    );
    if (getByIdAndCode.rowCount === 0) {
      return {
        message: 'Le code est invalide/introuvable',
        success: false,
        status: 404,
      };
    }

    try {
      await pool.query(UPDATE_STATEMENT.USR.PASSWORDBYEMAIL, [
        password,
        getByIdAndCode.rows[0].email,
      ]);
      await pool.query(DELETE_STATEMENT.PWD_REQ.BYIDANDCODE, [id, code]);
      return {
        message: 'Votre mot de passe a bien été mis à jour !',
        success: true,
        status: 200,
      };
    } catch (err) {
      return {
        message: err,
        success: false,
        status: 400,
      };
    }
  },
};

module.exports = passwordReqService;
