import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ParcelPage.css";

const STORAGE_KEY = "chinaorder_parcels";

const ParcelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parcel, setParcel] = useState(null);
  const [allParcels, setAllParcels] = useState([]);
  const [leftInput, setLeftInput] = useState("");
  const [rightInput, setRightInput] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const found = saved.find((p) => String(p.id) === String(id));
    setParcel(found);
    setAllParcels(saved);
  }, [id]);

  const saveParcel = (updated) => {
    const updatedList = allParcels.map((p) =>
      p.id === updated.id ? updated : p
    );
    setAllParcels(updatedList);
    setParcel(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  };

  const changeName = (newName) => {
    if (newName.length > 40) return;
    saveParcel({ ...parcel, name: newName });
  };

  // --- 1. Добавление треков (слева) ---
  const addTracksLeft = () => {
    if (!leftInput.trim()) return;
    const newTracks = leftInput
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);
    const existing = parcel.leftTracks || [];
    const merged = [...new Set([...existing, ...newTracks])]; // без дубликатов
    saveParcel({ ...parcel, leftTracks: merged });
    setLeftInput("");
  };

  // --- 2. Добавление треков (справа) ---
  const addTracksRight = () => {
    if (!rightInput.trim()) return;
    const newTracks = rightInput
      .split(/[\n\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);
    const existing = parcel.rightTracks || [];
    const merged = [...new Set([...existing, ...newTracks])];
    saveParcel({ ...parcel, rightTracks: merged });
    setRightInput("");
  };

  // --- 3. Очистить колонку ---
  const clearTracks = (side) => {
    if (side === "left") saveParcel({ ...parcel, leftTracks: [] });
    if (side === "right") saveParcel({ ...parcel, rightTracks: [] });
  };

  // --- 4. Удалить один трек ---
  const removeTrack = (side, index) => {
    const updatedTracks = (parcel[`${side}Tracks`] || []).filter(
      (_, i) => i !== index
    );
    saveParcel({ ...parcel, [`${side}Tracks`]: updatedTracks });
  };

  // --- 5. Сравнение треков ---
  const getComparison = () => {
    const leftTracks = parcel.leftTracks || [];
    const rightTracks = parcel.rightTracks || [];

    const leftKeys = leftTracks.map((t) => t.split(" ")[0]);
    const rightKeys = rightTracks.map((t) => t.split(" ")[0]);

    const rightResults = rightTracks.map((t) => {
      const key = t.split(" ")[0];
      const match = leftKeys.includes(key);
      return { text: t, match };
    });

    // сортировка: совпавшие ↑
    const sortedRight = [
      ...rightResults.filter((r) => r.match),
      ...rightResults.filter((r) => !r.match),
    ];

    const leftResults = leftTracks.map((t) => {
      const key = t.split(" ")[0];
      const match = rightKeys.includes(key);
      return { text: t, match };
    });

    return { leftResults, rightResults: sortedRight };
  };

  if (!parcel) return <p style={{ color: "white" }}>Загрузка...</p>;

  const { leftResults, rightResults } = getComparison();

  return (
    <div className="parcel-container">
      <input
        type="text"
        value={parcel.name}
        onChange={(e) => changeName(e.target.value)}
        className="parcel-title"
      />

      <div className="track-columns">
        {/* Левая колонка */}
        <div className="track-column">
          <h3>Добавить трек-номера</h3>
          <textarea
            value={leftInput}
            onChange={(e) => setLeftInput(e.target.value)}
            placeholder="Вставьте трек-номера (новая строка — новый)"
            rows={5}
          />
          <button className="graphite-btn" onClick={addTracksLeft}>
            Добавить
          </button>
          <button className="graphite-btn clear-btn" onClick={() => clearTracks("left")}>
            Очистить
          </button>

          <div className="track-list">
            {leftResults.map((t, i) => (
              <div
                key={i}
                className={`track-item ${t.match ? "match" : "no-match"}`}
              >
                <span>{t.text}</span>
                <button
                  className="delete-track"
                  onClick={() => removeTrack("left", i)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Правая колонка */}
        <div className="track-column">
          <h3>Сверить трек-номера</h3>
          <textarea
            value={rightInput}
            onChange={(e) => setRightInput(e.target.value)}
            placeholder="Вставьте трек-номера для сверки"
            rows={5}
          />
          <button className="graphite-btn" onClick={addTracksRight}>
            Проверить
          </button>
          <button className="graphite-btn clear-btn" onClick={() => clearTracks("right")}>
            Очистить
          </button>

          <div className="track-list">
            {rightResults.map((t, i) => (
              <div
                key={i}
                className={`track-item ${t.match ? "match" : "no-match"}`}
              >
                <span>{t.text}</span>
                <button
                  className="delete-track"
                  onClick={() => removeTrack("right", i)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Нижние кнопки */}
      <div className="bottom-buttons">
        <button className="graphite-btn small-btn" onClick={() => navigate(-1)}>
          ← Назад
        </button>
        <button className="graphite-btn small-btn" onClick={() => navigate("/")}>
          В меню
        </button>
      </div>
    </div>
  );
};

export default ParcelPage;
