const gameBoard = document.querySelector("#gameBoard");
const boardCell = document.querySelector(".cell");

if (!gameBoard || !boardCell) {
  throw new Error("Element not found in DOM!");
}

let gameBoardArea = Math.floor(gameBoard.clientHeight * gameBoard?.clientWidth)
let boardCellArea = Math.floor(boardCell.clientHeight * boardCell?.clientWidth);
let cellCount = Math.floor(gameBoardArea / boardCellArea)

for(let i = 0; i < cellCount; i++) {
    const singleCell = document.createElement("div");
    singleCell.classList.add("cell");

    gameBoard.appendChild(singleCell);
}
