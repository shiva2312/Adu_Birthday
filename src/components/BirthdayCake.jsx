const React = require('react');
const { useState } = React;

const BirthdayCake = ({ onBlowCandles }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [showWish, setShowWish] = useState(false);
  const [blowProgress, setBlowProgress] = useState(0);

  const handleBlow = () => {
    if (!candlesLit) return;

    setIsBlowing(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setBlowProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setCandlesLit(false);
        setIsBlowing(false);
        setShowWish(true);
        setTimeout(() => {
          onBlowCandles();
        }, 3000);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 300 280" className="w-80 h-auto drop-shadow-2xl" data-testid="cake-svg">
        <text x="150" y="150" textAnchor="middle" fill="#fff" fontSize="11">
          Happy Birthday Adu!
        </text>
      </svg>

      <div className="mt-8 text-center">
        {candlesLit && !showWish && (
          <div>
            <p className="text-white text-2xl mb-6 font-dancing animate-pulse">
              ✨ Close your eyes & make a wish, Adu! ✨
            </p>
            <button
              onClick={handleBlow}
              disabled={isBlowing}
              className="px-10 py-5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white rounded-full text-xl font-bold"
              data-testid="blow-button"
            >
              {isBlowing ? '💨 Blowing...' : '🎂 Blow the Candles! 🎂'}
            </button>
            {isBlowing && (
              <div className="mt-6 w-56 mx-auto bg-white/20 rounded-full h-4 overflow-hidden" data-testid="progress-bar">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-100 rounded-full"
                  style={{ width: `${blowProgress}%` }}
                  data-testid="progress-fill"
                />
              </div>
            )}
          </div>
        )}

        {showWish && (
          <div className="animate-fade-in-up" data-testid="wish-message">
            <div className="text-7xl mb-6 animate-heartbeat">💕</div>
            <p className="text-white text-4xl font-bold mb-3 font-dancing">
              Happy Birthday Adu!
            </p>
            <p className="text-rose-200 text-xl mb-6">May all your wishes come true, my love!</p>
          </div>
        )}
      </div>
    </div>
  );
};

module.exports = BirthdayCake;
