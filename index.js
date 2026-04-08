const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

const todoRouter = require('./routers/todoRouter');
const settingsRouter = require('./routers/settingsRouter');

app.get('/', (req, res) => {
  res.json({ message: 'todo-backend 서버 실행 중 ✅' });
});

app.use('/todos', todoRouter);
app.use('/settings', settingsRouter);

// MongoDB 연결 후 서버 시작
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB 연결 성공!');
    app.listen(PORT, () => {
      console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB 연결 실패:', err.message);
  });
