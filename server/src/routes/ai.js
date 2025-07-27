const express = require('express');
const router = express.Router();

router.get('/recommendations', (req, res) => {
  // Mock AI recommendations
  const recommendations = [
    {
      category: 'Groceries',
      suggestion: 'You can save $50 on groceries this month.',
    },
    {
      category: 'Entertainment',
      suggestion: 'You can save $100 on entertainment this month.',
    },
  ];
  res.json(recommendations);
});

module.exports = router;
