import Grid from "../../src/domain/Grid";
import Position from "../../src/models/Position";
import GameRules from "../../src/services/GameRules";
import CellState from "../../src/models/CellState";

describe('Grid', () => {
  let grid;

  beforeEach(() => {
    grid = new Grid(5, 5);
  });

  it('should count neighbors correctly', () => {
    // Set up a pattern:
    // . . . . .
    // . 1 1 . .
    // . 1 0 . .
    // . . . . .
    // . . . . .
    grid.setCell(new Position(1, 1), CellState.ALIVE);
    grid.setCell(new Position(1, 2), CellState.ALIVE);
    grid.setCell(new Position(2, 1), CellState.ALIVE);

    // Center position should have 3 neighbors
    expect(GameRules.countLiveNeighbors(grid, new Position(2, 2))).toBe(3);

    // Corner position should have 2 neighbors
    expect(GameRules.countLiveNeighbors(grid, new Position(1, 1))).toBe(2);

    // Edge position should have 3 neighbors
    expect(GameRules.countLiveNeighbors(grid, new Position(1, 2))).toBe(2);
  });

  it('should apply underpopulation rule correctly', () => {
    // Live cell with <2 neighbors dies
    expect(GameRules.determineNextState(CellState.ALIVE, 0)).toBe(CellState.DEAD);
    expect(GameRules.determineNextState(CellState.ALIVE, 1)).toBe(CellState.DEAD);
  });

  it('should apply survival rule correctly', () => {
    // Live cell with 2-3 neighbors survives
    expect(GameRules.determineNextState(CellState.ALIVE, 2)).toBe(CellState.ALIVE);
    expect(GameRules.determineNextState(CellState.ALIVE, 3)).toBe(CellState.ALIVE);
  });

  it('should apply overpopulation rule correctly', () => {
    // Live cell with >3 neighbors dies
    expect(GameRules.determineNextState(CellState.ALIVE, 4)).toBe(CellState.DEAD);
    expect(GameRules.determineNextState(CellState.ALIVE, 8)).toBe(CellState.DEAD);
  });

  it('should apply reproduction rule correctly', () => {
    // Dead cell with exactly 3 neighbors becomes alive
    expect(GameRules.determineNextState(CellState.DEAD, 3)).toBe(CellState.ALIVE);

    // Dead cell with !=3 neighbors stays dead
    expect(GameRules.determineNextState(CellState.DEAD, 2)).toBe(CellState.DEAD);
    expect(GameRules.determineNextState(CellState.DEAD, 4)).toBe(CellState.DEAD);
  });
});