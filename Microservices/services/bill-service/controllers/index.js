const controller = require("express").Router();
const Bill = require("../models");

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
    bills = [];
    if (req.query.user_id && req.query.bill_id) {
      bills = await Bill.findOne({
        user_id: req.query.user_id,
        _id: req.query.bill_id,
      });
    } else if (req.query.user_id) {
      bills = await Bill.find({ user_id: req.query.user_id });
    } else {
      bills = await Bill.find();
    }
    res.status(200).json(renderSuccess(null, bills));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.post("/", async (req, res) => {
  const { user_id, address, products } = req.body;
  try {
    const bill = new Bill({
      user_id,
      address,
      products,
      total: products.reduce((a, b) => a + b.product.price, 0),
    });
    await bill.save();
    res
      .status(200)
      .json(renderSuccess("Votre panier a été validé ! Procédez au paiement"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.patch("/", async (req, res) => {
  try {
    const { user_id, bill_id} = req.query
    console.log(req.query)
    const billPaid = await Bill.findOneAndUpdate(
      { user_id: user_id, _id: bill_id },
      { status: "Payment accepted" }
    );
    res.status(200).json(renderSuccess("Votre panier a été payé !", {bill_id: billPaid._id, address: billPaid.address, user_id: billPaid.user_id}));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.delete("/", async (req, res) => {
  const { user_id, bill_id } = req.query
  try {
    if (user_id && bill_id) {
      await Bill.deleteOne({user_id: user_id, _id: bill_id})
      return res.status(200).json(renderSuccess(`La facture ${bill_id} a été supprimée`));
    } else if (user_id) {
      await Bill.deleteMany({user_id: user_id})
      return res.status(200).json(renderSuccess(`Les factures de l'utilisateur ${user_id} ont été supprimées`));
    } else {
      await Bill.deleteMany();
      return res.status(200).json(renderSuccess("Les factures ont été supprimées"));
    }
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.delete("/:id", async (req, res) => {
  try {
    await Bill.findOneAndDelete(req.params.id);
    res.status(200).json(renderSuccess("La facture a été supprimée"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

module.exports = controller;
