import { GameOfLife } from '../../src/core/GameOfLife.js';
import CellState from "../../src/models/CellState";

describe('GameOfLife', () => {
  let game;
  
  beforeEach(() => {
    game = new GameOfLife(5, 5);
  });
  
  describe('Grid initialization', () => {
    it('should create an empty grid of the correct size', () => {
      const dimensions = game.getDimensions();
      expect(dimensions.rows).toBe(5);
      expect(dimensions.cols).toBe(5);
      
      // All cells should be dead initially
      for (let row = 0; row < dimensions.rows; row++) {
        for (let col = 0; col < dimensions.cols; col++) {
          expect(game.getCell(row, col)).toBe(CellState.DEAD);
        }
      }
    });
    
    it('should set and get cell states correctly', () => {
      game.setCell(1, 2, CellState.ALIVE);
      expect(game.getCell(1, 2)).toBe(CellState.ALIVE);
      
      game.setCell(1, 2, CellState.DEAD);
      expect(game.getCell(1, 2)).toBe(CellState.DEAD);
    });
    
    it('should toggle cell state correctly', () => {
      expect(game.getCell(2, 2)).toBe(CellState.DEAD);
      
      game.toggleCell(2, 2);
      expect(game.getCell(2, 2)).toBe(CellState.ALIVE);
      
      game.toggleCell(2, 2);
      expect(game.getCell(2, 2)).toBe(CellState.DEAD);
    });
  });

  describe('Game evolution', () => {
    it('should correctly evolve still lives (block pattern)', () => {
      // Set up a block (2x2 square) - a still life
      // . . . . .
      // . 1 1 . .
      // . 1 1 . .
      // . . . . .
      // . . . . .
      game.setCell(1, 1, CellState.ALIVE);
      game.setCell(1, 2, CellState.ALIVE);
      game.setCell(2, 1, CellState.ALIVE);
      game.setCell(2, 2, CellState.ALIVE);
      
      // Run one generation
      game.computeNextGeneration();
      
      // Block should remain unchanged
      expect(game.getCell(1, 1)).toBe(CellState.ALIVE);
      expect(game.getCell(1, 2)).toBe(CellState.ALIVE);
      expect(game.getCell(2, 1)).toBe(CellState.ALIVE);
      expect(game.getCell(2, 2)).toBe(CellState.ALIVE);
    });
    
    it('should correctly evolve oscillators (blinker pattern)', () => {
      // Set up a blinker (vertical line of 3 cells)
      // . . . . .
      // . . 1 . .
      // . . 1 . .
      // . . 1 . .
      // . . . . .
      game.setCell(1, 2, CellState.ALIVE);
      game.setCell(2, 2, CellState.ALIVE);
      game.setCell(3, 2, CellState.ALIVE);
      
      // Run one generation - should become horizontal
      game.computeNextGeneration();
      
      // Blinker should have changed to horizontal
      expect(game.getCell(1, 2)).toBe(CellState.DEAD);
      expect(game.getCell(2, 1)).toBe(CellState.ALIVE);
      expect(game.getCell(2, 2)).toBe(CellState.ALIVE);
      expect(game.getCell(2, 3)).toBe(CellState.ALIVE);
      expect(game.getCell(3, 2)).toBe(CellState.DEAD);
      
      // Run one more generation - should return to vertical
      game.computeNextGeneration();
      
      // Blinker should have returned to vertical
      expect(game.getCell(1, 2)).toBe(CellState.ALIVE);
      expect(game.getCell(2, 2)).toBe(CellState.ALIVE);
      expect(game.getCell(3, 2)).toBe(CellState.ALIVE);
      expect(game.getCell(2, 1)).toBe(CellState.DEAD);
      expect(game.getCell(2, 3)).toBe(CellState.DEAD);
    });
  });
});
