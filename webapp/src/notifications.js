export async function enableNotifications() {
  const tg = window.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id;

  if (!userId) {
    alert("Ошибка: не удалось получить ID пользователя.");
    return;
  }

  await fetch("https://твой-домен/api/notifications/on", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  alert("🔔 Уведомления включены!");
}

export async function disableNotifications() {
  const tg = window.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id;

  await fetch("https://твой-домен/api/notifications/off", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  alert("🔕 Уведомления выключены!");
}
