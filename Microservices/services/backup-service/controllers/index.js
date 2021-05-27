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
    const { user_id } = req.query;
    let backups;
    if (user_id) {
      backups = await Backup.find({ user_id: user_id });
    } else {
      backups = await Backup.find();
    }

    res.status(200).json(renderSuccess(null, backups));
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
    res.status(200).json(renderSuccess("Vous avez sauvegardé le produit !"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.delete("/", async (req, res) => {
  try {
    const { user_id, product_id } = req.query;
    console.log(req.query)
    if (user_id && product_id) {
      await Backup.deleteOne({
        user_id: user_id,
        product_id: product_id,
      });
      res
        .status(200)
        .json(renderSuccess(`Le souhait ${product_id} de l'utilisateur ${user_id} a été supprimé`));
    } else if (user_id) {
      await Backup.deleteMany({ user_id: req.query.user_id });
      res
        .status(200)
        .json(
          renderSuccess(
            `Les souhaits de l'utilisateur ${user_id} ont été supprimés`
          )
        );
    } else {
      await Backup.deleteMany()
      res.status(200).json('Tous les souhaits ont été supprimés')
    }
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

module.exports = controller;
