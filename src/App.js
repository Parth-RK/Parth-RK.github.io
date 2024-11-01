import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';

// Import components
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';

// Import styles
import './App.css';

function App() {
  useEffect(() => {
    // Port over GSAP animations
    gsap.to(".first", 1.5, {delay: .5, top: "-100%", ease: "expo.inOut"});
    gsap.to(".second", 1.5, {delay: .7, top: "-100%", ease: "expo.inOut"});
    gsap.to(".third", 1.5, {delay: .9, top: "-100%", ease: "expo.inOut"});

    // Other animations...
    gsap.from('.home__img', {opacity: 0, duration: 2, delay: 2, x: 60});
    gsap.from('.home__information', {opacity: 0, duration: 3, delay: 2.3, y: 25});
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Overlay divs from original HTML */}
        <div className="overlay first"></div>
        <div className="overlay second"></div>
        <div className="overlay third"></div>

        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;