const MAX_ROW = 6;
const MAX_COL = 7;
const WINNER_SOLUTION = 4;
const gameBoard = document.getElementById('game-board');
const gameArray = [];
let currentPlayer = 1;
let winnerFound = 1;
let isTrue = false;
const vectorCoordinates = [[0, 1], [1, 0], [1, 1], [1, -1]];

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
        changeColourForPlayer(div, row, col, currentPlayer);
        if (checkWin('R')) {
            showWinnerMessage(currentPlayer);
            createRestartButton();
        } else {
            playerTurnText(currentPlayer);
        }
    } else if (currentPlayer === 2 && winnerFound !== 0) {
        changeColourForPlayer(div, row, col, currentPlayer);
        if (checkWin('G')) {
            showWinnerMessage(currentPlayer);
            createRestartButton();
        } else {
            playerTurnText(currentPlayer);
        }
    }
}

function checkColor(div) {
    return window.getComputedStyle(div).backgroundColor === 'rgb(255, 255, 255)';
}

function playerTurnText(playerTurn) {
    if (playerTurn === 1) {
        currentPlayer = 2;
    } else {
        currentPlayer = 1;
    }
    let playerText = document.getElementById('player-move');
    playerText.innerHTML = 'Player move: Player ' + currentPlayer;
}

function checkWin(player) {
    for (let row = 0; row < MAX_ROW; ++row) {
        for (let col = 0; col < MAX_COL; ++col) {
            if (gameArray[row][col] !== player) {
                continue;
            }
            for (const [x, y] of vectorCoordinates) {
                verifyWinner(row, col, x, y)
            }
            if (isTrue === true) {
                isTrue = false;
                return true;
            }
        }   
    }
    return false;
}

function changeColourForPlayer(player, row, col, playerTurn) {
    if (playerTurn === 2) {
        player.style.backgroundColor ="rgb(255, 255, 0)";
        gameArray[row][col] = 'G';
    } else {
        player.style.backgroundColor ="rgb(255, 0, 0)";
        gameArray[row][col] = 'R';
    }
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
    if (gameArray[row][col] === 
        gameArray[row + (1 * rowIndex)][col + (1 * colIndex)] &&
        gameArray[row][col] === 
        gameArray[row + (2 * rowIndex)][col + (2 * colIndex)] &&
        gameArray[row][col] === 
        gameArray[row + (3 * rowIndex)][col + (3 * colIndex)]) {
        isTrue = true;
        return true;
    }
}

function showWinnerMessage(playerTurn) {
    document.getElementById('player-move').innerHTML = 'Player ' + playerTurn + ' WON!';
    winnerFound = 0;
}

function startNewGame() {
    location.reload()
}