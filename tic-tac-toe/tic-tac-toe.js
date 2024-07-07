const container = document.querySelector('.container');
const message = document.querySelector('.message');
let currentPlayer = 'X';
let playerMoves = { 'X': [], 'O': [] };
let gameHistory = [];
let gameOver = false;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin(player) {
    const indices = playerMoves[player].map(cell => parseInt(cell.getAttribute('data-index')));
    return winningCombinations.some(combination => 
        combination.every(index => indices.includes(index))
    );
}

function resetGame() {
    currentPlayer = 'X';
    playerMoves = { 'X': [], 'O': [] };
    gameHistory = [];
    message.textContent = '';
    container.style.pointerEvents = 'auto';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('fading', 'X', 'O');
    });
    document.getElementById('currentPlayer').textContent = currentPlayer;
}

function undoMove() {
    if (gameHistory.length > 0 && !gameOver) {
        const lastMove = gameHistory.pop();
        const cell = lastMove.cell;
        const player = lastMove.player;

        cell.textContent = '';
        cell.classList.remove(player);

        playerMoves[player] = playerMoves[player].filter((cell) => cell !== lastMove.cell);

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('currentPlayer').textContent = currentPlayer;

        message.textContent = '';
        container.style.pointerEvents = 'auto';
        
    }
    else{
        if(gameOver){
            const lastMove = gameHistory.pop();
        const cell = lastMove.cell;
        const player = lastMove.player;

        
        cell.textContent = '';
        cell.classList.remove(player);

        
        playerMoves[player] = playerMoves[player].filter((cell) => cell !== lastMove.cell);

        message.textContent = '';
        container.style.pointerEvents = 'auto';
        gameOver = false;
        }
    }
}

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell') && !e.target.textContent && !message.textContent) {
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer);
        playerMoves[currentPlayer].push(e.target);

        gameHistory.push({
            player: currentPlayer,
            cell: e.target,
            index: parseInt(e.target.getAttribute('data-index')),
            });

        if (playerMoves[currentPlayer].length > 3) {
            const firstMove = playerMoves[currentPlayer].shift();
            firstMove.textContent = '';
            firstMove.classList.remove('X', 'O', 'fading');
        }

        if (playerMoves[currentPlayer].length >= 2) {
            playerMoves[currentPlayer][playerMoves[currentPlayer].length - 2].classList.remove('fading');
        }

        if (playerMoves[currentPlayer].length > 2) {
            playerMoves[currentPlayer][0].classList.add('fading');
        }

        if (checkWin(currentPlayer)) {
            message.textContent = `Player ${currentPlayer} wins!`;
            container.style.pointerEvents = 'none';
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('currentPlayer').textContent = currentPlayer;
        }
    }
});
