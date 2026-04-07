const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
  try {
    let filter = {};
    if (req.query.dateKey) filter.dateKey = req.query.dateKey;
    else if (req.query.month) filter.dateKey = { $regex: `^${req.query.month}` };
    const todos = await Todo.find(filter);
    res.json(todos);
  } catch (e) {
    console.error('GET /todos 에러:', e.message);
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { dateKey, text, _insertOrder, person } = req.body;
    const todo = await Todo.create({ dateKey, text, _insertOrder, person });
    res.status(201).json(todo);
  } catch (e) {
    console.error('POST /todos 에러:', e.message);
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { text, done, person } = req.body;
    const update = {};
    if (text !== undefined) update.text = text;
    if (done !== undefined) update.done = done;
    if (person !== undefined) update.person = person;
    const todo = await Todo.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(todo);
  } catch (e) {
    console.error('PUT /todos 에러:', e.message);
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (e) {
    console.error('DELETE /todos 에러:', e.message);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
