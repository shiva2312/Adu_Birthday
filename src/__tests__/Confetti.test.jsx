const React = require('react');
const { render, screen } = require('@testing-library/react');
const Confetti = require('../components/Confetti');

describe('Confetti', () => {
  test('renders 150 confetti pieces', () => {
    render(<Confetti />);
    const pieces = screen.getAllByTestId('confetti-piece');
    expect(pieces).toHaveLength(150);
  });

  test('container is non-interactive', () => {
    render(<Confetti />);
    const container = screen.getByTestId('confetti');
    expect(container.className).toContain('pointer-events-none');
  });

  test('confetti has high z-index', () => {
    render(<Confetti />);
    const container = screen.getByTestId('confetti');
    expect(container.className).toContain('z-50');
  });

  test('each piece has a background color set', () => {
    render(<Confetti />);
    const pieces = screen.getAllByTestId('confetti-piece');

    pieces.forEach((piece) => {
      expect(piece.style.backgroundColor).toBeTruthy();
    });
  });

  test('pieces start above viewport', () => {
    render(<Confetti />);
    const pieces = screen.getAllByTestId('confetti-piece');

    pieces.forEach((piece) => {
      expect(piece.style.top).toBe('-20px');
    });
  });

  test('pieces have varied sizes', () => {
    render(<Confetti />);
    const pieces = screen.getAllByTestId('confetti-piece');
    const sizes = new Set();

    pieces.forEach((piece) => {
      sizes.add(piece.style.width);
    });

    // With 150 random pieces, there should be many distinct sizes
    expect(sizes.size).toBeGreaterThan(10);
  });
});
