import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
    { name: 'Fun Zone', href: 'tic-tac-toe/tic-tac-toe.html' },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header 
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="header-container">
        <motion.a 
          href="#home"
          className="logo"
          whileHover={{ scale: 1.1 }}
        >
          <span>PRK</span>
        </motion.a>

        <div 
          className="mobile-menu-btn" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>

        <motion.ul 
          className={`nav-menu ${menuOpen ? 'active' : ''}`}
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item, index) => (
            <motion.li 
              key={index}
              className="nav-item" 
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href={item.href} 
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.header>
  );
};

export default Header;