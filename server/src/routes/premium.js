const express = require('express');
const router = express.Router();

// Mock database
const premiumFeatures = {
  isActive: false,
  expiryDate: null,
  features: [],
};

router.get('/', (req, res) => {
  res.json(premiumFeatures);
});

router.post('/subscribe', (req, res) => {
  premiumFeatures.isActive = true;
  premiumFeatures.expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  premiumFeatures.features = ['advanced_reports', 'debt_tools'];
  res.json(premiumFeatures);
});

module.exports = router;
