import React from 'react';

const FEATURES = [
  { label: '100% Client-side', dot: 'bg-emerald-400' },
  { label: 'No Upload Required', dot: 'bg-violet-400' },
  { label: 'Instant ZIP Download', dot: 'bg-indigo-400' },
];

const Header = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-2xl blur-lg opacity-60"></div>
          <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-4 rounded-2xl shadow-2xl border border-violet-400/50">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7V5a1 1 0 011-1h14a1 1 0 011 1v2M9 20h6M12 4v16" />
            </svg>
          </div>
        </div>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold tracking-tight title-glow mb-5">
        ReNameX
      </h1>

      <p className="text-violet-100/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
        Bulk-rename files in seconds. Drop them in, set a pattern, and download a ZIP —
        <span className="font-semibold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent"> all in your browser</span>.
      </p>

      <ul className="flex flex-wrap items-center justify-center gap-3 mt-8 text-sm">
        {FEATURES.map(({ label, dot }) => (
          <li key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white">
            <span className={`w-2 h-2 rounded-full ${dot}`} aria-hidden="true"></span>
            <span className="font-medium">{label}</span>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
