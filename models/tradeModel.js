const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    entry: {
        type: Number,
        required: true
    },
    exit: {
        type: Number
    },
    quantityBght: {
        type: Number,
        required: true
    },
    quantitySld: {
        type: Number
    },
    positionType: {
        type: String,
        enum: ['long', 'short'],
        required: true
    },
    leverage: {
        type: Number,
        required: true
    },
    underlSecEntr: {
        type: Number
    },
    underlSecExt: {
        type: Number
    },
    name: {
        type: String,
        trim: true,
        uppercase: true,
        maxlength: 30,
        required: true
    },
    entryDate: {
        type: Date,
        required: true
    },
    exitDate: {
        type: Date
    },
    notes: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Trade', TradeSchema);