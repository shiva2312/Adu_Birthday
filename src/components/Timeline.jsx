const React = require('react');

const Timeline = () => {
  const milestones = [
    { year: '2014', event: 'Where it all began 💫', detail: 'July 2014 - When Shivu found his Adu' },
    { year: '2016', event: 'Two hearts, one soul 💕', detail: '2 years of love & endless memories' },
    { year: '2019', event: 'Our First Trip Together 🌟', detail: 'The most unforgettable journey!' },
    { year: '2022', event: 'Growing stronger 💪', detail: '8 years - Unbreakable bond' },
    { year: '2026', event: '11 years of magic ✨', detail: 'And forever more to come...' },
  ];

  return (
    <div className="relative py-8" data-testid="timeline">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-300 transform -translate-x-1/2" />
      {milestones.map((milestone, index) => (
        <div
          key={index}
          className={`relative flex items-center mb-12 animate-fade-in-up ${
            index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
          }`}
          style={{ animationDelay: `${index * 200}ms` }}
          data-testid={`milestone-${index}`}
        >
          <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-rose-100">
              <span className="text-2xl font-bold text-rose-500">{milestone.year}</span>
              <h4 className="text-lg font-semibold text-rose-600 mt-1">{milestone.event}</h4>
              <p className="text-rose-400 text-sm mt-1">{milestone.detail}</p>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-rose-400 rounded-full border-4 border-white shadow-lg" />
          <div className="w-5/12" />
        </div>
      ))}
    </div>
  );
};

module.exports = Timeline;
