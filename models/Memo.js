const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
  monthKey: { type: String, required: true, unique: true }, // "2026-4"
  plan: { type: String, default: '' },
  do:   { type: String, default: '' },
  see:  { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Memo', memoSchema);
