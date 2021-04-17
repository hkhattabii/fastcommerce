const controller = require('express').Router()
const CartRow = require('../models')

const renderSuccess = (message, data) => ({
    message,
    success: true,
    data,
  });
  const renderError = (message) => ({
    message,
    success: false,
  });


controller.get('/', async (req, res) => {
    try {
        const carts = await CartRow.find({user_id: req.query.user_id});
        res.status(200).json(renderSuccess(null,carts))
    } catch(err) {
        res.status(400).json(renderError(err.message))
    }
})

controller.post('/', async (req, res) => {
  try {
    const cartRow = new CartRow(req.body)
    await cartRow.save()
    res.status(200).json(renderSuccess('Le produit a été ajouté au panier'))
  } catch (err) {
    res.status(400).json(renderError(err.message))
  }
})

controller.delete('/', async (req, res) => {
  try {
    await CartRow.deleteOne({user_id: req.query.user_id, product_id: req.query.product_id})
    res.status(200).json(renderSuccess(`Le produit a bien été supprimé du panier`))
  } catch (err) {
    res.status(400).json(renderError(err.message))
  }
})

controller.patch('/increase', async (req, res) => {
  try {
    await CartRow.findOneAndUpdate({user_id: req.query.user_id, product_id: req.query.product_id}, {$inc: {quantity: 1}})
    res.status(200).json(renderSuccess())
  } catch (err) {
    res.status(400).json(renderError(err.message))
  }
})

controller.patch('/decrease', async (req, res) => {
  try {
    await CartRow.findOneAndUpdate({user_id: req.query.user_id, product_id: req.query.product_id}, {$inc: {quantity: -1}})
    res.status(200).json(renderSuccess())
  } catch (err) {
    res.status(400).json(renderError(err.message))
  }
})

controller.delete('/clear', async (req, res) => {
  try {
     await CartRow.deleteMany({user_id: req.query.user_id})
     res.status(200).json(renderSuccess('Le panier a été nettoyé'))
  } catch (err) {
    res.status(400).json(renderError(err.message))
  }
})




module.exports = controller