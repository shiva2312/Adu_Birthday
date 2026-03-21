const React = require('react');
const { useState } = React;

const FALLBACK_MESSAGES = {
  romantic:
    "Adu, in the story of my life, you're the most beautiful chapter. 11 years and my heart still skips a beat when I see you. Happy Birthday to my forever! - Shivu 💕",
  funny:
    "11 years and you still haven't figured out you're way out of my league, Adu! Lucky me! Happy Birthday, gorgeous! - Shivu 😄💕",
  promise:
    "Adu, I promise to love you more with each passing year, to be your strength when you're weak, and to always be your biggest fan. Forever yours! - Shivu 💍",
};

const CATEGORIES = ['romantic', 'funny', 'promise'];

const AIMessageGenerator = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('romantic');

  const generateMessage = async () => {
    setLoading(true);
    setMessage('');

    setTimeout(() => {
      setMessage(FALLBACK_MESSAGES[category]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-rose-100 max-w-md mx-auto" data-testid="message-generator">
      <h3 className="text-xl font-bold text-rose-600 mb-4 text-center font-playfair">
        ✨ Infinite Love Messages ✨
      </h3>
      <p className="text-rose-400 text-sm text-center mb-4">
        Generate unique messages just for you, Adu!
      </p>
      <div className="flex gap-2 justify-center mb-4 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            data-testid={`category-${cat}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              category === cat
                ? 'bg-rose-500 text-white shadow-lg'
                : 'bg-rose-100 text-rose-500 hover:bg-rose-200'
            }`}
          >
            {cat === 'romantic' ? '💕 Romantic' : cat === 'funny' ? '😄 Sweet & Funny' : '💍 Promise'}
          </button>
        ))}
      </div>
      <button
        onClick={generateMessage}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-xl font-semibold disabled:opacity-50"
        data-testid="generate-button"
      >
        {loading ? '✨ Creating magic...' : '💝 Generate Love Message'}
      </button>
      {message && (
        <div className="mt-4 p-4 bg-rose-50 rounded-xl border border-rose-200" data-testid="generated-message">
          <p className="text-rose-700 text-center italic leading-relaxed font-cormorant">
            "{message}"
          </p>
        </div>
      )}
    </div>
  );
};

// Export for testing
AIMessageGenerator.FALLBACK_MESSAGES = FALLBACK_MESSAGES;
AIMessageGenerator.CATEGORIES = CATEGORIES;

module.exports = AIMessageGenerator;
