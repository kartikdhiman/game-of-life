/**
 * Represents a position in a 2D grid
 */
class Position {
  /**
   * Create a new position
   * @param {number} row - Row index
   * @param {number} col - Column index
   */
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  /**
   * Get a new position offset from this position
   * @param {number} rowOffset - Row offset
   * @param {number} colOffset - Column offset
   * @returns {Position} - New position
   */
  offset(rowOffset, colOffset) {
    return new Position(this.row + rowOffset, this.col + colOffset);
  }

  /**
   * Check if this position is within bounds
   * @param {number} rows - Total rows
   * @param {number} cols - Total columns
   * @returns {boolean} - True if within bounds
   */
  isInBounds(rows, cols) {
    return this.row >= 0 && this.row < rows && this.col >= 0 && this.col < cols;
  }

  /**
   * Convert to string for use as a key
   * @returns {string} - String representation
   */
  toString() {
    return `${this.row},${this.col}`;
  }

  /**
   * Create a position from a string key
   * @param {string} key - String in format "row,col"
   * @returns {Position} - Position object
   */
  static fromString(key) {
    const [row, col] = key.split(',').map(Number);
    return new Position(row, col);
  }
}

export default Position;
