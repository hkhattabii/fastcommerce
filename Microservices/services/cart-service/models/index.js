const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    product_id: {
        type: String,
    },
    product: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    },
    quantity: {
        type: Number,
        default: 0
    }
})

schema.index({ user_id: 1, product_id: 1}, { unique: true });

module.exports = mongoose.model('cart-row', schema)