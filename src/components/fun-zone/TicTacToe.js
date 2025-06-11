import React, { useState, useCallback } from 'react';
import styled, { keyframes, createGlobalStyle, ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const theme = {
    primary: '#00A380',
    accent: '#4cyanff', 
    glow: '#00f7ff',
    background: '#0a0f1f',
    backgroundGradient: 'linear-gradient(135deg, #0a0f1f 0%, #1a1f3f 100%)',
    text: '#e0e0ff',
    textDim: '#a0a0cc',
    cellBg: 'rgba(26, 31, 63, 0.7)',
    cellHoverBg: 'rgba(40, 50, 90, 0.9)',
    cellBorder: '#303f70',
    xColor: '#ff33ff',
    oColor: '#33ffff',
    winColor: '#ffff00',
    resetColor: '#ff4d4d',
    resetGlow: '#ff8080',
    undoColor: '#4d79ff',
    undoGlow: '#809fff',
    fontFamily: "'Orbitron', sans-serif",
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.background};
    background-image: ${({ theme }) => theme.backgroundGradient};
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden; /* Prevent horizontal scroll */
    padding: 20px; // Add some padding for smaller screens
  }
`;

// --- 2. Styled Components Definitions ---

const GameWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(20px, 5vw, 40px); // Responsive padding
  background: rgba(10, 15, 31, 0.6);
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.cellBorder};
  box-shadow: 0 0 30px rgba(0, 247, 255, 0.1);
  width: 100%;
  max-width: 1000px; // Increased from 550px to fit title better
  margin: 60px auto 20px; // Added top margin for header clearance
`;

const Header = styled(motion.header)`
  text-align: center;
  margin-bottom: clamp(20px, 4vw, 30px);

  h1 {
    font-size: clamp(2rem, 6vw, 2.8rem);
    color: ${({ theme }) => theme.accent};
    text-shadow: 0 0 10px ${({ theme }) => theme.glow};
    margin-bottom: 10px;
    font-weight: 700;
  }

  p {
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    color: ${({ theme }) => theme.textDim};
    max-width: 450px;
    line-height: 1.5;
  }
`;

const BoardContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  background-color: ${({ theme }) => theme.cellBorder};
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  max-width: 380px;
  aspect-ratio: 1 / 1;
  margin-bottom: clamp(15px, 3vw, 25px);
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.4);
`;

const neonGlow = (color) => keyframes`
  0%, 100% { text-shadow: 0 0 5px ${color}, 0 0 7px ${color}, 0 0 10px ${color}; }
`;

const CellWrapper = styled(motion.div)`
  position: relative;
  background-color: ${({ theme }) => theme.cellBg};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(2rem, 12vw, 4rem);
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  font-weight: bold;
  user-select: none;
  overflow: hidden; // Ensure content doesn't overflow during animation

  &:hover {
    background-color: ${({ theme, disabled }) => (disabled ? theme.cellBg : theme.cellHoverBg)};
    border-color: ${({ theme, disabled }) => (disabled ? 'transparent' : theme.accent)};
  }

  &.X {
    color: ${({ theme }) => theme.xColor};
    animation: ${neonGlow(theme.xColor)} 1.5s ease-in-out infinite alternate;
  }

  &.O {
    color: ${({ theme }) => theme.oColor};
    animation: ${neonGlow(theme.oColor)} 1.5s ease-in-out infinite alternate;
  }

  &.fading {
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
`;

const StatusArea = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: clamp(15px, 4vw, 25px);
  gap: clamp(10px, 2vw, 15px);
`;

const Message = styled(motion.div)`
  font-size: clamp(1.2rem, 3.5vw, 1.4rem);
  min-height: 1.5em;
  font-weight: bold;
  color: ${({ theme }) => theme.winColor};
  text-shadow: 0 0 8px ${({ theme }) => theme.winColor};
  text-align: center;
`;

const TurnIndicator = styled(motion.div)`
  font-size: clamp(1rem, 3vw, 1.1rem);
  color: ${({ theme }) => theme.textDim};
  span {
    font-weight: bold;
    color: ${props => (props.player === 'X' ? props.theme.xColor : props.theme.oColor)};
    text-shadow: 0 0 5px ${props => (props.player === 'X' ? props.theme.xColor : props.theme.oColor)};
    display: inline-block; // Needed for animation key change
  }
`;

const Scoreboard = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 300px;
  font-size: clamp(1rem, 3vw, 1.1rem);
  color: ${({ theme }) => theme.textDim};

  p {
    span {
      font-weight: bold;
      font-size: clamp(1.1rem, 3.5vw, 1.3rem);
      margin-left: 8px;
      display: inline-block; // Needed for animation key change
    }
    &:first-child span { color: ${({ theme }) => theme.xColor}; text-shadow: 0 0 5px ${({ theme }) => theme.xColor}; }
    &:last-child span { color: ${({ theme }) => theme.oColor}; text-shadow: 0 0 5px ${({ theme }) => theme.oColor}; }
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

const StyledButton = styled(motion.button)`
  padding: 12px 25px;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.1s ease;
  position: relative;
  overflow: hidden;

  &.undo {
    background: linear-gradient(135deg, #1a1f3f, ${({ theme }) => theme.undoColor});
    box-shadow: 0 0 10px ${({ theme }) => theme.undoGlow}33, inset 0 1px 2px rgba(255,255,255,0.2); // Subtle initial glow
  }

  &.reset {
    background: linear-gradient(135deg, #1a1f3f, ${({ theme }) => theme.resetColor});
    box-shadow: 0 0 10px ${({ theme }) => theme.resetGlow}33, inset 0 1px 2px rgba(255,255,255,0.2); // Subtle initial glow
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }

  &:not(:disabled)::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
  }

   &:not(:disabled):hover::before {
      opacity: 1;
   }

   &:not(:disabled):hover {
     &.undo { box-shadow: 0 0 15px ${({ theme }) => theme.undoGlow}; }
     &.reset { box-shadow: 0 0 15px ${({ theme }) => theme.resetGlow}; }
   }
`;

// --- 3. Cell Component Definition ---

const cellVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } },
  exit: { scale: 0.5, opacity: 0, transition: { duration: 0.2 } },
};

