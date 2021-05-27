const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
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
    createdAt: {
        type: Date,
        default: new Date()
    }
})

schema.index({ user_id: 1, product_id: 1});

module.exports = mongoose.model('History', schema)
