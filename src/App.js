import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Overlay from './components/Overlay';
import ParticlesBg from './components/ParticlesBg';
import './styles/App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="App">
        <AnimatePresence>
            {loading && <Overlay />}
        </AnimatePresence>

        {/* Fixed Background */}
        <ParticlesBg />

        {/* Header appears after overlay */}
        {!loading && <Header />}

        {/* Main Content Area */}
        <main>
            <Home />
            <About />
            <Projects />
            <Contact />
        </main>

        {/* Footer appears after content */}
        {!loading && <Footer />}
    </div>
  );
}

export default App;