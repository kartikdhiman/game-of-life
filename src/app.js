import './style.css';
import GameOfLife from './life.js';

/**
 * UI Controller for Game of Life
 */
class GameOfLifeUI {
  constructor(rows = 32, cols = 32, reproductionTime = 100) {
    this.game = new GameOfLife(rows, cols);
    this.playing = false;
    this.timer = null;
    this.reproductionTime = reproductionTime;
  }

  /**
   * Initialize the game UI
   */
  initialize() {
    this.createTable();
    this.setUpControlButtons();
  }

  /**
   * Create the game board table
   */
  createTable() {
    const gridContainer = document.getElementById("gridContainer");
    if (!gridContainer) {
      console.error("Problem: no grid container available");
      return;
    }
    
    const { rows, cols } = this.game.getDimensions();
    const table = document.createElement("table");

    for (let row = 0; row < rows; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < cols; col++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", row + "_" + col);
        cell.setAttribute("class", "dead");
				cell.addEventListener("click", () => this.handleCellClick(cell, row, col));
        tr.appendChild(cell);
      }
      table.appendChild(tr);
    }
    gridContainer.appendChild(table);
  }

  /**
   * Handle cell click events
   * @param {HTMLElement} cell - The cell element
   * @param {Number} row - Row index
   * @param {Number} col - Column index
   */
  handleCellClick(cell, row, col) {
    const isAlive = cell.classList.contains("live");
    
    if (isAlive) {
      cell.setAttribute("class", "dead");
      this.game.setCell(row, col, 0);
    } else {
      cell.setAttribute("class", "live");
      this.game.setCell(row, col, 1);
    }
  }

  /**
   * Update the visual representation of the game grid
   */
  updateView() {
    const { rows, cols } = this.game.getDimensions();
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = document.getElementById(i + "_" + j);
        if (cell) {
          if (this.game.getCell(i, j) === 0)
            cell.setAttribute("class", "dead");
          else
            cell.setAttribute("class", "live");
        }
      }
    }
  }

  /**
   * Set up control buttons event handlers
   */
  setUpControlButtons() {
    const startButton = document.getElementById("start");
    if (startButton) {
      startButton.onclick = this.handleStartButton.bind(this);
    }

    const clearButton = document.getElementById("clear");
    if (clearButton) {
      clearButton.onclick = this.handleClearButton.bind(this);
    }
  }

  /**
   * Clear button handler - resets the game
   */
  handleClearButton() {
    this.playing = false;
    const startButton = document.getElementById("start");
    if (startButton) {
      startButton.innerHTML = "start";
    }
    
    clearTimeout(this.timer);
    this.game.resetGrids();
    this.updateView();
  }

  /**
   * Start/pause button handler
   */
  handleStartButton(event) {
    if (this.playing) {
      this.playing = false;
      event.target.innerHTML = "continue";
      clearTimeout(this.timer);
    } else {
      this.playing = true;
      event.target.innerHTML = "pause";
      this.play();
    }
  }

  /**
   * Advance the game state and update the view
   */
  play() {
    this.game.computeNextGen();
    this.updateView();
    
    if (this.playing) {
      this.timer = setTimeout(() => this.play(), this.reproductionTime);
    }
  }
}

// Start the app when the window loads
window.onload = () => {
  const gameUI = new GameOfLifeUI();
  gameUI.initialize();
};

export default GameOfLifeUI;
