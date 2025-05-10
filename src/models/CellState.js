/**
 * Enumeration of possible cell states in Game of Life
 * @readonly
 * @enum {number}
 */
const CellState = {
  DEAD: 0,
  ALIVE: 1,
  
  /**
   * Convert a numeric value to its corresponding CellState
   * @param {number} value - The numeric value to convert
   * @returns {number} - The corresponding CellState value
   */
  fromValue(value) {
    return value === 1 ? this.ALIVE : this.DEAD;
  },
  
  /**
   * Toggle between ALIVE and DEAD states
   * @param {number} state - Current state
   * @returns {number} - Toggled state
   */
  toggle(state) {
    return state === this.ALIVE ? this.DEAD : this.ALIVE;
  }
};

export default CellState;
