// *** 1. TYPES & INTERFACES ***
interface snakeInter {
  x: number;
  y: number;
}
type Direction = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

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
let snakeDirection: Direction = "ArrowDown";
let lastExecutedDirection: Direction = "ArrowDown";

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

// Render Snake
function renderSnake(snakeSegments: snakeInter[]) {
  snakeSegments.forEach((segment) => {
    const renderingPos = `${segment.y}-${segment.x}`;
    const targetCell = cellCoordinate[renderingPos];
    if (targetCell) {
      targetCell.classList.add("snake");
    }
  });
}

// Navigating the snake
function snakeNavigation() {
  window.addEventListener("keydown", (evt) => {
    switch (evt.key) {
      case "ArrowUp":
        if (lastExecutedDirection !== "ArrowDown") snakeDirection = "ArrowUp";
        break;
      case "ArrowDown":
        if (lastExecutedDirection !== "ArrowUp") snakeDirection = "ArrowDown";
        break;
      case "ArrowLeft":
        if (lastExecutedDirection !== "ArrowRight") snakeDirection = "ArrowLeft";
        break;
      case "ArrowRight":
        if (lastExecutedDirection !== "ArrowLeft") snakeDirection = "ArrowRight";
        break;
    }
  });
}

snakeNavigation();

// Move the snake
const snakeMovement = setInterval(() => {
  const snakeHead = snake[0];

  if (snake.length > 0 && snakeHead) {
    let dx = 0;
    let dy = 0;

    switch (snakeDirection) {
      case "ArrowUp":
        dy = -1;
        break;
      case "ArrowDown":
        dy = 1;
        break;
      case "ArrowRight":
        dx = 1;
        break;
      case "ArrowLeft":
        dx = -1;
        break;
    }

    snake.unshift({
      x: snakeHead.x + dx,
      y: snakeHead.y + dy,
    });
    const snakeTail = snake.pop();
    if (snakeTail) {
      const tailPos = `${snakeTail.y}-${snakeTail.x}`;
      cellCoordinate[tailPos]?.classList.remove("snake");
    }
  }

  lastExecutedDirection = snakeDirection;
  renderSnake(snake);
}, 300);

// *** 7. INITIAL EXECUTION ***
renderSnake(snake);
