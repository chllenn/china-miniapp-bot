// webapp/src/notifications.js

export const initNotifications = (userId) => {
  if (!("Notification" in window)) {
    console.warn("Браузер не поддерживает уведомления");
    return;
  }

  Notification.requestPermission().then((permission) => {
    if (permission !== "granted") {
      console.log("Уведомления отключены пользователем");
      return;
    }

    console.log("✅ Уведомления включены для пользователя:", userId);

    // Интервал для теста — каждую минуту (60 * 1000 мс)
    const intervalMs = 60 * 1000;

    setInterval(() => {
      new Notification("ChinaOrderBot", {
        body: "📦 Пора продолжить обучение или оформить новый заказ!",
        icon: "/logo192.png", // можно заменить на твой логотип
      });
    }, intervalMs);
  });
};
