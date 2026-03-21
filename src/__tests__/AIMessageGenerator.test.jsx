const React = require('react');
const { render, screen, act } = require('@testing-library/react');
const AIMessageGenerator = require('../components/AIMessageGenerator');

describe('AIMessageGenerator', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders the generator component', () => {
    render(<AIMessageGenerator />);
    expect(screen.getByTestId('message-generator')).toBeInTheDocument();
    expect(screen.getByText(/Infinite Love Messages/)).toBeInTheDocument();
  });

  test('renders all three category buttons', () => {
    render(<AIMessageGenerator />);
    expect(screen.getByTestId('category-romantic')).toBeInTheDocument();
    expect(screen.getByTestId('category-funny')).toBeInTheDocument();
    expect(screen.getByTestId('category-promise')).toBeInTheDocument();
  });

  test('romantic category is selected by default', () => {
    render(<AIMessageGenerator />);
    const romanticBtn = screen.getByTestId('category-romantic');
    expect(romanticBtn.className).toContain('bg-rose-500');
  });

  test('generate button is present', () => {
    render(<AIMessageGenerator />);
    const button = screen.getByTestId('generate-button');
    expect(button.textContent).toContain('Generate Love Message');
  });

  test('shows loading state when generating', async () => {
    render(<AIMessageGenerator />);
    const button = screen.getByTestId('generate-button');

    await act(async () => {
      button.click();
    });

    expect(button.textContent).toContain('Creating magic');
    expect(button).toBeDisabled();
  });

  test('generates romantic message by default', async () => {
    render(<AIMessageGenerator />);
    const button = screen.getByTestId('generate-button');

    await act(async () => {
      button.click();
    });

    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    const messageEl = screen.getByTestId('generated-message');
    expect(messageEl.textContent).toContain('most beautiful chapter');
  });

  test('generates funny message when funny category is selected', async () => {
    render(<AIMessageGenerator />);

    await act(async () => {
      screen.getByTestId('category-funny').click();
    });

    await act(async () => {
      screen.getByTestId('generate-button').click();
    });

    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    const messageEl = screen.getByTestId('generated-message');
    expect(messageEl.textContent).toContain('out of my league');
  });

  test('generates promise message when promise category is selected', async () => {
    render(<AIMessageGenerator />);

    await act(async () => {
      screen.getByTestId('category-promise').click();
    });

    await act(async () => {
      screen.getByTestId('generate-button').click();
    });

    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    const messageEl = screen.getByTestId('generated-message');
    expect(messageEl.textContent).toContain('promise to love you');
  });

  test('no message is shown before generating', () => {
    render(<AIMessageGenerator />);
    expect(screen.queryByTestId('generated-message')).not.toBeInTheDocument();
  });

  test('FALLBACK_MESSAGES has all three categories', () => {
    const messages = AIMessageGenerator.FALLBACK_MESSAGES;
    expect(messages).toHaveProperty('romantic');
    expect(messages).toHaveProperty('funny');
    expect(messages).toHaveProperty('promise');
  });
});
