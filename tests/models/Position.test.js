import Position from "../../src/models/Position";

describe('Position', () => {
  it('should create positions with correct coordinates', () => {
    const pos = new Position(2, 3);
    expect(pos.row).toBe(2);
    expect(pos.col).toBe(3);
  });

  it('should offset positions correctly', () => {
    const pos = new Position(2, 3);
    const offsetPos = pos.offset(1, -1);

    expect(offsetPos.row).toBe(3);
    expect(offsetPos.col).toBe(2);
  });

  it('should check boundary conditions', () => {
    const pos1 = new Position(2, 2);
    expect(pos1.isInBounds(5, 5)).toBe(true);

    const pos2 = new Position(-1, 2);
    expect(pos2.isInBounds(5, 5)).toBe(false);

    const pos3 = new Position(2, 5);
    expect(pos3.isInBounds(5, 5)).toBe(false);
  });
});