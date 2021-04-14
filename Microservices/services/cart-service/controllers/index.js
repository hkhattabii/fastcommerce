const controller = require('express').Router()
const CartModel = require('../models')


function renderError(message) {
    return {message, success: false}
}

function renderSuccess(message, data) {
    return {message, data, success: true}
}


controller.get('/', async (req, res) => {
   try {
    const carts = await CartModel.find()
    res.status(200).json(renderSuccess(null, carts))
    renderSuccess(null, carts)
   } catch (e) {
    res.status(400).json(renderError(e.message))
   }

})

module.exports = controller

