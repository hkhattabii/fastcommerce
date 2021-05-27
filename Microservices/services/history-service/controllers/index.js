const controller = require("express").Router();
const History = require("../models");

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
    const { user_id } = req.query;
    let histories;
    if (user_id) {
      histories = await History.find({ user_id: user_id });
    } else {
      histories = await History.find();
    }

    res.status(200).json(renderSuccess(null, histories));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.post("/", async (req, res) => {
  const { user_id, product_id, product } = req.body;
  try {
    const history = new History({
      user_id,
      product_id,
      product,
    });
    await history.save();
    res.status(200).json(renderSuccess());
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.delete("/", async (req, res) => {
  try {
    const { user_id, product_id } = req.query;
    if (user_id && product_id) {
      await History.deleteOne({
        user_id: user_id,
        product_id: product_id,
      });
      res
        .status(200)
        .json(renderSuccess(`Le ${product_id} de l'utilisateur ${user_id} a été supprimé de l'historique`));
    } else if (user_id) {
      await History.deleteMany({ user_id: req.query.user_id });
      res
        .status(200)
        .json(
          renderSuccess(
            `Les produits de l'utilisateur ${user_id} ont été supprimés de l'historique`
          )
        );
    } else {
      await History.deleteMany()
      res.status(200).json(`Tous les produits ont été supprimés de l'historique`)
    }
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

module.exports = controller;
