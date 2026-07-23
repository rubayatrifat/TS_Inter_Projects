// *** 1. TYPES & INTERFACES ***
interface snakeInter {
  x: number;
  y: number;
}

// *** 2. HELPER FUNCTIONS & UTILITIES ***
function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }
  return element;
}

// *** 3. CONSTANTS & CONFIGURATIONS ***
const gridCellCount = 15;

// *** 4. DOM TARGETS & GLOBAL STATE ***
const gameBoard = getElement<HTMLDivElement>("#gameBoard");
const cellCoordinate: Record<string, HTMLDivElement> = {};
const cellsFragment = document.createDocumentFragment();

// State
const snake: snakeInter[] = [
  { x: 5, y: 3 },
  { x: 6, y: 3 },
  { x: 7, y: 3 }
];

// *** 5. DOM INITIALIZATION & RENDER LOGIC ***
gameBoard.style.gridTemplateColumns = `repeat(${gridCellCount}, 1fr)`;
gameBoard.style.gridTemplateRows = `repeat(${gridCellCount}, 1fr)`;

// Generating cells
for (let row = 0; row < gridCellCount; row++) {
  for (let column = 0; column < gridCellCount; column++) {
    const singleCell = document.createElement("div");
    singleCell.classList.add("cell");
    cellCoordinate[`${row}-${column}`] = singleCell;
    cellsFragment.appendChild(singleCell);
  }
}
gameBoard.appendChild(cellsFragment);

// *** 6. GAME LOGIC FUNCTIONS ***
function renderSnake(snakeSegments: snakeInter[]) {
  snakeSegments.forEach((segment) => {
    const renderingPos = `${segment.y}-${segment.x}`;
    const targetCell = cellCoordinate[renderingPos];
    if (targetCell) {
      targetCell.classList.add("snake");
    }
  });
}

// *** 7. INITIAL EXECUTION ***
renderSnake(snake);
