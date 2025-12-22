import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Overlay from './components/Overlay';
import ParticlesBg from './components/ParticlesBg';
import ScrollToHashElement from './components/ScrollToHashElement';

import './styles/App.css';

const FunZoneModal = React.lazy(() => import('./components/FunZoneModal'));

function App() {
  const [loading, setLoading] = useState(true);
  const [showFunZone, setShowFunZone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToHashElement />
      <div className="App">
          <AnimatePresence>
              {loading && <Overlay />}
          </AnimatePresence>

          <ParticlesBg />

          {!loading && <Header onOpenFunZone={() => setShowFunZone(true)} />}

          <Routes>
            <Route path="/" element={
              <main>
                <Home />
                <About />
                <Projects />
                <Contact />
              </main>
            } />
          </Routes>

          <AnimatePresence>
            {showFunZone && (
              <Suspense fallback={null}>
                <FunZoneModal onClose={() => setShowFunZone(false)} />
              </Suspense>
            )}
          </AnimatePresence>

          {!loading && <Footer />}
      </div>
    </Router>
  );
}

export default App;