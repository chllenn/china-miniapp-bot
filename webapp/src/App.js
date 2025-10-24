import { useEffect } from "react";

function App() {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.MainButton.setText("🚀 Открыть модуль");
    tg.MainButton.show();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🇨🇳 Mini App: Обучение заказам из Китая</h1>
      <p>Добро пожаловать в твое приложение!</p>
      <p>Скоро здесь будут: модули, прогресс, чат с ИИ и доступ по коду 🔐</p>
    </div>
  );
}

export default App;