const Cell = React.memo(({ value, onClick, isFading, disabled }) => {
  const cellContent = value ? (
    <motion.span
      key={value + (isFading ? '-fade' : '')}
      variants={cellVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ display: 'inline-block' }}
    >
      {value}
    </motion.span>
  ) : null;

  return (
    <CellWrapper
      className={`${value ? value : ''} ${isFading ? 'fading' : ''}`}
      onClick={disabled || value ? undefined : onClick}
      whileHover={disabled || value ? {} : { scale: 1.05, zIndex: 1 }}
      whileTap={disabled || value ? {} : { scale: 0.95 }}
      aria-label={`Cell ${value ? `contains ${value}` : 'is empty'}`}
      role="button"
      tabIndex={disabled || value ? -1 : 0}
      disabled={disabled || !!value}
      theme={theme}
    >
      <AnimatePresence mode='wait'>
        {cellContent}
      </AnimatePresence>
    </CellWrapper>
  );
});


// --- 4. Main TicTacToe Component Definition ---

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const initialBoard = Array(9).fill(null);
const initialPlayerMoves = { X: [], O: [] };
const initialHistory = [];
const initialScores = { X: 0, O: 0 };

const TicTacToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [playerMoves, setPlayerMoves] = useState(initialPlayerMoves);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState(initialHistory);
  const [scores, setScores] = useState(initialScores);
  const [moveCount, setMoveCount] = useState(0);

  // --- Game Logic ---
  const checkWin = useCallback((currentMoves) => {
    const indices = currentMoves.map(move => move.index);
    if (indices.length < 3) return false;
    for (const combination of winningCombinations) {
      if (combination.every(index => indices.includes(index))) {
        return true;
      }
    }
    return false;
  }, []);

  const handleCellClick = useCallback((index) => {
    if (board[index] || gameOver) return;

    const newMoveId = moveCount + 1;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const newPlayerMoves = { ...playerMoves };
    const currentPlayerSpecificMoves = [...newPlayerMoves[currentPlayer]];
    currentPlayerSpecificMoves.push({ index, moveId: newMoveId });

    let oldestMoveIndex = -1;
    let fadedPlayer = null;
    if (currentPlayerSpecificMoves.length > 3) {
      const oldestMove = currentPlayerSpecificMoves.shift();
      oldestMoveIndex = oldestMove.index;
      newBoard[oldestMoveIndex] = null;
      fadedPlayer = currentPlayer;
    }

    newPlayerMoves[currentPlayer] = currentPlayerSpecificMoves;

    const moveData = {
        player: currentPlayer,
        index: index,
        boardBefore: [...board],
        playerMovesBefore: JSON.parse(JSON.stringify(playerMoves)),
        fadedMoveInfo: oldestMoveIndex !== -1 ? { index: oldestMoveIndex, player: fadedPlayer } : null,
        moveId: newMoveId,
      };
    const newHistory = [...history, moveData];

    setBoard(newBoard);
    setPlayerMoves(newPlayerMoves);
    setHistory(newHistory);
    setMoveCount(newMoveId);

    if (checkWin(currentPlayerSpecificMoves)) {
      setWinner(currentPlayer);
      setGameOver(true);
      setScores(prevScores => ({
        ...prevScores,
        [currentPlayer]: prevScores[currentPlayer] + 1,
      }));
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }, [board, currentPlayer, gameOver, playerMoves, history, checkWin, moveCount]);

  const resetGame = useCallback(() => {
    setBoard(initialBoard);
    setPlayerMoves(initialPlayerMoves);
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
    setHistory(initialHistory);
    setMoveCount(0);
  }, []);

  const undoMove = useCallback(() => {
      if (history.length === 0) return;

      const lastMove = history[history.length - 1];
      const newHistory = history.slice(0, -1);

      let boardToRestore = [...lastMove.boardBefore];
      if(lastMove.fadedMoveInfo) {
         boardToRestore[lastMove.fadedMoveInfo.index] = lastMove.fadedMoveInfo.player;
      }


      setBoard(boardToRestore);
      setPlayerMoves(JSON.parse(JSON.stringify(lastMove.playerMovesBefore)));
      setCurrentPlayer(lastMove.player);
      setHistory(newHistory);
      setMoveCount(lastMove.moveId - 1);


      if (gameOver) {
        setWinner(null);
        setGameOver(false);
         if (winner) {
            setScores(prevScores => ({
            ...prevScores,
            [lastMove.player]: prevScores[lastMove.player] - 1,
            }));
         }
      }
  }, [history, gameOver, winner]);


  const fadingCellIndices = {};
   if (playerMoves.X.length > 2) fadingCellIndices[playerMoves.X[0].index] = true;
   if (playerMoves.O.length > 2) fadingCellIndices[playerMoves.O[0].index] = true;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.4 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
  };

  const messageVariants = {
     initial: { opacity: 0, y: -10 },
     animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
     exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GameWrapper
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Header variants={itemVariants}>
          <h1>Quantum Tic-Tac-Toe</h1>
          <p>The classic game, unbound by time. Only the last 3 moves persist!</p>
        </Header>

        <BoardContainer variants={itemVariants}>
          {board.map((value, index) => (
            <Cell
              key={index}
              value={value}
              onClick={() => handleCellClick(index)}
              isFading={!!fadingCellIndices[index]}
              disabled={gameOver || !!value}
            />
          ))}
        </BoardContainer>

        <StatusArea variants={itemVariants}>
           <Message>
             <AnimatePresence mode="wait">
              {winner && (
                <motion.div key="winner" {...messageVariants}>
                    Player {winner} Wins!
                </motion.div>
               )}
              </AnimatePresence>
           </Message>
           {!gameOver && (
             <TurnIndicator player={currentPlayer} variants={itemVariants} key={currentPlayer}>
               Current Player: <span>{currentPlayer}</span>
             </TurnIndicator>
            )}
          <Scoreboard variants={itemVariants}>
            <p>X Wins: <span key={`x-${scores.X}`}>{scores.X}</span></p>
            <p>O Wins: <span key={`o-${scores.O}`}>{scores.O}</span></p>
          </Scoreboard>
        </StatusArea>

        <ButtonContainer variants={itemVariants}>
          <StyledButton
            className="undo"
            onClick={undoMove}
            disabled={history.length === 0}
            whileTap={{ scale: 0.95 }}
          >
            Undo
          </StyledButton>
          <StyledButton
            className="reset"
            onClick={resetGame}
            whileTap={{ scale: 0.95 }}
          >
            Reset
          </StyledButton>
        </ButtonContainer>
      </GameWrapper>
    </ThemeProvider>
  );
};

export default TicTacToe;

const footerStyle = document.createElement('style');
footerStyle.textContent = `
  footer {
    width: 100% !important;
    position: relative !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    margin-top: 30px !important;
  }
`;
document.head.appendChild(footerStyle);