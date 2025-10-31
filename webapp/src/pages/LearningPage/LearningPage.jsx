import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LearningPage.css';

const modulesData = [
  { id: 1, title: 'Модуль 1', submodules: 9 },
  { id: 2, title: 'Модуль 2', submodules: 5 },
  { id: 3, title: 'Модуль 3', submodules: 5 },
  { id: 4, title: 'Модуль 4', submodules: 6 },
  { id: 5, title: 'Модуль 5', submodules: 4 },
  { id: 6, title: 'Модуль 6', submodules: 15 },
  { id: 7, title: 'Модуль 7', submodules: 10 },
];

export default function LearningPage() {
  const [openModule, setOpenModule] = useState(null);
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('learningProgress');
    return saved ? JSON.parse(saved) : {};
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('learningProgress', JSON.stringify(progress));
  }, [progress]);

  const handleModuleToggle = (id) => {
    setOpenModule(openModule === id ? null : id);
  };

  const handleCompleteModule = (id) => {
    setProgress((prev) => {
      const updated = { ...prev, [id]: true };
      localStorage.setItem('learningProgress', JSON.stringify(updated));
      return updated;
    });
  };

  const totalModules = modulesData.length;
  const completedModules = Object.values(progress).filter(Boolean).length;
  const progressPercent = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="learning-container">
      {/* Прогресс-бар */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="progress-label">
          <span>{completedModules}/{totalModules}</span>
        </div>
      </div>

      {/* Список модулей */}
      <div className="modules-list">
        {modulesData.map((module) => (
          <div key={module.id} className="module">
            <button
              className={`module-btn ${progress[module.id] ? 'completed' : ''}`}
              onClick={() => handleModuleToggle(module.id)}
            >
              {module.title}
            </button>

            {openModule === module.id && (
              <div className="submodules">
                {[...Array(module.submodules)].map((_, i) => (
                  <div key={i} className="submodule">
                    <span>{module.title}.{i + 1}</span>
                  </div>
                ))}
                <button
                  className="test-btn"
                  onClick={() => handleCompleteModule(module.id)}
                >
                  Пройти тест
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Кнопка выхода */}
      <button className="exit-btn" onClick={() => navigate('/')}>
        Выйти
      </button>
    </div>
  );
}
