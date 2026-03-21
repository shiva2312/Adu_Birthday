const React = require('react');
const { render, screen, act } = require('@testing-library/react');
const Sparkles = require('../components/Sparkles');

describe('Sparkles', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders initially with no sparkles', () => {
    const { container } = render(<Sparkles />);
    const sparkles = container.querySelectorAll('.animate-sparkle');
    expect(sparkles).toHaveLength(0);
  });

  test('adds sparkles over time', () => {
    const { container } = render(<Sparkles />);

    act(() => {
      jest.advanceTimersByTime(900); // 3 intervals at 300ms
    });

    const sparkles = container.querySelectorAll('.animate-sparkle');
    expect(sparkles.length).toBe(3);
  });

  test('limits sparkles to max 21 (20 retained + 1 new)', () => {
    const { container } = render(<Sparkles />);

    act(() => {
      jest.advanceTimersByTime(300 * 25); // 25 intervals
    });

    const sparkles = container.querySelectorAll('.animate-sparkle');
    expect(sparkles.length).toBeLessThanOrEqual(21);
  });

  test('container is non-interactive', () => {
    const { container } = render(<Sparkles />);
    expect(container.firstChild.className).toContain('pointer-events-none');
  });

  test('cleans up interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = render(<Sparkles />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
