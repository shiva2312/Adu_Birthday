const React = require('react');
const { render, screen } = require('@testing-library/react');
const LoveEnvelope = require('../components/LoveEnvelope');

describe('LoveEnvelope', () => {
  test('renders in closed state by default', () => {
    const mockClick = jest.fn();
    render(
      <LoveEnvelope isOpen={false} onClick={mockClick}>
        <p>Secret content</p>
      </LoveEnvelope>
    );

    expect(screen.getByText('Click to open my heart 💌')).toBeInTheDocument();
    expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
  });

  test('hides "click to open" text when open', () => {
    const mockClick = jest.fn();
    render(
      <LoveEnvelope isOpen={true} onClick={mockClick}>
        <p>Secret content</p>
      </LoveEnvelope>
    );

    expect(screen.queryByText('Click to open my heart 💌')).not.toBeInTheDocument();
  });

  test('hides heart icon when open', () => {
    const mockClick = jest.fn();
    render(
      <LoveEnvelope isOpen={true} onClick={mockClick}>
        <p>Secret content</p>
      </LoveEnvelope>
    );

    expect(screen.queryByTestId('heart-icon')).not.toBeInTheDocument();
  });

  test('content area has 0 opacity when closed', () => {
    const mockClick = jest.fn();
    render(
      <LoveEnvelope isOpen={false} onClick={mockClick}>
        <p>Secret content</p>
      </LoveEnvelope>
    );

    const content = screen.getByTestId('envelope-content');
    expect(content.style.opacity).toBe('0');
    expect(content.style.maxHeight).toBe('0px');
  });

  test('content area is visible when open', () => {
    const mockClick = jest.fn();
    render(
      <LoveEnvelope isOpen={true} onClick={mockClick}>
        <p>Secret content</p>
      </LoveEnvelope>
    );

    const content = screen.getByTestId('envelope-content');
    expect(content.style.opacity).toBe('1');
    expect(content.style.maxHeight).toBe('600px');
  });

  test('flap rotates when envelope is open', () => {
    const mockClick = jest.fn();
    render(
      <LoveEnvelope isOpen={true} onClick={mockClick}>
        <p>Secret content</p>
      </LoveEnvelope>
    );

    const flap = screen.getByTestId('envelope-flap');
    expect(flap.style.transform).toBe('rotateX(180deg)');
  });

  test('flap is flat when envelope is closed', () => {
    const mockClick = jest.fn();
    render(
      <LoveEnvelope isOpen={false} onClick={mockClick}>
        <p>Secret content</p>
      </LoveEnvelope>
    );

    const flap = screen.getByTestId('envelope-flap');
    expect(flap.style.transform).toBe('rotateX(0deg)');
  });

  test('calls onClick when clicked', async () => {
    const mockClick = jest.fn();
    render(
      <LoveEnvelope isOpen={false} onClick={mockClick}>
        <p>Secret content</p>
      </LoveEnvelope>
    );

    screen.getByTestId('envelope').click();
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  test('renders children content', () => {
    const mockClick = jest.fn();
    render(
      <LoveEnvelope isOpen={true} onClick={mockClick}>
        <p>My love letter content</p>
      </LoveEnvelope>
    );

    expect(screen.getByText('My love letter content')).toBeInTheDocument();
  });
});
