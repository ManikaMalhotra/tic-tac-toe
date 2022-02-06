// HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

// game constants
const xSymbol = '✖';
const oSymbol = '○';

// game variables
let gameIsLive = true;
let xIsNext = true;

// Functions
const letterToSymbol = (letter) => letter === 'X' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;   

    if (letter === 'X') {
        statusDiv.innerHTML = `${letterToSymbol(letter)} is the winner!`;
    }
    else {
        statusDiv.innerHTML = `<span>${letterToSymbol(letter)} is the winner!</span>`;
    }
}

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topCenter = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleCenter = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomCenter = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];

    // Horizontal cases
    if (topLeft && topLeft === topCenter && topLeft === topRight) {
        handleWin(topLeft);
    }
    else if (middleLeft && middleLeft === middleCenter && middleLeft === middleRight) {
        handleWin(middleLeft);
    }
    else if (bottomLeft && bottomLeft === bottomCenter && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
    }

    // Vertical cases
    else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);
    }
    else if (topCenter && topCenter === middleCenter && topCenter === bottomCenter) {
        handleWin(topCenter);
    }
    else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);
    }

    // Diagonal cases
    else if (topLeft && topLeft === middleCenter && topLeft === bottomRight) {
        handleWin(topLeft);
    }
    else if (topRight && topRight === middleCenter && topRight === bottomLeft) {
        handleWin(topRight);
    }

    // Check for tie
    else if (topLeft && topCenter && topRight && middleLeft && middleCenter && middleRight && bottomLeft && bottomCenter && bottomRight) {
        gameIsLive = false;
        statusDiv.innerHTML = 'A tie!';
    }

    // complement xIsNext
    else {
        xIsNext = !xIsNext;
        
        if (xIsNext) {
            statusDiv.innerHTML = `${xSymbol} is next!`;
        }
        else {
            statusDiv.innerHTML = `<span>${oSymbol} is next!</span>`;
        }
    }
};

// Event Handlers
const handleReset = () => {
    xIsNext = true;
    gameIsLive = true;
    statusDiv.innerHTML = `${xSymbol} is next!`;

    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove('X');
        cellDiv.classList.remove('O');
    }
};

// Adding X or O as class to cell
const handleCellClick = (e) => {
    const classList = e.target.classList;

    // Making sure an element has only an X or an O
    if (!gameIsLive || classList[1] === 'X' || classList[1] === 'O') {
        return;
    }

    if (xIsNext) {
        classList.add('X');
        checkGameStatus();
    }
    else {
        classList.add('O');
        checkGameStatus();
    }
};

// Event Listeners
resetDiv.addEventListener('click', handleReset);

// loop through each of elemnts in cell div
for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick);
}