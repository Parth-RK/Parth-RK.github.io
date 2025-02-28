import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Overlay.css';

const Overlay = () => {
  return (
    <motion.div className="overlay-container">
      <motion.div
        className="overlay first"
        initial={{ top: 0 }}
        animate={{ top: "-100%" }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
      />
      <motion.div
        className="overlay second"
        initial={{ top: 0 }}
        animate={{ top: "-100%" }}
        transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
      />
      <motion.div
        className="overlay third"
        initial={{ top: 0 }}
        animate={{ top: "-100%" }}
        transition={{ duration: 1.2, delay: 0.9, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="loading-text"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <motion.div 
          className="initials"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          PRK
        </motion.div>
        <motion.div 
          className="loading-bar"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Overlay;