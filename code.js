document.getElementById('message').innerHTML = 'X Turn';

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let winner = null;
    let gameOver = false;

    const checkWinner = () => {
        const winningMoves = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        winningMoves.forEach(moves => {
            const [a, b, c] = moves;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                winner = board[a];
                gameOver = true;
            }
        });

        if (!board.includes('') && !winner) {
            winner = 'Tie';
            gameOver = true;
        }
    };

    const play = (index) => {
        if (gameOver || board[index]) return;
        board[index] = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('message').innerHTML = gameOver ? `${winner} Wins!` : `${currentPlayer} Turn`;
    };

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        winner = null;
        gameOver = false;
        document.getElementById('message').innerHTML = `${currentPlayer} Turn`;
    };

    const getBoard = () => board;

    return { play, reset, getBoard }; 
})();

const displayController = (() => {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            gameBoard.play(index);
            render();
        });
    });

    const render = () => {
        const board = gameBoard.getBoard();
        board.forEach((player, index) => {
            cells[index].innerHTML = player;
        });
    };

    document.getElementById('reset').addEventListener('click', () => {
        gameBoard.reset();
        render();
    });
    render();
});

displayController();