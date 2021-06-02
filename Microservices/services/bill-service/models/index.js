const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: {
        type: String
    },
    streetNumber: {
        type: Number
    },
    zipcode: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    }
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    } 
})


const schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        required: true
    },
    address: {
        type: addressSchema,
        required: true,
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Bill', schema)
