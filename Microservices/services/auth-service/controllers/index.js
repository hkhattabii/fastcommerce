const controller = require('express').Router()
const mongoose = require('mongoose')
const UserModel = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



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
        const users = await UserModel.find();
        res.status(200).json({success: true, data: users})
    } catch(err) {
        res.status(400).json({message: err.message, success: false})
    }

})

controller.get('/user', async (req, res) => {
    try {
        const user = await UserModel.findOne({[req.query.field]: req.query.value})
        if (!user) {
            res.status(404).json({success: false, message: "Le compte est introuvable"})
            return;
        }
        res.status(200).json({success: true, data: user})
    } catch(err) {
        res.status(400).json({message: err.message, success: false})
    }
})

controller.get('/user/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)

        if (!user) {
            res.status(404).json({success: false, message: "Le compte est introuvable"})
            return;
        }
        res.status(200).json({success: true, data: user})
    } catch (err) {
        res.status(400).json({message: err.message, success: false})
    }
})


controller.post('/signUp', async ({body}, res) => {
    const {
        email,
        password,
        repeatedPassword
    } = body

    if (password !== repeatedPassword) {
        res.status(400).json({message: 'Les mots de passes doivent être identiques', success: false})
        return;
    }
    const salt = await bcrypt.genSalt(8)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new UserModel({email, password: hashedPassword})

    try {
        await user.save()
        res.status(200).json({message: 'Merci pour votre inscription !', success: true})
        return;
    } catch (err) {
        res.status(400).json({message: err.message, success: false})
    }

})

controller.post('/signIn', async ({body}, res) => {
    const {
        email, 
        password
    } = body

    const user = await UserModel.findOne({email})

    if (!user) {
        res.status(404).json({message: 'Le compte est introuvable', success: false})
        return;
    }

    const rightPassword = await bcrypt.compare(password, user.password)

    if (!rightPassword) {
        res.status(400).json({message: 'Le mot de passe est incorrect', success: false})
        return;
    }
    
    const TokenerizedId = jwt.sign(user.id, process.env.SECRET || "LONG SECRET KEY")

    res.status(200).json({message: 'Vous êtes connecté !', success: true, data: TokenerizedId})
})


controller.put('/updatePassword', async (req, res) => {
    const { password, repeatedPassword, email } = req.body

    if (password !== repeatedPassword) {
        res
          .status(400)
          .json(renderError("Les mots de passes doivent être identiques"));
        return;
      }

    try {
        const salt = await bcrypt.genSalt(8)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await UserModel.updateOne({email}, {password: hashedPassword})
        if (user.nModified === 0) {
            res.status(400).json(renderError(`Le compte n'éxiste pas`))
            return;
        }
        res.status(200).json(renderSuccess(`Votre mot de passe a bien été mis à jour !`))
    } catch (err) {
        res.status(400).json(renderError(err.message))
    }
})

controller.delete('/', async (req, res) => {
    await UserModel.deleteOne({[req.query.field]: req.query.value});
    res.status(200).json({ success: true})
})

module.exports = controller