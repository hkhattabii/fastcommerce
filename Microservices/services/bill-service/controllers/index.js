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
    const bills = await Bill.find();
    res.status(200).json(renderSuccess(null, bills));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.get("/:user_id", async (req, res) => {
  try {
    const bill = await Bill.find({user_id: req.params.user_id});
    res.status(200).json(renderSuccess(null, bill));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.get("/:user_id/:bill_id", async (req, res) => {
  try {
    const bill = await Bill.findOne({user_id: req.params.user_id, bill_id: req.params.bill_id});
    res.status(200).json(renderSuccess(null, bill));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.post("/", async (req, res) => {
  const { user_id, products } = req.body;
  try {
    const bill = new Bill({
      user_id,
      products,
      total: products.reduce((a, b) => a + b.price, 0),
    });
    await bill.save();
    res
      .status(200)
      .json(renderSuccess("Votre panier a été validé ! Procédez au paiement"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.patch("/pay/:id", async (req, res) => {
  try {
    await Bill.updateOne({_id: req.params.id}, { status: "Payment accepted"})
    res
      .status(200)
      .json(renderSuccess("Votre panier a été payé !"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.delete("/", async (req, res) => {
  try {
    await Bill.deleteMany();
    res.status(200).json(renderSuccess("Les factures ont été supprimées"));
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
