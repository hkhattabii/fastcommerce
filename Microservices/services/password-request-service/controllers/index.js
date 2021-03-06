const controller = require("express").Router();
const randomize = require("randomatic");
const { Pool } = require("pg");
const SELECT_STATEMENT = require("../db/select");
const INSERT_STATEMENT = require("../db/insert");
const DELETE_STATEMENT = require("../db/delete");

const pool = new Pool({
  connectionString:
    process.env.ENV === "production"
      ? "postgresql://postgres:root@password-request-db:5432/postgres"
      : "postgresql://postgres:root@localhost:5004/postgres",
});

pool.connect();

pool.query(`CREATE TABLE IF NOT EXISTS PWD_REQ (
  id SERIAL PRIMARY KEY,
  EMAIL VARCHAR(64) UNIQUE NOT NULL,
  CODE VARCHAR(4)  NOT NULL 
)`)

const renderSuccess = (message, data) => ({
  message,
  success: true,
  data,
});
const renderError = (message) => ({
  message,
  success: false,
});

controller.get("/", async (req, res) => {
  try {
    const getAllPwdReq = await pool.query(SELECT_STATEMENT.ALL);
    res.status(200).json({
      success: true,
      data: getAllPwdReq.rows,
    });
    return;
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.get("/byEmail", async (req, res) => {
  try {
    const getPasswordReqByMail = await pool.query(SELECT_STATEMENT.BYEMAIl, [
      req.query.email,
    ]);

    if (getPasswordReqByMail.rowCount === 0) {
      res
        .status(400)
        .json(
          renderError("L'email n'éxiste pas dans les requêtes de mot de passe")
        );
      return;
    }
    res.status(200).json(renderSuccess(null, getPasswordReqByMail.rows[0]));
    return;
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.post("/", async ({ body }, res) => {
  const { email } = body;
  try {
    const getPasswordReqByMail = await pool.query(SELECT_STATEMENT.BYEMAIl, [
      email,
    ]);

    if (getPasswordReqByMail.rowCount > 0) {
      res
        .status(409)
        .json(renderError("Un code a déjà été envoyé vers votre boite mail"));
      return;
    }

    const code = randomize("0", 4);
    await pool.query(INSERT_STATEMENT.INSERT_PWD_REQ, [email, code]);
    res
      .status(200)
      .json(renderSuccess("Un code a été envoyé vers votre boite mail !"));
    return;
  } catch (err) {

    res.status(400).json(renderError(err.message));
  }
});

controller.get("/:id/:code", async ({ params }, res) => {
  try {
    const getByIdAndCode = await pool.query(SELECT_STATEMENT.BYIDANDCODE, [
      params.id,
      params.code,
    ]);

    if (getByIdAndCode.rowCount === 0) {
      res.status(404).json(renderError("Le code est invalide/introuvable"));
      return;
    }

    res
      .status(200)
      .json(renderSuccess(null, { email: getByIdAndCode.rows[0].email }));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.delete("/byEmail", async ({ query }, res) => {
  try {
    await pool.query(DELETE_STATEMENT.BYEMAIL, [query.email]);
    res.status(200).json(renderSuccess());
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.delete("/:id/:code", async ({ params }, res) => {
  try {
    await pool.query(DELETE_STATEMENT.BYIDANDCODE, [params.id, params.code]);
    res.status(200).json(renderSuccess());
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

module.exports = controller;
