const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    dateKey: {
      type: String,
      required: true, // "2026-01-05" 형식
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    _insertOrder: {
      type: Number,
      default: 0,
    },
    person: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Todo', todoSchema);
