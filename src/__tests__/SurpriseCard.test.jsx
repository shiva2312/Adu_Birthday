const React = require('react');
const { render, screen, act } = require('@testing-library/react');
const SurpriseCard = require('../components/SurpriseCard');

describe('SurpriseCard', () => {
  const defaultProps = {
    title: 'Why I Love You',
    content: 'You are amazing!',
    icon: '💖',
    delay: 0,
  };

  test('renders card with title and icon on front', () => {
    render(<SurpriseCard {...defaultProps} />);

    expect(screen.getByText('Why I Love You')).toBeInTheDocument();
    expect(screen.getByText('💖')).toBeInTheDocument();
    expect(screen.getByText('Tap to reveal ✨')).toBeInTheDocument();
  });

  test('renders back side with content', () => {
    render(<SurpriseCard {...defaultProps} />);
    expect(screen.getByText('You are amazing!')).toBeInTheDocument();
  });

  test('starts in non-revealed state (no rotation)', () => {
    render(<SurpriseCard {...defaultProps} />);
    const inner = screen.getByTestId('card-inner');
    expect(inner.style.transform).toBe('rotateY(0deg)');
  });

  test('flips card on click', async () => {
    render(<SurpriseCard {...defaultProps} />);
    const card = screen.getByTestId('surprise-card');

    await act(async () => {
      card.click();
    });

    const inner = screen.getByTestId('card-inner');
    expect(inner.style.transform).toBe('rotateY(180deg)');
  });

  test('flips back on second click', async () => {
    render(<SurpriseCard {...defaultProps} />);
    const card = screen.getByTestId('surprise-card');

    await act(async () => {
      card.click();
    });
    await act(async () => {
      card.click();
    });

    const inner = screen.getByTestId('card-inner');
    expect(inner.style.transform).toBe('rotateY(0deg)');
  });

  test('applies animation delay from props', () => {
    render(<SurpriseCard {...defaultProps} delay={400} />);
    const card = screen.getByTestId('surprise-card');
    expect(card.style.animationDelay).toBe('400ms');
  });
});
