import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Add Router imports

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import FunZoneLanding from './components/FunZoneLanding'; 
import Footer from './components/Footer';
import Overlay from './components/Overlay';
import ParticlesBg from './components/ParticlesBg';

import TicTacToe from './components/fun-zone/TicTacToe';

import './styles/App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App">
          <AnimatePresence>
              {loading && <Overlay />}
          </AnimatePresence>

          <ParticlesBg />

          {!loading && <Header />}

          <Routes>
            <Route path="/" element={
              <main>
                <Home />
                <About />
                <Projects />
                <FunZoneLanding />
                <Contact />
              </main>
            } />
            <Route path="/fun-zone/tic-tac-toe" element={<TicTacToe />} />
          </Routes>

          {!loading && <Footer />}
      </div>
    </Router>
  );
}

export default App;