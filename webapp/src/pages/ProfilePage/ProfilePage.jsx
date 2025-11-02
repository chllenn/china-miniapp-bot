import React, { useEffect, useState } from "react";
import BurgerMenu from "../../components/BurgerMenu"; // ✅ добавлено
import "./ProfilePage.css";

const STORAGE_KEY = "china_profile_state_v1";
const BASE_URL = "http://192.168.1.105:3001";

export default function ProfilePage() {
  const tgUser = window?.Telegram?.WebApp?.initDataUnsafe?.user;
  const mainPlatforms = ["Poizon", "1688", "Taobao", "Pinduoduo"];

  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return {
          goal: "",
          selectedPlatforms: [],
          customPlatforms: [],
          notificationsOn: false,
          progress: 0,
        };
      }
      return JSON.parse(raw);
    } catch {
      return {
        goal: "",
        selectedPlatforms: [],
        customPlatforms: [],
        notificationsOn: false,
        progress: 0,
      };
    }
  });

  const [customInput, setCustomInput] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const toggleNotifications = async () => {
    const newValue = !state.notificationsOn;
    setState((prev) => ({ ...prev, notificationsOn: newValue }));

    try {
      const user = tgUser;
      if (!user) return;

      const endpoint = newValue
        ? "/api/notifications/on"
        : "/api/notifications/off";

      await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      console.log(
        `Уведомления ${newValue ? "включены" : "выключены"} для ${user.id}`
      );
    } catch (err) {
      console.warn("Ошибка уведомлений:", err);
    }
  };

  const togglePlatform = (name) => {
    setState((prev) => {
      const exists = prev.selectedPlatforms.includes(name);
      return {
        ...prev,
        selectedPlatforms: exists
          ? prev.selectedPlatforms.filter((p) => p !== name)
          : [...prev.selectedPlatforms, name],
      };
    });
  };

  const addCustomPlatform = () => {
    const trimmed = customInput.trim();
    if (!trimmed || trimmed.length > 25) return;
    setState((prev) => {
      if (prev.customPlatforms.includes(trimmed)) return prev;
      return { ...prev, customPlatforms: [...prev.customPlatforms, trimmed] };
    });
    setCustomInput("");
  };

  const removeCustomPlatform = (name) => {
    setState((prev) => ({
      ...prev,
      customPlatforms: prev.customPlatforms.filter((c) => c !== name),
      selectedPlatforms: prev.selectedPlatforms.filter((p) => p !== name),
    }));
  };

  const setGoal = (g) => setState((prev) => ({ ...prev, goal: g }));

  const { goal, selectedPlatforms, customPlatforms, notificationsOn, progress } =
    state;

  const resetProgress = () => {
    const updated = { ...state, progress: 0 };
    setState(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.removeItem("learningProgress");
    window.dispatchEvent(new Event("progressReset"));
  };

  return (
    <div className="profile-container">
      {/* ✅ Бургер меню */}
      <BurgerMenu />

      <div className="profile-header">
        <img
          src={
            tgUser?.photo_url ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          alt="avatar"
          className="avatar"
        />
        <h2 className="nickname">{tgUser?.first_name || "Пользователь"}</h2>
      </div>

      {/* Прогресс */}
      <div className="progress-section">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="progress-reset">
        <button onClick={resetProgress}>Сбросить прогресс</button>
      </div>

      <div className="settings">
        {/* Цель */}
        <div className="setting-item">
          <label>Цель обучения</label>
          <div className="goal-options">
            {["Личное пользование", "Перепродажа", "Оптовые закупки"].map(
              (opt) => (
                <div
                  key={opt}
                  className={`goal-card ${goal === opt ? "selected" : ""}`}
                  onClick={() => setGoal(opt)}
                >
                  {opt}
                </div>
              )
            )}
          </div>
        </div>

        {/* Площадки */}
        <div className="setting-item">
          <label>Предпочитаемые площадки</label>
          <div className="platform-options">
            {mainPlatforms.map((name) => (
              <div
                key={name}
                className={`platform-item ${
                  selectedPlatforms.includes(name) ? "selected" : ""
                }`}
                onClick={() => togglePlatform(name)}
              >
                <span className="platform-name">{name}</span>
              </div>
            ))}

            {customPlatforms.map((name) => (
              <div
                key={name}
                className={`platform-item ${
                  selectedPlatforms.includes(name) ? "selected" : ""
                }`}
                onClick={() => togglePlatform(name)}
              >
                <span className="platform-name">{name}</span>
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCustomPlatform(name);
                  }}
                  aria-label={`Удалить ${name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="custom-platform">
            <input
              type="text"
              placeholder="Своя площадка (макс 25 символов)"
              value={customInput}
              maxLength={25}
              onChange={(e) => setCustomInput(e.target.value.slice(0, 25))}
            />
            <button onClick={addCustomPlatform}>Добавить</button>
          </div>
        </div>

        {/* Уведомления */}
        <div className="setting-item toggle">
          <label>Уведомления</label>
          <div
            className={`toggle-switch ${notificationsOn ? "on" : ""}`}
            onClick={toggleNotifications}
            role="switch"
            aria-checked={notificationsOn}
          >
            <div className="toggle-circle" />
          </div>
        </div>
      </div>

      <button className="exit-btn" onClick={() => (window.location.href = "/")}>
        В главное меню
      </button>
    </div>
  );
}
