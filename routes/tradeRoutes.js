const express = require('express');
const router = express.Router();
const { addTrade, updateTrade, deleteTrade, getTradeById, getMyTrades, getTrades } = require('../controllers/tradeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, addTrade).get(protect, admin, getTrades);
router.route('/mytrades').get(protect, getMyTrades);
router
    .route('/:id')
    .get(protect, getTradeById)
    .delete(protect, deleteTrade)
    .put(protect, updateTrade);

module.exports = router;