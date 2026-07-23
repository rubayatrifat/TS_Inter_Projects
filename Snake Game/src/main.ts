// Element validation
function getElement<T extends HTMLElement>(selector: string) {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Element not found ${selector}`);
  }
  return element;
}

// Necessary HTML elements
const gameBoard = getElement<HTMLDivElement>("#gameBoard");


// Setting up the grid in css
const gridCellCount = 15;
gameBoard.style.gridTemplateColumns = `repeat(${gridCellCount}, 1fr)`;
gameBoard.style.gridTemplateRows = `repeat(${gridCellCount}, 1fr)`;

// Loading the grid
const fragment = document.createDocumentFragment();
const cellCoordinate: Record<string, HTMLDivElement> = {};

for (let row = 0; row < gridCellCount; row++) {
  for (let column = 0; column < gridCellCount; column++) {
    const singleCell = document.createElement("div");
    singleCell.classList.add("cell");
    cellCoordinate[`${row}-${column}`] = singleCell;
    fragment.appendChild(singleCell);
  }
}

console.log(cellCoordinate);
gameBoard.appendChild(fragment);
