import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';
import FunZoneLanding from './FunZoneLanding';
import '../styles/FunZoneModal.css';

const TicTacToe = React.lazy(() => import('./fun-zone/TicTacToe'));

const FunZoneModal = ({ onClose }) => {
  const [currentView, setCurrentView] = useState('landing');

  const handleGameSelect = (gameId) => {
    setCurrentView(gameId);
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

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
            {currentView === 'landing' && (
              <motion.div 
                key="landing"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="fun-zone-view"
              >
                <FunZoneLanding onGameSelect={handleGameSelect} />
              </motion.div>
            )}

            {currentView === 'tic-tac-toe' && (
              <motion.div 
                key="tic-tac-toe"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="fun-zone-view game-view"
              >
                <Suspense fallback={<div className="loading-game">Loading Game...</div>}>
                  <TicTacToe onBack={handleBackToLanding} />
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
