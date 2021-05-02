const controller = require("express").Router();
const Cart = require("../models");

const renderSuccess = (message, data) => ({
  message,
  success: true,
  data,
});
const renderError = (message) => ({
  message,
  success: false,
});

function getTotalPrice(cart) {
  const basePrice = cart.products.reduce((a, { price }) => a + price, 0)
  if (cart.products.length > 0 ) {
    return Math.round((basePrice - cart.reduction) * 100) / 100
  }
  return basePrice

}

controller.get("/", async (req, res) => {
  try {
    const {user_id, product_id} = req.query
    let carts = [];
    if (user_id && product_id) {
      carts = await Cart.findOne({ _id: user_id, "products._id": product_id}).select({ products: 1, _id: 0});
    } else if (user_id) {
      const cart  = await Cart.findOne({ _id: user_id});
      if (!cart) {
        return res.status(404).json(renderError("L'utilisateur n'existe pas"))
      }
      res.status(200).json(renderSuccess(null, {
        ...cart._doc,
        total: getTotalPrice(cart._doc)
      }));
      return
    } else {
      carts = await Cart.find();
    }
    res.status(200).json(renderSuccess(null, carts));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.post("/", async (req, res) => {
  try {
    const cart = new Cart({_id: req.body.user_id})
    await cart.save()
    res.status(200).json(renderSuccess());
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.patch("/", async (req, res) => {
  try {
    const productFormatted = {
      ...req.body.product, 
      _id: req.body.product_id, 
      unitPrice: req.body.product.price,
      price: req.body.product.price
    }
    await Cart.updateOne({_id: req.body.user_id}, {
     $addToSet: { products: productFormatted}
    })
    res.status(200).json(renderSuccess("Le produit a été ajouté au panier"));
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.patch("/increase", async (req, res) => {
  try {
    const {user_id, product_id} = req.query
    const cart = await Cart.findOne({ _id: user_id, "products._id": product_id}).select({ products: 1, _id: 0})
    await Cart.findOneAndUpdate({ _id: user_id, "products._id": product_id}, {
      $set: {
        'products.$.quantity': cart.products[0].quantity + 1,
        'products.$.price': (cart.products[0].quantity + 1) * cart.products[0].unitPrice
      }
    })
    res.status(200).json(renderSuccess());
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.patch("/decrease", async (req, res) => {
  try {
    const {user_id, product_id} = req.query
    const cart = await Cart.findOne({ _id: user_id, "products._id": product_id}).select({ products: 1, _id: 0})
    await Cart.findOneAndUpdate({ _id: user_id, "products._id": product_id}, {
      $set: {
        'products.$.quantity': cart.products[0].quantity - 1
      }
    })
    res.status(200).json(renderSuccess());
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});


controller.patch("/clear", async (req, res) => {
  try {
    const { user_id, product_id } = req.query;
    if (user_id && product_id) {
      await Cart.updateOne({ _id: user_id}, {
        $pull: {
          products: { "_id": product_id}
        }
      });
      return res.status(200)
      .json(renderSuccess(`Le produit ${product_id} a bien été supprimé du panier`));
    } else if (user_id) {
      await Cart.updateOne({ _id: user_id }, {products: []});
      return res.status(200)
      .json(renderSuccess(`Les produits de l'utilisateur ${user_id} ont bien été supprimé du panier`));
    } else {
      await Cart.updateMany({ }, {products: []})
      return res.status(200)
      .json(renderSuccess(`Tout les produits de tout les utilisateurs ont été retirés des paniers`));
    }

  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
});

controller.patch('/applyReduction', async (req, res) => {
  try {
    const { reduction, user_id } = req.query;
    await Cart.updateOne({ _id: user_id }, { reduction })
    res.status(200).json(renderSuccess(`Le code de réduction de ${reduction} euros a été appliqué à votre panier !`))
  } catch (err) {
    res.status(400).json(renderError(err.message));
  }
})


module.exports = controller;
