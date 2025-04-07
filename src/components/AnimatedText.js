import React from 'react';
import { motion } from 'framer-motion';
import '../styles/AnimatedText.css';

const AnimatedTextCharacter = ({ text, className = "", stagger = 0.05, delay = 0 }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.div
      className={`animated-text-container ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text} // Accessibility
    >
      {letters.map((letter, index) => (
        <motion.span key={`${letter}-${index}`} variants={child} className="animated-letter">
          {/* Replace space with non-breaking space for layout */}
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};


// Optional: Word animation (if needed later)
const AnimatedTextWord = ({ text, className="", stagger = 0.2, delay = 0 }) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: stagger, delayChildren: delay * i },
        }),
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 30, // Slightly larger jump for words
            filter: "blur(5px)", // Add blur effect
            transition: { type: "spring", damping: 15, stiffness: 100 },
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring", damping: 15, stiffness: 100 },
        },
    };

    return (
        <motion.div
            className={`animated-text-container ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
            aria-label={text}
            style={{ display: 'flex', flexWrap: 'wrap' }} // Ensure words wrap correctly
        >
            {words.map((word, index) => (
                <motion.span
                    key={`${word}-${index}`}
                    variants={child}
                    style={{ marginRight: '0.5em', display: 'inline-block' }} // Add space between words
                    className="animated-word"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};


export { AnimatedTextCharacter, AnimatedTextWord };