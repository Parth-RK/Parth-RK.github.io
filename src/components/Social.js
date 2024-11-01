// src/components/Social.js
import React from 'react';

const Social = () => {
  return (
    <div className="home__social">
      <a href="https://github.com/YourUsername" className="home__social-icon" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-github"></i>
      </a>
      <a href="https://linkedin.com/in/YourUsername" className="home__social-icon" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-linkedin"></i>
      </a>
      <a href="mailto:your.email@example.com" className="home__social-icon">
        <i className="fas fa-envelope"></i>
      </a>
    </div>
  );
};

export default Social;