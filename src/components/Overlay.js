import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Overlay.css';

const Overlay = () => {
  const overlayVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 0,
      transition: { duration: 0.8, delay: 1.5, ease: "easeInOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: [0, 1, 1, 0], // Fade in, stay, fade out
      scale: [0.8, 1.1, 1, 0.8], // Scale up, settle, scale down
      transition: {
        duration: 1.5, // Total duration for the text animation
        times: [0, 0.3, 0.8, 1], // Timing for opacity/scale stages
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="overlay-container"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      style={{ pointerEvents: 'none' }} // Ensure it doesn't block interaction after fade
    >
      <div className="overlay-background"></div>
      <motion.div
        className="loading-content"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="loading-initials">PRK</span>
         {/* Optional: Add a subtle loading indicator if desired */}
         {/* <div className="loading-spinner"></div> */}
      </motion.div>
    </motion.div>
  );
};

export default Overlay;