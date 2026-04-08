const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    dateKey: { type: String, required: true },
    text: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
    assignee: { type: String, default: '' },
    color: { type: String, default: '' },
    _insertOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);
