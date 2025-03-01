import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Overlay from './components/Overlay';
import ParticlesBg from './components/ParticlesBg';
import './styles/App.css';
import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time for initial animation
    setTimeout(() => {
      setLoading(false);
    }, 1800);
  }, []);

  return (
    <>
      <ParticlesBg />
      <div className="app">
        <AnimatePresence>
          {loading ? (
            <Overlay key="overlay" />
          ) : (
            <>
              <Header />
              <motion.main 
                className="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Home />
                <About />
                <Projects />
                <Contact />
              </motion.main>
            </>
          )}
        </AnimatePresence>
      </div>
      
    </>
  );
}

export default App;