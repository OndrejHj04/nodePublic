const mongoose = require("mongoose")

companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cabelSystem: {
        type: Array,
        required: true
    },
    gateCount: {
        type: Number,
        required: true
    },
    gateType: {
        type: String, 
        require: true
    },
    state: {
        type: String,
        required: true,
        default: ''
    }
})

module.exports = mongoose.model('Company', companySchema)