const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Waiting for payment'
    }
})

module.exports = mongoose.model('Bill', schema)
