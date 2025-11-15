import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

export default function Header({ setActive }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleInstall = async () => {
    const dp = window.deferredPrompt;
    if (dp) {
      dp.prompt();
      const choice = await dp.userChoice;
      if (choice.outcome === 'accepted') {
        console.log('App installed');
      }
      window.deferredPrompt = null;
    } else {
      // give user guidance
      alert('Install not available — open site in Chrome and use Add to Home screen / Install option.');
    }
  };

  return (
    <header className="header">
      <h1>Productivity App</h1>
      <div className="controls">
        <button className="tab-btn" onClick={() => setActive('workout')}>Workout</button>
        <button className="tab-btn" onClick={() => setActive('products')}>Products</button>
        <button className="theme-btn" onClick={toggleTheme}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
        <button className="install-btn" onClick={handleInstall}>Install App</button>
      </div>
    </header>
  );
}
