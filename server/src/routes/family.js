const express = require('express');
const router = express.Router();

// Mock database
const familyMembers = [];

router.get('/', (req, res) => {
  res.json(familyMembers);
});

router.post('/', (req, res) => {
  const newMember = {
    id: familyMembers.length + 1,
    ...req.body,
  };
  familyMembers.push(newMember);
  res.status(201).json(newMember);
});

module.exports = router;
