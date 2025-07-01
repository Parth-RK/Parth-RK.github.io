import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Header.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
        document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Fun Zone', href: '/fun-zone' },
    { name: 'Contact', href: '#contact' },
  ];

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: 1.8, ease: "easeOut" } // Delay after overlay
    }
  };

  const logoVariants = {
     hover: {
        scale: 1.05,
        textShadow: "0 0 15px var(--shadow-color)",
        transition: { duration: 0.2 }
     }
  };

  const navLinkVariants = {
    hover: {
        color: "var(--primary-glow)",
        y: -2,
        transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const mobileMenuVariants = {
    closed: { x: "100%", transition: { duration: 0.4, ease: "easeInOut" } },
    open: { x: 0, transition: { duration: 0.4, ease: "easeInOut", staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const mobileLinkVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };


  return (
    <motion.header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="header-container container">
        <motion.a
          href="#home"
          className="logo"
          variants={logoVariants}
          whileHover="hover"
          aria-label="Homepage"
        >
          PRK
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <ul className="nav-menu-desktop">
            {navItems.map((item) => (
              <motion.li key={item.name} className="nav-item-desktop">
                <motion.a
                  href={item.href}
                  className="nav-link-desktop"
                  variants={navLinkVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {item.name}
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation Button */}
        <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
        >
             <AnimatePresence mode="wait">
                {menuOpen ? (
                    <motion.div key="times" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                        <FaTimes />
                    </motion.div>
                ) : (
                    <motion.div key="bars" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                        <FaBars />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
            {menuOpen && (
                 <>
                    {/* Backdrop */}
                    <motion.div
                        className="mobile-menu-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMenuOpen(false)}
                     />
                    <motion.nav
                        className="nav-mobile"
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        aria-hidden={!menuOpen}
                    >
                        <ul className="nav-menu-mobile">
                        {navItems.map((item) => (
                            <motion.li key={item.name} variants={mobileLinkVariants}>
                            <a
                                href={item.href}
                                className="nav-link-mobile"
                                onClick={() => setMenuOpen(false)} // Close menu on link click
                            >
                                {item.name}
                            </a>
                            </motion.li>
                        ))}
                        </ul>
                    </motion.nav>
                 </>
            )}
        </AnimatePresence>

      </div>
    </motion.header>
  );
};

export default Header;