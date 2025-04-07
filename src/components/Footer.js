import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import '../styles/Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

   const iconVariants = {
    hover: { scale: 1.2, y: -3, color: "var(--primary-glow)" },
    tap: { scale: 0.9 }
  };

  return (
    <motion.footer
        className="footer"
        variants={footerVariants}
        initial="hidden"
        whileInView="visible" // Animate when footer comes into view
        viewport={{ once: true, amount: 0.2 }} // Trigger once
    >
      <div className="container footer-container">
        <div className="footer-social-links">
          <motion.a
            href="https://github.com/Parth-RK"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/parth-rk"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="mailto:katkeparth@gmail.com"
            className="footer-social-icon"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Send Email"
          >
            <MdEmail />
          </motion.a>
        </div>
        <div className="footer-copy">
          Designed & Built by Parth R. Katke
          <br />
          © {year} All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;