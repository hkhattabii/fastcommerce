const controller = require("express").Router();
const Backup = require("../models");

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
    const backups = await Backup.find();
    res.status(200).json(renderSuccess(null, backups));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.get("/:user_id", async (req, res) => {
  try {
    const backup = await Backup.findOne({user_id: req.params.user_id});
    res.status(200).json(renderSuccess(null, backup));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.post("/", async (req, res) => {
  const { user_id, product_id, product } = req.body;
  try {
    const backup = new Backup({
      user_id,
      product_id,
      product,
    });
    await backup.save();
    res
      .status(200)
      .json(renderSuccess("Vous avez sauvegardé le produit !"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});


controller.delete("/", async (req, res) => {
  try {
    await Backup.deleteOne({user_id: req.query.user_id, product_id: req.query.product_id});
    res.status(200).json(renderSuccess("Le backup a été supprimé"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.delete("/clear", async (req, res) => {
  try {
    await Backup.deleteMany({user_id: req.query.user_id});
    res.status(200).json(renderSuccess("Les backups ont été supprimés"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});



module.exports = controller;
