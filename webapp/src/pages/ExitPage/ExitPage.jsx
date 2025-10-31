import React from "react";
import "./ExitPage.css";
export default function ExitPage(){
  const confirmExit = () => {
    if(window.confirm("Выйти из мини-приложения?")) {
      try { window.Telegram.WebApp.close(); } catch(e){ window.history.back(); }
    }
  };
  return (<div className="page"><h2>Выход</h2><p>Нажмите, чтобы выйти</p><button onClick={confirmExit}>Выйти</button></div>);
}
