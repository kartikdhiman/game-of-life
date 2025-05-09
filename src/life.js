/**
 * Game of Life logic class
 */
class GameOfLife {
  /** @type {number}   */
  rows;
  /** @type {number} */
  cols;
  /** @type {Array<Array<number>>} */
  grid;
  /** @type {Array<Array<number>>} */
  nextGrid;

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.#initGrid();
    this.nextGrid = this.#initGrid();
  }

  // PUBLIC METHODS
  
  /**
   * Reset both grids to all dead cells
   */
  resetGrids() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j] = 0;
        this.nextGrid[i][j] = 0;
      }
    }
  }

  /**
   * Computes which cells will live for next generations
   */
  computeNextGen() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.#applyRules(i, j);
      }
    }
    // copy nextGrid to grid, and reset nextGrid
    this.#copyAndResetGrid();
  }

  /**
   * Set a cell to alive (1) or dead (0)
   * @param {Number} row 
   * @param {Number} col 
   * @param {Number} value 0 or 1
   */
  setCell(row, col, value) {
    this.grid[row][col] = value;
  }

  /**
   * Get the current state of a cell
   * @param {Number} row 
   * @param {Number} col 
   * @returns {Number} 0 or 1
   */
  getCell(row, col) {
    return this.grid[row][col];
  }

  /**
   * Get the game grid dimensions
   * @returns {Object} {rows, cols}
   */
  getDimensions() {
    return { rows: this.rows, cols: this.cols };
  }

  // PRIVATE METHODS

  /**
   * Creates and initializes a grid with 0
   * @private
   * @returns {number[][]} A 2D array of numbers initialized with zeros
   */
  #initGrid() {
    const grid = [];
    for (let i = 0; i < this.rows; i++) {
      grid[i] = [];
      for (let j = 0; j < this.cols; j++)
        grid[i][j] = 0;
    }
    return grid;
  }

  /**
   * Copy nextGrid to grid, and reset nextGrid
   * @private
   */
  #copyAndResetGrid() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j] = this.nextGrid[i][j];
        this.nextGrid[i][j] = 0;
      }
    }
  }

  /**
   * Apply the rules of the Game of Life
   * @param {Number} row
   * @param {Number} col
   * @private
   */
  #applyRules(row, col) {
    const neighborCount = this.#countNeighbors(row, col);
    const isAlive = this.grid[row][col] === 1;

    if (isAlive && (neighborCount < 2 || neighborCount > 3)) {
      this.nextGrid[row][col] = 0;
    } else if (!isAlive && neighborCount === 3) {
      this.nextGrid[row][col] = 1;
    } else {
      this.nextGrid[row][col] = this.grid[row][col];
    }
  }

  /**
   * Counts the number of neighbors for a cell
   * @param {Number} row 
   * @param {Number} col 
   * @private
   */
  #countNeighbors(row, col) {
    const directions = [
      [-1, 0], [-1, -1], [-1, 1], // top, top-left, top-right
      [0, -1], [0, 1],            // left, right
      [1, 0], [1, -1], [1, 1]     // bottom, bottom-left, bottom-right
    ];
    let count = 0;

    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
        count += this.grid[newRow][newCol];
      }
    });

    return count;
  }
}

export default GameOfLife;
