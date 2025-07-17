const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Mock database
const transactions = [];

router.get('/', (req, res) => {
  res.json(transactions);
});

router.post(
  '/',
  [
    body('user_id').isInt(),
    body('category_id').isInt(),
    body('amount').isFloat(),
    body('date').isISO8601(),
    body('type').isIn(['income', 'expense']),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTransaction = {
      id: transactions.length + 1,
      ...req.body,
      created_at: new Date(),
    };
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
  }
);

module.exports = router;
