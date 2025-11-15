import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import OfflineBanner from './components/OfflineBanner';
import WorkoutTracker from './components/WorkoutTracker';
import ProductsPanel from './components/ProductsPanel';
import { ThemeContext } from './ThemeContext';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './store/productsSlice';

function App() {
  const [active, setActive] = useState('workout'); // 'workout' or 'products'
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  // load products initially
  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  // handle beforeinstallprompt at app-level to allow Install button to use deferredPrompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  return (
    <div className={`app ${theme}`}>
      <Header setActive={setActive} />
      <OfflineBanner />
      <main className="main-area">
        {active === 'workout' && <WorkoutTracker />}
        {active === 'products' && <ProductsPanel />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
