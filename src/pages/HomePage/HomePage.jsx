import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className='home-container'>
      <div className='background-logo' aria-hidden='true'></div>

      <div className='burger' onClick={() => setMenuOpen(!menuOpen)}>
        <div></div><div></div><div></div>
      </div>

      {menuOpen && <div className='overlay' onClick={() => setMenuOpen(false)}></div>}

      <nav className={side-menu }>
        <ul>
          <li><Link to='/learning'>Обучение</Link></li>
          <li><Link to='/assistant'>ИИ-ассистент</Link></li>
          <li><Link to='/profile'>Профиль</Link></li>
          <li><Link to='/settings'>Настройки</Link></li>
          <li><Link to='/exit'>Выход</Link></li>
        </ul>
      </nav>

      <main className='main-content'>
        <h1>ChinaOrderBot</h1>
        <p className='subtitle'>Обучение через практику</p>

        <div className='buttons'>
          <Link to='/learning'><button>Обучение</button></Link>
          <Link to='/assistant'><button>ИИ-ассистент</button></Link>
          <Link to='/exit'><button>Выйти</button></Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
