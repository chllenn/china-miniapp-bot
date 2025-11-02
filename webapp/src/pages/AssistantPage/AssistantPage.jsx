import React, { useState, useRef, useEffect } from "react";
import BurgerMenu from "../../components/BurgerMenu";
import logo from "../HomePage/logo.png";
import "./AssistantPage.css";

const STORAGE_KEY = "chinaorder_assistant_chat_v1";

const AssistantPage = ({ navigate }) => {
  const [messages, setMessages] = useState(() => {
    // ✅ Загружаем сохранённые сообщения
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [isChatStarted, setIsChatStarted] = useState(
    messages.length > 0 // если уже были сообщения, чат сразу активен
  );
  const chatEndRef = useRef(null);

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const API_URL = "https://api.openai.com/v1/chat/completions";

  // 💾 Сохраняем историю при изменении сообщений
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsChatStarted(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Ты — ChinaOrder Assistant, эксперт по заказам из Китая (1688, Taobao, Poizon, Alibaba, логистика и посредники). Помогай кратко и по делу.",
            },
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: input },
          ],
        }),
      });

      const data = await response.json();
      const botText =
        data?.choices?.[0]?.message?.content ||
        "Извини, не удалось получить ответ.";

      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    } catch (error) {
      console.error("Ошибка ассистента:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Ошибка при подключении к ассистенту." },
      ]);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setIsChatStarted(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="assistant-page">
      <BurgerMenu />

      {/* Верхние кнопки */}
      <div className="assistant-top">
        <button className="assistant-top-btn" onClick={handleClear}>
          Очистить чат
        </button>
        <button
          className="assistant-top-btn"
          onClick={() => (window.location.href = "/")}
        >
          В главное меню
        </button>
      </div>

      {/* Название ассистента */}
      <h2
        className={`assistant-title ${
          isChatStarted ? "assistant-title-fixed" : ""
        }`}
      >
        ChinaOrder Assistant
      </h2>

      {/* Логотип до начала диалога */}
      {!isChatStarted && (
        <div className="assistant-logo-container">
          <img src={logo} alt="logo" className="assistant-logo" />
        </div>
      )}

      {/* Область сообщений */}
      <div
        className={`assistant-chat ${
          isChatStarted ? "assistant-chat-started" : "assistant-chat-centered"
        }`}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat-message ${m.sender === "user" ? "user" : "bot"}`}
          >
            {m.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Поле ввода */}
      <div
        className={`assistant-input-container ${
          !isChatStarted ? "centered" : ""
        }`}
      >
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        {input.trim() && (
          <button className="send-btn" onClick={handleSend}>
            ➤
          </button>
        )}
      </div>
    </div>
  );
};

export default AssistantPage;
