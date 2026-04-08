const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// GET /settings/:key
router.get('/:key', async (req, res) => {
  try {
    const doc = await Settings.findOne({ key: req.params.key });
    res.json({ value: doc ? doc.value : null });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /settings/:key
router.put('/:key', async (req, res) => {
  try {
    const doc = await Settings.findOneAndUpdate(
      { key: req.params.key },
      { value: req.body.value },
      { upsert: true, new: true }
    );
    res.json({ value: doc.value });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
