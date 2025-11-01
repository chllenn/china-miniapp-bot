// server/server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { subscribeUser, unsubscribeUser } from "./notifications.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Включение уведомлений
app.post("/api/notifications/enable", (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "Нет userId" });

  subscribeUser(userId);
  res.json({ success: true, message: "Уведомления включены" });
});

// Отключение уведомлений
app.post("/api/notifications/disable", (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "Нет userId" });

  unsubscribeUser(userId);
  res.json({ success: true, message: "Уведомления выключены" });
});

app.listen(3001, () => {
  console.log("✅ Сервер уведомлений запущен на http://localhost:3001");
});
