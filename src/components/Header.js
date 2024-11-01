import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        <div className="nav__logo"></div>
        
        <div 
          id="nav-toggle" 
          className="nav__toggle" 
          onClick={toggleMenu}
        >
          ☰
        </div>

        <div 
          id="nav-menu" 
          className={`nav__menu ${isMenuOpen ? 'show' : ''}`}
        >
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">Home</Link>
            </li>
            <li className="nav__item">
              <Link to="/about" className="nav__link">About</Link>
            </li>
            <li className="nav__item">
              <a 
                href="/tic-tac-toe/tic-tac-toe.html" 
                className="nav__link" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Fun Zone
              </a>
            </li>
            <li className="nav__item">
              <Link to="/blog" className="nav__link">Blog</Link>
            </li>
            <li className="nav__item">
              <Link to="/projects" className="nav__link">Projects</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;