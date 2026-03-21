const React = require('react');
const { useState } = React;

const SurpriseCard = ({ title, content, icon, delay }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div
      className="relative w-72 h-80 cursor-pointer"
      onClick={() => setIsRevealed(!isRevealed)}
      style={{
        perspective: '1000px',
        animationDelay: `${delay}ms`,
      }}
      data-testid="surprise-card"
    >
      <div
        className="relative w-full h-full transition-all duration-700"
        data-testid="card-inner"
        style={{
          transformStyle: 'preserve-3d',
          transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 rounded-2xl shadow-xl flex flex-col items-center justify-center p-6"
          style={{ backfaceVisibility: 'hidden' }}
          data-testid="card-front"
        >
          <span className="text-6xl mb-4 animate-bounce">{icon}</span>
          <p className="text-rose-500 font-semibold text-lg text-center">{title}</p>
          <p className="text-rose-400 text-sm mt-2 animate-pulse">Tap to reveal ✨</p>
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-100 to-pink-200 rounded-2xl shadow-xl flex items-center justify-center p-6"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          data-testid="card-back"
        >
          <p className="text-rose-700 text-center leading-relaxed font-cormorant">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

module.exports = SurpriseCard;
