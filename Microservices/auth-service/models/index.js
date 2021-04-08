const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    createdat: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Auth', schema)