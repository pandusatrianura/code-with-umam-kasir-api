const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// GET all transactions
router.get('/', transactionController.getAllTransactions);

// GET transaction by ID
router.get('/:id', transactionController.getTransactionById);

// POST create new transaction
router.post('/', transactionController.createTransaction);

module.exports = router;
