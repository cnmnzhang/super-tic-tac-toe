const numRows = 3;
const numCols = 3;
let numEmptyCells = numRows * numCols;
const board = new Array(numEmptyCells);
const markers = ["x", "o"];
let player = 0;
let gameIsOver = false;

let cells = document.querySelectorAll(".cell");

cells.forEach( (cell) => {
    cell.addEventListener("click", game);
});

function game(event) {
    let cell = event.target;
    
}

function toLinearIndex(row, col) {
    return row * numRows + col;
}