import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGamepad, FaShapes, FaPaintBrush, FaBrain } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/FunZoneLanding.css';

const funZoneItems = [
  {
    id: 'tic-tac-toe',
    title: 'Quantum Tic-Tac-Toe',
    description: 'Classic game, reimagined with glowing visuals and smooth animations. Only the last 3 moves persist!',
    icon: <FaGamepad />,
    path: '/fun-zone/tic-tac-toe',
    status: 'Play Now'
  },
  {
    id: 'physics-sandbox',
    title: 'Gravity Lab',
    description: 'A mini 2D physics sandbox. Drag, drop, and watch simple shapes interact.',
    icon: <FaShapes />,
    path: '/fun-zone/physics-sandbox',
    status: 'Concept'
  },
  {
    id: 'generative-art',
    title: 'Pixel Canvas',
    description: 'Create unique generative art with interactive brushes and particle effects.',
    icon: <FaPaintBrush />,
    path: '/fun-zone/generative-art', // Updated path for routing
    status: 'Concept'
  },
   {
    id: 'memory-game',
    title: 'Circuit Match',
    description: 'Test your memory matching futuristic icons in this sleek card game.',
    icon: <FaBrain />, // Or FaPuzzlePiece
    path: '/fun-zone/memory-game', // Updated path for routing
    status: 'Concept'
  },
  // Add more concepts here
];

const FunZoneLanding = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.1 } }
  };

  const gridVariants = {
    hidden: {}, // Children handle their own opacity
    visible: {
        transition: { staggerChildren: 0.1 } // Stagger card appearance
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    hover: {
      y: -8,
      scale: 1.03,
      boxShadow: "0 10px 30px var(--shadow-color)", // More pronounced shadow
      borderColor: "var(--primary-glow)", // Glowing border
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const buttonVariants = {
      rest: { scale: 1 },
      hover: { scale: 1.05, backgroundColor: "var(--primary-glow)", color: "var(--background-dark)"},
      tap: { scale: 0.95 }
  }

  return (
    <motion.section
      id="fun-zone" // Use this ID for navigation
      className="funzone-section"
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container funzone-container">
        <motion.h2 className="funzone-title section-title" variants={titleVariants}>
          <span className="highlight">Fun</span> Zone
        </motion.h2>
        <motion.p className="funzone-description" variants={descriptionVariants}>
          Take a break and explore some interactive experiments and mini-games.
        </motion.p>

        <motion.div className="game-selection-grid" variants={gridVariants}>
          {funZoneItems.map((item) => (
            <motion.div
              key={item.id}
              className="game-card glass-card" // Re-use glass-card base
              variants={cardVariants}
              whileHover="hover"
              layout // Animate layout changes if grid reflows
            >
              <div className="game-card-icon">{item.icon}</div>
              <h3 className="game-card-title">{item.title}</h3>
              <p className="game-card-description">{item.description}</p>
              <motion.div
                className="game-card-button-wrapper"
              >
                {item.status === 'Play Now' ? (
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link to={item.path} className="game-card-button">
                      {item.status}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    className="game-card-button disabled"
                    aria-disabled={true}
                  >
                    {item.status}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FunZoneLanding;