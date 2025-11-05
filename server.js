// server.js
const express = require("express");
const app = express();
app.use(express.json());

let rooms = {}; // { code: ip }

// ✅ 主機註冊房間
app.post("/register", (req, res) => {
  const { code, ip } = req.body;
  if (!code || !ip) {
    return res.status(400).json({ error: "missing code or ip" });
  }
  rooms[code] = ip;
  console.log(`🟢 房間註冊：${code} => ${ip}`);
  res.sendStatus(200);
});

// ✅ 客戶端查詢房間
app.get("/lookup/:code", (req, res) => {
  const ip = rooms[req.params.code];
  if (ip) {
    res.json({ ip });
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// ✅ Render 會從這裡啟動（預設 port 10000）
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
