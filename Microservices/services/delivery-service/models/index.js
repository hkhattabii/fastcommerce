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
const schema = new mongoose.Schema({
    bill_id: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: 'In Warehouse'
    },
    estimatedDate: {
        type: String,
        default: new Date().setDate(new Date().getDate() + 3)
    },
    address: {
        type: addressSchema,
        required: true
    },
})

module.exports = mongoose.model('Delivery', schema)
