const controller = require('express').Router()
const mongoose = require('mongoose')
const UserModel = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



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
        res.status(200).json({success: true, data: user})
    } catch(err) {
        res.status(400).json({message: err.message, success: false})
    }
})

controller.get('/user/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
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

controller.delete('/', async (req, res) => {
    console.log('DELETE : ', {[req.query.field]: req.query.value} )
    try {
        await UserModel.deleteOne({[req.query.field]: req.query.value});
        res.status(200).json({ success: true})
    } catch(err) {
        res.status(400).json({message: err.message, success: false})
    }
})

module.exports = controller