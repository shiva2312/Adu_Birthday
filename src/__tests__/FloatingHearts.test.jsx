const React = require('react');
const { render, screen } = require('@testing-library/react');
const FloatingHearts = require('../components/FloatingHearts');

describe('FloatingHearts', () => {
  test('renders exactly 30 heart elements', () => {
    const { container } = render(<FloatingHearts />);
    const hearts = container.querySelectorAll('.animate-float-up');
    expect(hearts).toHaveLength(30);
  });

  test('each heart has proper positioning styles', () => {
    const { container } = render(<FloatingHearts />);
    const hearts = container.querySelectorAll('.animate-float-up');

    hearts.forEach((heart) => {
      expect(heart.style.left).toMatch(/^\d+(\.\d+)?%$/);
      expect(heart.style.bottom).toBe('-50px');
      expect(heart.style.fontSize).toMatch(/^\d+(\.\d+)?px$/);
    });
  });

  test('hearts have opacity between 0.3 and 0.7', () => {
    const { container } = render(<FloatingHearts />);
    const hearts = container.querySelectorAll('.animate-float-up');

    hearts.forEach((heart) => {
      const opacity = parseFloat(heart.style.opacity);
      expect(opacity).toBeGreaterThanOrEqual(0.3);
      expect(opacity).toBeLessThanOrEqual(0.7);
    });
  });

  test('container is non-interactive (pointer-events-none)', () => {
    const { container } = render(<FloatingHearts />);
    const wrapper = container.firstChild;
    expect(wrapper.className).toContain('pointer-events-none');
  });

  test('hearts have animation duration between 8s and 16s', () => {
    const { container } = render(<FloatingHearts />);
    const hearts = container.querySelectorAll('.animate-float-up');

    hearts.forEach((heart) => {
      const duration = parseFloat(heart.style.animationDuration);
      expect(duration).toBeGreaterThanOrEqual(8);
      expect(duration).toBeLessThanOrEqual(16);
    });
  });
});
