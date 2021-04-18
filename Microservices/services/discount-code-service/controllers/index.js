const controller = require("express").Router();
const randomize = require("randomatic");
const { Pool } = require("pg");
const SELECT_STATEMENT = require("../db/select");
const INSERT_STATEMENT = require("../db/insert");
const DELETE_STATEMENT = require("../db/delete");

const pool = new Pool({
  connectionString:
    process.env.ENV === "production"
      ? "postgresql://postgres:root@discount-code-db/postgres"
      : "postgresql://postgres:root@localhost:5432/postgres",
});

pool.connect();

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
    const getAllDiscountCode = await pool.query(SELECT_STATEMENT.ALL);
    res.status(200).json(renderSuccess(null, getAllDiscountCode.rows));
    return;
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.get('/:code', async (req, res) => {
  try {
    const getDiscountCode = await pool.query(SELECT_STATEMENT.BYCODE, [req.params.code])
    if (getDiscountCode.rowCount === 0) {
      return res.status(404).json(renderError("Le code n'éxiste pas"))
    }
    res.status(200).json(renderSuccess(null, getDiscountCode.rows[0]))
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
})

controller.post('/', async (req, res) => {
  const { amount } = req.body
  try {
    const code = randomize("A0", 6)
    await pool.query(INSERT_STATEMENT.DISC_CODE, [code,amount])
    res.status(200).json(renderSuccess('Le code a été généré'))
  } catch (err) {
    res.status(400).json(renderError(err.message))
  }
})

controller.delete('/', async (req, res) => {
  try {
    await pool.query(DELETE_STATEMENT.ALL)
    res.status(200).json(renderSuccess('Les codes ont été supprimés'))
  } catch (err) {
    res.status(400).json(renderError(err.message))
  }
})

controller.delete('/:code', async (req, res) => {
  try {
    await pool.query(DELETE_STATEMENT.BYCODE, [req.params.code])
    res.status(200).json(renderSuccess('Le code a été supprimé'))
  } catch (err) {
    res.status(400).json(renderError(err.message))
  }
})



module.exports = controller;
