const React = require('react');

const LoveEnvelope = ({ isOpen, onClick, children }) => {
  return (
    <div
      className="relative cursor-pointer transition-all duration-700"
      onClick={onClick}
      style={{ perspective: '1000px' }}
      data-testid="envelope"
    >
      <div
        className="relative bg-gradient-to-br from-rose-200 to-pink-300 rounded-xl shadow-2xl overflow-visible"
        style={{
          width: '360px',
          minHeight: isOpen ? 'auto' : '220px',
          transition: 'all 0.7s ease',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 bg-gradient-to-br from-rose-300 to-pink-400 origin-top z-20"
          data-testid="envelope-flap"
          style={{
            height: '80px',
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
            transition: 'transform 0.7s ease',
            transformStyle: 'preserve-3d',
          }}
        />

        {!isOpen && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-4xl animate-pulse z-30" data-testid="heart-icon">
            💝
          </div>
        )}

        <div
          className="relative bg-white/95 mx-3 mb-3 rounded-lg shadow-inner"
          data-testid="envelope-content"
          style={{
            marginTop: '90px',
            padding: isOpen ? '24px' : '0px',
            maxHeight: isOpen ? '600px' : '0px',
            opacity: isOpen ? 1 : 0,
            overflow: isOpen ? 'visible' : 'hidden',
            transition: 'all 0.5s ease 0.3s',
          }}
        >
          {children}
        </div>

        {!isOpen && (
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-rose-600 font-medium animate-bounce">
              Click to open my heart 💌
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

module.exports = LoveEnvelope;
