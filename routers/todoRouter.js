const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
  try {
    const filter = req.query.dateKey ? { dateKey: req.query.dateKey } : {};
    const todos = await Todo.find(filter);
    res.json(todos);
  } catch (e) {
    console.error('GET /todos 에러:', e.message);
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { dateKey, text, _insertOrder, assignee, color, equipment } = req.body;
    const todo = await Todo.create({ dateKey, text, _insertOrder, assignee: assignee || '', color: color || '', equipment: equipment || [] });
    res.status(201).json(todo);
  } catch (e) {
    console.error('POST /todos 에러:', e.message);
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { text, done, assignee, color, equipment } = req.body;
    const update = {};
    if (text !== undefined) update.text = text;
    if (done !== undefined) update.done = done;
    if (assignee !== undefined) update.assignee = assignee;
    if (color !== undefined) update.color = color;
    if (equipment !== undefined) update.equipment = equipment;
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
