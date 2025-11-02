import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LearningPage from "./pages/LearningPage/LearningPage";
import AssistantPage from "./pages/AssistantPage/AssistantPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import ExitPage from "./pages/ExitPage/ExitPage";
import TrackCheckPage from "./pages/TrackCheckPage/TrackCheckPage";
import ParcelPage from "./pages/ParcelPage/ParcelPage"; // 🆕 добавляем страницу для конкретной посылки

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/exit" element={<ExitPage />} />
        <Route path="/track-check" element={<TrackCheckPage />} />
        <Route path="/parcel/:id" element={<ParcelPage />} /> {/* 🆕 маршрут для страницы посылки */}
      </Routes>
    </Router>
  );
}

export default App;
