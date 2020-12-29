const asyncHandler = require('express-async-handler');
const Trade = require('../models/tradeModel');

// @desc    Add new trade
// @route   POST /api/trades
// @access  Private
exports.addTrade = asyncHandler(async (req, res) => {
    const {
        entry,
        quantityBght,
        positionType,
        leverage,
        underlSecEntr,
        name,
        entryDate,
        notes,
    } = req.body;
    
    const trade = new Trade({
        user: req.user._id,
        entry,
        quantityBght,
        positionType,
        leverage,
        underlSecEntr,
        name,
        entryDate,
        notes,
    })
  
    const createdTrade = await trade.save()

    res.status(201).json(createdTrade)
})

// @desc    Update trade
// @route   PUT /api/trades/:id
// @access  Private
exports.updateTrade = asyncHandler(async (req, res) => {
    const trade = await Trade.findById(req.params.id)

    if (trade) {
        // TODO

        const updatedTrade = await trade.save()

        res.json({
            // TODO
        })
    } else {
        res.status(404)
        throw new Error('Trade not found')
    }
})

// @desc    Delete trade
// @route   DELETE /api/trades/:id
// @access  Private
exports.deleteTrade = asyncHandler(async (req, res) => {
    const trade = await Trade.findById(req.params.id)

    if (trade) {
        await trade.remove()
        res.json({ message: 'Trade removed' })
    } else {
        res.status(404)
        throw new Error('Trade not found')
    }
})

// @desc    Get trade by ID
// @route   GET /api/trades/:id
// @access  Private
exports.getTradeById = asyncHandler(async (req, res) => {
    const trade = await Trade.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if (trade) {
        res.json(trade)
    } else {
        res.status(404)
        throw new Error('Trade not found')
    }
})

// @desc    Get logged in user trades
// @route   GET /api/trades/mytrades
// @access  Private
exports.getMyTrades = asyncHandler(async (req, res) => {
    const trades = await Trade.find({ user: req.user._id })
    res.json(trades)
})

// @desc    Get all trades
// @route   GET /api/trades
// @access  Private/Admin
exports.getTrades = asyncHandler(async(req, res) => {
    const trades = await Trade.find({}).populate('user', 'id name')
    res.json(trades)
})