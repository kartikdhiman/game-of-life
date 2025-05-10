import Grid from '../domain/Grid.js';
import Position from '../models/Position.js';
import GameRules from '../services/GameRules.js';

/**
 * Main Game of Life class that coordinates grid and rules
 */
class GameOfLife {
  /**
   * Create a new Game of Life instance
   * @param {number} rows - Number of rows
   * @param {number} cols - Number of columns
   */
  constructor(rows, cols) {
    this.currentGrid = new Grid(rows, cols);
  }

  /**
   * Reset the grid to all dead cells
   */
  resetGrid() {
    this.currentGrid.reset();
  }

  /**
   * Compute the next generation based on Game of Life rules
   */
  computeNextGeneration() {
    const nextGrid = this.currentGrid.clone();
    const { rows, cols } = this.currentGrid.getDimensions();
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const position = new Position(row, col);
        const currentState = this.currentGrid.getCell(position);
        const liveNeighbors = GameRules.countLiveNeighbors(this.currentGrid, position);
        const nextState = GameRules.determineNextState(currentState, liveNeighbors);
        
        nextGrid.setCell(position, nextState);
      }
    }
    
    // Replace current grid with next generation
    this.currentGrid = nextGrid;
  }

  /**
   * Set a cell to a specific state
   * @param {number} row - Row index
   * @param {number} col - Column index
   * @param {number} state - Cell state (use CellState.ALIVE or CellState.DEAD)
   */
  setCell(row, col, state) {
    this.currentGrid.setCell(new Position(row, col), state);
  }

  /**
   * Get the current state of a cell
   * @param {number} row - Row index
   * @param {number} col - Column index
   * @returns {number} - Cell state
   */
  getCell(row, col) {
    return this.currentGrid.getCell(new Position(row, col));
  }

  /**
   * Toggle cell state between alive and dead
   * @param {number} row - Row index
   * @param {number} col - Column index
   * @returns {number} - New state
   */
  toggleCell(row, col) {
    return this.currentGrid.toggleCell(new Position(row, col));
  }

  /**
   * Get the grid dimensions
   * @returns {{rows: number, cols: number}} Grid dimensions
   */
  getDimensions() {
    return this.currentGrid.getDimensions();
  }
}

export { GameOfLife };
