const controller = require("express").Router();
const Delivery = require("../models");

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
    const deliveries = await Delivery.find();
    res.status(200).json(renderSuccess(null, deliveries));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.get("/:bill_id", async (req, res) => {
  try {
    const delivery = await Delivery.findOne({bill_id: req.params.bill_id});
    res.status(200).json(renderSuccess(null, delivery));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.post("/", async (req, res) => {
  const { bill_id, address} = req.body;
  try {
    const delivery = new Delivery({
      bill_id,
      address
    });
    await delivery.save();
    res
      .status(200)
      .json(renderSuccess("La livraison est initialisé !"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});


controller.delete("/", async (req, res) => {
  try {
    await Delivery.deleteMany();
    res.status(200).json(renderSuccess("Les livraisons ont été annulées"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.delete("/:bill_id", async (req, res) => {
  try {
    await Delivery.deleteMany({bill_id: req.params.bill_id});
    res.status(200).json(renderSuccess("La livraison a éta annulée"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});



module.exports = controller;
