import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BurgerMenu from "../../components/BurgerMenu";

import "./TrackCheckPage.css";

const STORAGE_KEY = "chinaorder_parcels";

const TrackCheckPage = () => {
  const [parcels, setParcels] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Загружаем сохранённые посылки
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setParcels(saved);
  }, []);

  // Сохраняем изменения
  const saveParcels = (list) => {
    setParcels(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  // Добавление новой посылки
  const addParcel = () => {
    if (!name.trim()) return;
    if (parcels.length >= 30) {
      alert("Максимум 30 посылок!");
      return;
    }
    if (name.length > 40) {
      alert("Название не должно превышать 40 символов!");
      return;
    }

    const newParcel = {
      id: Date.now(),
      name,
      leftTracks: [],
      rightTracks: [],
    };

    const updated = [...parcels, newParcel];
    saveParcels(updated);
    setName("");
  };

  // Удаление посылки
  const removeParcel = (id) => {
    const confirmDelete = window.confirm("Удалить эту посылку?");
    if (confirmDelete) {
      const updated = parcels.filter((p) => p.id !== id);
      saveParcels(updated);
    }
  };

  return (
    <div className="trackcheck-container">
      {/* ✅ бургер-меню сверху */}
      <BurgerMenu />

      <h2>Сверка трек-номеров</h2>

      <div className="input-row">
        <input
          type="text"
          placeholder="Введите название посылки..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
        />
        <button className="square-btn add-btn" onClick={addParcel}>
          <span className="btn-symbol">＋</span>
        </button>
      </div>

      <div className="parcel-list">
        {parcels.map((p) => (
          <div key={p.id} className="parcel-item">
            <span
              className="parcel-name"
              onClick={() => navigate(`/parcel/${p.id}`)} // переход к деталям посылки
            >
              {p.name}
            </span>
            <button
              className="square-btn delete-btn"
              onClick={() => removeParcel(p.id)}
            >
              <span className="btn-symbol">✕</span>
            </button>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate("/")}>
        В главное меню
      </button>
    </div>
  );
};

export default TrackCheckPage;
