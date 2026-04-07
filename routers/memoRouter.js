const express = require('express');
const router = express.Router();
const Memo = require('../models/Memo');

router.get('/:monthKey', async (req, res) => {
  try {
    const memo = await Memo.findOne({ monthKey: req.params.monthKey });
    res.json(memo || { monthKey: req.params.monthKey, plan: '', do: '', see: '' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:monthKey', async (req, res) => {
  try {
    const { plan, do: doText, see } = req.body;
    const memo = await Memo.findOneAndUpdate(
      { monthKey: req.params.monthKey },
      { plan, do: doText, see },
      { new: true, upsert: true }
    );
    res.json(memo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
