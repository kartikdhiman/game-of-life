import './styles/style.css';
import { GameOfLife } from './core/GameOfLife.js';
import CellState from "./models/CellState";

// Game settings
let ROWS, COLS;
if (window.matchMedia("(max-width: 600px)").matches) {
  ROWS = 16;
  COLS = 16;
} else {
  ROWS = 48;
  COLS = 48;
}
const UPDATE_INTERVAL_MS = 150;

let isRunning = false;
let intervalId = null;
const game = new GameOfLife(ROWS, COLS);

const gridContainer = document.getElementById('gridContainer');
const startButton = document.getElementById('start');
const clearButton = document.getElementById('clear');

function initializeGrid() {
  const table = document.createElement('table');
  const { rows, cols } = game.getDimensions();
  
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('tr');
    
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('td');
      cell.classList.add('dead');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', () => toggleCell(i, j));
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  
  gridContainer.innerHTML = '';
  gridContainer.appendChild(table);
}

// Toggle cell state
function toggleCell(row, col) {
  const newState = game.toggleCell(row, col);
  updateCellDisplay(row, col, newState);
}

// Update cell display based on state
function updateCellDisplay(row, col, state = null) {
  const cell = document.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
  if (!cell) return;
  
  // If state is not provided, get it from the game
  const cellState = state !== null ? state : game.getCell(row, col);
  
  if (cellState === CellState.ALIVE) {
    cell.classList.remove('dead');
    cell.classList.add('live');
  } else {
    cell.classList.remove('live');
    cell.classList.add('dead');
  }
}

function updateDisplay() {
  const { rows, cols } = game.getDimensions();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      updateCellDisplay(i, j);
    }
  }
}

// Apply game rules to update the grid
function calculateNextGeneration() {
  game.computeNextGeneration();
  updateDisplay();
}

function toggleSimulation() {
  isRunning = !isRunning;
  
  if (isRunning) {
    intervalId = setInterval(calculateNextGeneration, UPDATE_INTERVAL_MS);
    startButton.querySelector('.icon i').className = 'fas fa-pause';
    startButton.querySelector('.text').textContent = 'pause';
  } else {
    clearInterval(intervalId);
    intervalId = null;
    startButton.querySelector('.icon i').className = 'fas fa-play';
    startButton.querySelector('.text').textContent = 'start';
  }
}

function clearGrid() {
  if (isRunning) {
    toggleSimulation();
  }
  
  // Reset all cells to the dead state
  game.resetGrid();
  updateDisplay();
}

startButton.addEventListener('click', toggleSimulation);
clearButton.addEventListener('click', clearGrid);

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault(); // Prevent page scroll
    toggleSimulation();
  }
  
  if (event.code === 'Delete') {
    clearGrid();
  }
});

// Initialize the game
initializeGrid();
