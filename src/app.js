import './styles/style.css';
import GameOfLife from './life.js';

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

// Game state
let isRunning = false;
let intervalId = null;
const game = new GameOfLife(ROWS, COLS);

// DOM Elements
const gridContainer = document.getElementById('gridContainer');
const startButton = document.getElementById('start');
const clearButton = document.getElementById('clear');

// Initialize the game grid
function initializeGrid() {
  // Create a table element
  const table = document.createElement('table');
  const { rows, cols } = game.getDimensions();
  
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('tr');
    
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('td');
      cell.classList.add('dead');
      cell.dataset.row = i;
      cell.dataset.col = j;
      
      // Toggle cell state on click
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
  const currentState = game.getCell(row, col);
  game.setCell(row, col, currentState === 0 ? 1 : 0);
  updateCellDisplay(row, col);
}

// Update cell display based on state
function updateCellDisplay(row, col) {
  const cell = document.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
  if (game.getCell(row, col) === 1) {
    cell.classList.remove('dead');
    cell.classList.add('live');
  } else {
    cell.classList.remove('live');
    cell.classList.add('dead');
  }
}

// Update display to match the current grid state
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
  game.computeNextGen();
  updateDisplay();
}

// Start/pause game simulation
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

// Clear the grid
function clearGrid() {
  // Stop the simulation if it's running
  if (isRunning) {
    toggleSimulation();
  }
  
  // Reset all cells to the dead state
  game.resetGrids();
  updateDisplay();
}

// Event listeners
startButton.addEventListener('click', toggleSimulation);
clearButton.addEventListener('click', clearGrid);

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
  // Space bar to toggle simulation
  if (event.code === 'Space') {
    event.preventDefault(); // Prevent page scroll
    toggleSimulation();
  }
  
  // Delete key to clear grid
  if (event.code === 'Delete') {
    clearGrid();
  }
});

// Initialize the game
initializeGrid();
