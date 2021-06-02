const controller = require("express").Router();
const randomize = require("randomatic");
const { Pool } = require("pg");
const SELECT_STATEMENT = require("../db/select");
const INSERT_STATEMENT = require("../db/insert");
const DELETE_STATEMENT = require("../db/delete");
const dbConnector = require("../db-connector");

const pool = new Pool({
  connectionString: dbConnector(process.env.ENV),
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
    const { code } = req.query;
    if (code) {
      const getDiscountCode = await pool.query(SELECT_STATEMENT.BYCODE, [code]);
      if (getDiscountCode.rowCount === 0) {
        return res.status(404).json(renderError("Le code n'existe pas"));
      }
      return res.status(200).json(renderSuccess(null, getDiscountCode.rows[0]));
    } else {
      const getAllDiscountCode = await pool.query(SELECT_STATEMENT.ALL);
      res.status(200).json(renderSuccess(null, getAllDiscountCode.rows));
    }
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.post("/", async (req, res) => {
  const { amount } = req.body;
  try {
    const code = randomize("A0", 6);
    await pool.query(INSERT_STATEMENT.DISC_CODE, [code, amount]);
    res.status(200).json(renderSuccess("Le code a été généré"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.delete("/", async (req, res) => {
  try {
    const { code } = req.query;
    if (code) {
      await pool.query(DELETE_STATEMENT.BYCODE, [code]);
      return res.status(200).json(renderSuccess("Le code a été supprimé"));
    } else {
      await pool.query(DELETE_STATEMENT.ALL);
      res.status(200).json(renderSuccess("Les codes ont été supprimés"));
    }
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

module.exports = controller;
