const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
    }
})

const schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    product: {
        type: productSchema,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
})

schema.index({ user_id: 1, product_id: 1}, { unique: true });
module.exports = mongoose.model('CartRow', schema)
