const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,  
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const schema = new mongoose.Schema({
    reduction: {
        type: Number,
        default: 0
    },
    products: {
        type: [productSchema],
        default: []
    }
})

module.exports = mongoose.model('Cart', schema)
