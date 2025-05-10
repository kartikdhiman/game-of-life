import CellState from '../models/CellState.js';

/**
 * Rules engine for Conway's Game of Life
 */
class GameRules {
  /**
   * The neighboring cell directions (8 directions)
   * @static
   * @readonly
   */
  static NEIGHBOR_DIRECTIONS = [
    [-1, -1], [-1, 0], [-1, 1], // top-left, top, top-right
    [0, -1], [0, 1],           // left, right
    [1, -1], [1, 0], [1, 1]    // bottom-left, bottom, bottom-right
  ];

  /**
   * Count live neighbors for a cell
   * @param {Grid} grid - Current grid state
   * @param {Position} position - Position to check
   * @returns {number} - Count of live neighbors
   */
  static countLiveNeighbors(grid, position) {
    const { rows, cols } = grid.getDimensions();
    let count = 0;

    for (const [rowOffset, colOffset] of this.NEIGHBOR_DIRECTIONS) {
      const neighborPos = position.offset(rowOffset, colOffset);
      
      if (neighborPos.isInBounds(rows, cols) && 
          grid.getCell(neighborPos) === CellState.ALIVE) {
        count++;
      }
    }

    return count;
  }

  /**
   * Determine the next state for a cell based on Game of Life rules
   * @param {number} currentState - Current cell state
   * @param {number} liveNeighbors - Count of live neighbors
   * @returns {number} - Next cell state
   */
  static determineNextState(currentState, liveNeighbors) {
    const isAlive = currentState === CellState.ALIVE;

    // Rule 1: Any live cell with fewer than two live neighbors dies (underpopulation)
    if (isAlive && liveNeighbors < 2) {
      return CellState.DEAD;
    }
    
    // Rule 2: Any live cell with two or three live neighbors lives on
    if (isAlive && (liveNeighbors === 2 || liveNeighbors === 3)) {
      return CellState.ALIVE;
    }
    
    // Rule 3: Any live cell with more than three live neighbors dies (overpopulation)
    if (isAlive && liveNeighbors > 3) {
      return CellState.DEAD;
    }
    
    // Rule 4: Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
    if (!isAlive && liveNeighbors === 3) {
      return CellState.ALIVE;
    }
    
    // Default: Cell stays in its current state
    return currentState;
  }
}

export default GameRules;
