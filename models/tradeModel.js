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
        type: Number,
        default: 0
    },
    profitLoss: {
        type: Number,
        default: function() {
            return exit * quantityBght - entry * quantitySld
        }
    },
    profitLossPct: {
        type: Number,
        default: function() {
            return (exit * quantityBght - entry * quantitySld) / (entry * quantitySld)
        }
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
    stopLoss: {
        type: Number,
        max: 0.9999 * entry
    },
    takeProfit: {
        type: Number,
        min: 1.0001 * entry
    },
    riskReward: {
        type: Number,
        default: function() {
            return (takeProfit - entry) / (entry - stopLoss)
        }
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