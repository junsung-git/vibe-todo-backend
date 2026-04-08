const mongoose = require('mongoose');

// 멤버 목록, 메모 등 앱 설정을 하나의 도큐먼트로 저장
const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
