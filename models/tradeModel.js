const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  entry: {
    type: Number,
    min: 0.0001,
    required: true
  },
  exit: {
    type: Number
  },
  quantityBght: {
    type: Number,
    min: 1,
    required: true
  },
  quantitySld: {
    type: Number,
    max: this.quantityBght,
    default: 0
  },
  profitLoss: {
    type: Number,
    default: function() {
      return this.exit * this.quantityBght - this.entry * this.quantitySld
    }
  },
  profitLossPct: {
    type: Number,
    default: function() {
      return (this.exit * this.quantityBght - this.entry * this.quantitySld) / (this.entry * this.quantitySld)
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
    max: 0.9999 * this.entry
  },
  takeProfit: {
    type: Number,
    min: 1.0001 * this.entry
  },
  riskReward: {
    type: Number,
    default: function() {
      return (this.takeProfit - this.entry) / (this.entry - this.stopLoss)
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