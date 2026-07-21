const gameBoard = document.querySelector("#gameBoard") as HTMLElement;
const gridSize = 15
const totalCell = gridSize * gridSize

if (!gameBoard) {
  throw new Error("Element not found in DOM!");
}

gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

const fragment = document.createDocumentFragment();

for(let i = 0; i < totalCell; i++) {
    const singleCell = document.createElement("div");
    singleCell.classList.add("cell");

    fragment.appendChild(singleCell);
}
 
gameBoard.appendChild(fragment)