const React = require('react');
const { render, screen } = require('@testing-library/react');
const Timeline = require('../components/Timeline');

describe('Timeline', () => {
  test('renders all 5 milestones', () => {
    render(<Timeline />);

    expect(screen.getByTestId('milestone-0')).toBeInTheDocument();
    expect(screen.getByTestId('milestone-1')).toBeInTheDocument();
    expect(screen.getByTestId('milestone-2')).toBeInTheDocument();
    expect(screen.getByTestId('milestone-3')).toBeInTheDocument();
    expect(screen.getByTestId('milestone-4')).toBeInTheDocument();
  });

  test('displays correct years', () => {
    render(<Timeline />);

    expect(screen.getByText('2014')).toBeInTheDocument();
    expect(screen.getByText('2016')).toBeInTheDocument();
    expect(screen.getByText('2019')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  test('displays milestone events', () => {
    render(<Timeline />);

    expect(screen.getByText(/Where it all began/)).toBeInTheDocument();
    expect(screen.getByText(/Two hearts, one soul/)).toBeInTheDocument();
    expect(screen.getByText(/Our First Trip Together/)).toBeInTheDocument();
    expect(screen.getByText(/Growing stronger/)).toBeInTheDocument();
    expect(screen.getByText(/11 years of magic/)).toBeInTheDocument();
  });

  test('displays milestone details', () => {
    render(<Timeline />);

    expect(screen.getByText(/July 2014/)).toBeInTheDocument();
    expect(screen.getByText(/Unbreakable bond/)).toBeInTheDocument();
  });

  test('alternates layout direction (even=row, odd=row-reverse)', () => {
    render(<Timeline />);

    const milestone0 = screen.getByTestId('milestone-0');
    const milestone1 = screen.getByTestId('milestone-1');

    expect(milestone0.className).toContain('flex-row');
    expect(milestone0.className).not.toContain('flex-row-reverse');
    expect(milestone1.className).toContain('flex-row-reverse');
  });

  test('has staggered animation delays', () => {
    render(<Timeline />);

    for (let i = 0; i < 5; i++) {
      const milestone = screen.getByTestId(`milestone-${i}`);
      expect(milestone.style.animationDelay).toBe(`${i * 200}ms`);
    }
  });
});
