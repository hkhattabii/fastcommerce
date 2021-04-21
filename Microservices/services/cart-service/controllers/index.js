const controller = require("express").Router();
const CartRow = require("../models");

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
    const {user_id, product_id} = req.query
    let carts = [];
    if (user_id && product_id) {
      carts = await CartRow.findOne({ user_id, product_id });
    } else if (user_id) {
      carts = await CartRow.find({ user_id });
    } else {
      carts = await CartRow.find();
    }
    res.status(200).json(renderSuccess(null, carts));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.post("/", async (req, res) => {
  try {
    const cartRow = new CartRow(req.body);
    await cartRow.save();
    res.status(200).json(renderSuccess("Le produit a été ajouté au panier"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.delete("/", async (req, res) => {
  try {
    const { user_id, product_id } = req.query;
    if (user_id && product_id) {
      await CartRow.deleteOne({ user_id, product_id });
      return res.status(200)
      .json(renderSuccess(`Le produit ${product_id} a bien été supprimé du panier`));
    } else if (user_id) {
      await CartRow.deleteMany({ user_id });
      return res.status(200)
      .json(renderSuccess(`Les produits de l'utilisateur ${user_id} ont bien été supprimé du panier`));
    } else {
      await CartRow.deleteMany()
      return res.status(200)
      .json(renderSuccess(`Tout les produits de tout les utilisaterus ont été retirés des paniers`));
    }


  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.patch("/increase", async (req, res) => {
  try {
    const {user_id, product_id} = req.query
    await CartRow.findOneAndUpdate(
      { user_id, product_id },
      { $inc: { quantity: 1 } }
    );
    res.status(200).json(renderSuccess());
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.patch("/decrease", async (req, res) => {
  try {
    const {user_id, product_id} = req.query
    await CartRow.findOneAndUpdate(
      { user_id, product_id },
      { $inc: { quantity: -1 } }
    );
    res.status(200).json(renderSuccess());
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});
module.exports = controller;
