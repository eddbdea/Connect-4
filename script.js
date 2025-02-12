const MAX_ROW = 6;
const MAX_COL = 7;
const WINNER_SOLUTION = 4;
const gameBoard = document.getElementById('game-board');
const gameArray = [];
let currentPlayer = 1;
let elementNumber = 0;
let winner = 0;

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
            colElement.id = 'cl-' + elementNumber;
            ++elementNumber;
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
    if (currentPlayer === 1 && checkColor(div)) {
        div.style.backgroundColor ="rgb(255, 0, 0)";
        gameArray[row][col] = 'R';
        colorElement = gameArray[row][col];
        currentPlayer = 2;
        if (checkWinner(row, col) === true) {
            document.getElementById('player-move').innerHTML = 'Player 1 WON!'
        } else {
            playerTurnText(currentPlayer);
        }
    } else if (currentPlayer === 2 && checkColor(div)) {
        div.style.backgroundColor ="rgb(255, 255, 0)";
        gameArray[row][col] = 'G';
        currentPlayer = 1;
        if (checkWinner(row, col)) {
            document.getElementById('player-move').innerHTML  = 'Player 2 WON!'
        } else {
            playerTurnText(currentPlayer);
        }
    }
    console.log(gameArray);
}

function checkColor(div) {
    return window.getComputedStyle(div).backgroundColor === 'rgb(255, 255, 255)';
}

function playerTurnText(currentPlayer) {
    let playerText = document.getElementById('player-move');
    playerText.innerHTML = 'Player move: Player ' + currentPlayer;
}

function checkWinner(row, col) {
    let copyRow = row;
    let copyCol = col;
    for (let moves = WINNER_SOLUTION; moves >= 1; --moves) { //stanga
        if (gameArray[copyRow][copyCol] != gameArray[row][col]) {
            return false;
        }
        ++winner;
        console.log(gameArray[copyRow][copyCol]);
        console.log(gameArray[row][col]);
        --copyCol;
    }
    console.log(winner);
    if (isWinner(winner)) {
        return true;
    }
    for (let moves = WINNER_SOLUTION; moves >= 1; --moves) { //dreapta
        let copyRow = row;
        let copyCol = col;
        if (gameArray[copyRow][copyCol] === gameArray[row][col]) {
            ++winner;
        }
        ++copyCol;
    }
    if (isWinner(winner)) {
        return true;
    }
    for (let moves = WINNER_SOLUTION; moves >= 1; --moves) { //sus
        let copyRow = row;
        let copyCol = col;
        if (gameArray[copyRow][copyCol] === gameArray[row][col]) {
            ++winner;
        }
        --copyRow;
    }
    if (isWinner(winner)) {
        return true;
    }
    for (let moves = WINNER_SOLUTION; moves => 1; --moves) { //jos
        let copyRow = row;
        let copyCol = col;
        if (gameArray[copyRow][copyCol] === gameArray[row][col]) {
            ++winner;
        }
        ++copyRow;
    }
    if (isWinner(winner)) {
        return true;
    }
    for (let moves = WINNER_SOLUTION; moves >= 1; --moves) { //diagonala stanga sus
        let copyRow = row;
        let copyCol = col;
        if (gameArray[copyRow][copyCol] === gameArray[row][col]) {
            ++winner;
        }
        --copyRow;
        --copyCol;
    }
    if (isWinner(winner)) {
        return true;
    }
    for (let moves = WINNER_SOLUTION; moves >= 1; --moves) { //diagonala dreapta sus
        let copyRow = row;
        let copyCol = col;
        if (gameArray[copyRow][copyCol] === gameArray[row][col]) {
            ++winner;
        }
        ++copyCol;
        --copyRow;
    }
    if (isWinner(winner)) {
        return true;
    }
    for (let moves = WINNER_SOLUTION; moves >= 1; --moves) { //diagonala stanga jos
        let copyRow = row;
        let copyCol = col;
        if (gameArray[copyRow][copyCol] === gameArray[row][col]) {
            ++winner;
        }
        --copyCol;
        ++copyRow;
    }
    if (isWinner(winner)) {
        return true;
    }
    for (let moves = WINNER_SOLUTION; moves >= 1; --moves) { //diagonala dreapta jos
        let copyRow = row;
        let copyCol = col;
        if (gameArray[copyRow][copyCol] === gameArray[row][col]) {
            ++winner;
        }
        ++copyCol;
        ++copyRow;
    }
    if (isWinner(winner)) {
        return true;
    }
    return false;
}

function isWinner(winnerEl) {
    if (winnerEl === WINNER_SOLUTION) {
        return true;
    }
    winner = 0;
}