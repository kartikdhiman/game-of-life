import CellState from '../models/CellState.js';
import Position from '../models/Position.js';

/**
 * Manages a 2D grid of cells for Game of Life
 */
class Grid {
  /**
   * Create a new grid
   * @param {number} rows - Number of rows
   * @param {number} cols - Number of columns
   */
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.cells = this.#createEmptyGrid();
  }

  /**
   * Get dimensions of the grid
   * @returns {{rows: number, cols: number}} Grid dimensions
   */
  getDimensions() {
    return {
      rows: this.rows,
      cols: this.cols
    };
  }

  /**
   * Get the state of a cell
   * @param {Position} position - Cell position
   * @returns {number} - Cell state (CellState.ALIVE or CellState.DEAD)
   */
  getCell(position) {
    if (!position.isInBounds(this.rows, this.cols)) {
      return CellState.DEAD;
    }
    return this.cells[position.row][position.col];
  }

  /**
   * Set the state of a cell
   * @param {Position} position - Cell position
   * @param {number} state - New state (CellState.ALIVE or CellState.DEAD)
   */
  setCell(position, state) {
    if (position.isInBounds(this.rows, this.cols)) {
      this.cells[position.row][position.col] = state;
    }
  }

  /**
   * Toggle the state of a cell
   * @param {Position} position - Cell position
   * @returns {number} - New state
   */
  toggleCell(position) {
    if (position.isInBounds(this.rows, this.cols)) {
      const currentState = this.getCell(position);
      const newState = CellState.toggle(currentState);
      this.setCell(position, newState);
      return newState;
    }
    return CellState.DEAD;
  }


  /**
   * Reset all cells to the dead state
   */
  reset() {
    this.cells = this.#createEmptyGrid();
  }

  /**
   * Create a copy of the current grid
   * @returns {Grid} - New grid with same state
   */
  clone() {
    const newGrid = new Grid(this.rows, this.cols);
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        newGrid.cells[row][col] = this.cells[row][col];
      }
    }
    return newGrid;
  }

  /**
   * Initialize an empty grid with dead cells
   * @private
   * @returns {Array<Array<number>>} - 2D array of cell states
   */
  #createEmptyGrid() {
    const grid = [];
    for (let row = 0; row < this.rows; row++) {
      grid[row] = [];
      for (let col = 0; col < this.cols; col++) {
        grid[row][col] = CellState.DEAD;
      }
    }
    return grid;
  }
}

export default Grid;
