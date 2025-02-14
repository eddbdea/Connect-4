const MAX_ROW = 6;
const MAX_COL = 7;
const WINNER_SOLUTION = 4;
const gameBoard = document.getElementById('game-board');
const gameArray = [];
let currentPlayer = 1;
let winnerFound = 1;

function createRows() {
    for (let i = 0; i < MAX_ROW; ++i) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        rowElement.id = 'row' + i;
        gameBoard.appendChild(rowElement);
    }
}

function createCol() {
    for (let row = 0; row < MAX_ROW; ++row) {
        gameArray[row] = [];
        const currentRow = document.getElementById('row' + row);
        for (let col = 0; col < MAX_COL; ++col) {
            gameArray[row][col] = 0;
            const colElement = document.createElement('div');
            colElement.classList.add('col-3', 'circle');
            currentRow.appendChild(colElement);
            colElement.onclick = () => {
                playerTurn(colElement, row, col);
            }
        }
    }
}

createRows();
createCol();

function playerTurn(div, row, col) {
    if (currentPlayer === 1 && checkColor(div) && winnerFound !== 0) {
        changeColourForPlayer1(div, row, col);
        console.log(currentPlayer);
        if (checkWin('R')) {
            document.getElementById('player-move').innerHTML = 'Player 1 WON!';
            winnerFound = 0;
            createRestartButton();
        } else {
            playerTurnText(currentPlayer);
        }
    } else if (currentPlayer === 2 && winnerFound !== 0) {
        changeColourForPlayer2(div, row, col);
        if (checkWin('G')) {
            document.getElementById('player-move').innerHTML  = 'Player 2 WON!';
            winnerFound = 0;
            createRestartButton();
        } else {
            playerTurnText(currentPlayer);
        }
    }
}

function checkColor(div) {
    return window.getComputedStyle(div).backgroundColor === 'rgb(255, 255, 255)';
}

function playerTurnText(currentPlayer) {
    let playerText = document.getElementById('player-move');
    playerText.innerHTML = 'Player move: Player ' + currentPlayer;
}

function checkWin(player) {
    for (let row = 0; row < MAX_ROW; ++row) {
        for (let col = 0; col < MAX_COL; ++col) {
            if (gameArray[row][col] !== player) {
                continue;
            }
            if (col + 3 < MAX_COL && verifyWinner(row, col, 0, 1)) { //horizontal
                return true;
            }
            if (row + 3 < MAX_ROW && verifyWinner(row, col, 1, 0)) { //vertical
                return true;
            }
            if (row + 3 < MAX_ROW && col + 3 < MAX_COL && verifyWinner(row, col, 1, 1)) { //diagonal (top left - bottom right)
                return true;
            }
            if (row + 3 < MAX_ROW && col - 3 <= MAX_COL && verifyWinner(row, col, 1, -1)) { //diagonal (top right - bottom left)
                return true;
            }
        }   
    }
    return false;
}

function changeColourForPlayer2(player, row, col) {
    player.style.backgroundColor ="rgb(255, 255, 0)";
    gameArray[row][col] = 'G';
    currentPlayer = 1;
}

function changeColourForPlayer1(player, row, col) {
    player.style.backgroundColor ="rgb(255, 0, 0)";
    gameArray[row][col] = 'R';
    currentPlayer = 2;
}

function createRestartButton() {
    const restartButton = document.createElement('button');
    document.getElementById('restart-button').appendChild(restartButton);
    restartButton.classList.add('btn', 'btn-success');
    restartButton.textContent = 'Start a new game';
    restartButton.onclick = () => {
        startNewGame();
    }
}

function verifyWinner(row, col, rowIndex, colIndex) {
    return gameArray[row][col] === gameArray[row + (1 * rowIndex)][col + (1 * colIndex)] &&
           gameArray[row][col] === gameArray[row + (2 * rowIndex)][col + (2 * colIndex)] &&
           gameArray[row][col] === gameArray[row + (3 * rowIndex)][col + (3 * colIndex)];
}

function startNewGame() {
    location.reload()
}