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
    const { delivery_id, bill_id, user_id } = req.query;
    let deliveries = [];
    if (delivery_id && bill_id) {
      deliveries = await Delivery.findOne({
        _id: delivery_id,
        bill_id,
      });
    } else if (delivery_id) {
      deliveries = await Delivery.findOne({ delivery_id });
    } else if (bill_id) {
      deliveries = await Delivery.findOne({ bill_id });
    } else if (user_id) {
      deliveries = await Delivery.find({ user_id });
    } else {
      deliveries = await Delivery.find();
    }
    res.status(200).json(renderSuccess(null, deliveries));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.post("/", async (req, res) => {
  const { bill_id, address, user_id } = req.body;
  try {
    const delivery = new Delivery({
      bill_id,
      address,
      user_id,
    });
    await delivery.save();
    res.status(200).json(renderSuccess("La livraison est initialisé !"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.delete("/", async (req, res) => {
  try {
    const { delivery_id, bill_id, user_id } = req.query;
    if (delivery_id && bill_id) {
      await Delivery.deleteOne({
        _id: delivery_id,
        bill_id,
      });
    } else if (delivery_id) {
      deliveries = await Delivery.deleteOne({ delivery_id });
    } else if (bill_id) {
      deliveries = await Delivery.deleteOne({ bill_id });
    } else if (user_id) {
      await Delivery.deleteMany({ user_id });
    } else {
      await Delivery.deleteMany();
    }

    res.status(200).json(renderSuccess("Les livraisons ont été annulées"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

module.exports = controller;
