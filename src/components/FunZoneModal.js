import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';
import FunZoneLanding from './FunZoneLanding';
import '../styles/FunZoneModal.css';

// Lazy load game components
const TicTacToe = React.lazy(() => import('./fun-zone/TicTacToe'));
const Browser = React.lazy(() => import('./fun-zone/browser'));

const GAME_COMPONENTS = {
  'tic-tac-toe': TicTacToe,
  'internet': Browser,
  // New games here: 'game-id': Component
};

const FunZoneModal = ({ onClose }) => {
  const [currentView, setCurrentView] = useState('landing');

  const handleGameSelect = (gameId) => {
    if (GAME_COMPONENTS[gameId]) {
      setCurrentView(gameId);
    } else {
      console.warn(`Game component for ${gameId} not found.`);
    }
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  const CurrentGameComponent = GAME_COMPONENTS[currentView];

  return (
    <motion.div 
      className="fun-zone-modal-overlay"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="fun-zone-modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        {currentView !== 'landing' && (
          <button className="modal-back-btn" onClick={handleBackToLanding}>
            <FaArrowLeft /> Back to Arcade
          </button>
        )}

        <div className="fun-zone-scroll-container">
          <AnimatePresence mode="wait">
            {currentView === 'landing' ? (
              <motion.div 
                key="landing"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="fun-zone-view"
              >
                <FunZoneLanding onGameSelect={handleGameSelect} />
              </motion.div>
            ) : (
              <motion.div 
                key={currentView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="fun-zone-view game-view"
              >
                <Suspense fallback={<div className="loading-game">Loading...</div>}>
                  {CurrentGameComponent && <CurrentGameComponent onBack={handleBackToLanding} />}
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default FunZoneModal;