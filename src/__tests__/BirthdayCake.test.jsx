const React = require('react');
const { render, screen, act } = require('@testing-library/react');
const userEvent = require('@testing-library/user-event').default;
const BirthdayCake = require('../components/BirthdayCake');

describe('BirthdayCake', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders the cake SVG', () => {
    const mockCallback = jest.fn();
    render(<BirthdayCake onBlowCandles={mockCallback} />);
    expect(screen.getByTestId('cake-svg')).toBeInTheDocument();
  });

  test('shows wish prompt initially', () => {
    const mockCallback = jest.fn();
    render(<BirthdayCake onBlowCandles={mockCallback} />);
    expect(screen.getByText(/Close your eyes & make a wish/)).toBeInTheDocument();
  });

  test('shows blow button initially', () => {
    const mockCallback = jest.fn();
    render(<BirthdayCake onBlowCandles={mockCallback} />);
    const button = screen.getByTestId('blow-button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toContain('Blow the Candles');
  });

  test('button text changes to "Blowing..." when clicked', async () => {
    const mockCallback = jest.fn();
    render(<BirthdayCake onBlowCandles={mockCallback} />);
    const button = screen.getByTestId('blow-button');

    await act(async () => {
      button.click();
    });

    expect(button.textContent).toContain('Blowing...');
  });

  test('shows wish message after blowing animation completes', async () => {
    const mockCallback = jest.fn();
    render(<BirthdayCake onBlowCandles={mockCallback} />);
    const button = screen.getByTestId('blow-button');

    await act(async () => {
      button.click();
    });

    // Advance through the 5 intervals (20% each at 100ms)
    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId('wish-message')).toBeInTheDocument();
    expect(screen.getAllByText('Happy Birthday Adu!').length).toBeGreaterThanOrEqual(2);
  });

  test('calls onBlowCandles callback 3 seconds after wish appears', async () => {
    const mockCallback = jest.fn();
    render(<BirthdayCake onBlowCandles={mockCallback} />);
    const button = screen.getByTestId('blow-button');

    await act(async () => {
      button.click();
    });

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(mockCallback).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('button is disabled while blowing animation is in progress', async () => {
    const mockCallback = jest.fn();
    render(<BirthdayCake onBlowCandles={mockCallback} />);
    const button = screen.getByTestId('blow-button');

    await act(async () => {
      button.click();
    });

    expect(button).toBeDisabled();
  });

  test('progress bar appears during blowing', async () => {
    const mockCallback = jest.fn();
    render(<BirthdayCake onBlowCandles={mockCallback} />);
    const button = screen.getByTestId('blow-button');

    await act(async () => {
      button.click();
    });

    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });
});
