import React from 'react';

const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-2xl blur-md opacity-60 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 rounded-2xl blur-lg opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-4 rounded-2xl shadow-2xl border border-violet-400/50">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 011 1v2H3V5a1 1 0 011-1h3zM3 7h18v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11v6M14 11v6" />
            </svg>
          </div>
        </div>
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold title-glow mb-6">
        ReNameX
      </h1>
      
      <p className="text-white text-xl max-w-3xl mx-auto leading-relaxed mb-8">
        Your all-in-one, blazing-fast file renaming powerhouse. Drop files, define patterns, and rename in bulk — 
        <span className="font-semibold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent"> all in your browser</span>.
      </p>
      
      <div className="flex items-center justify-center mt-8 space-x-8 text-sm">
        <div className="flex items-center space-x-3 text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-medium text-white">100% Client-side</span>
        </div>
        <div className="flex items-center space-x-3 text-violet-400">
          <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
          <span className="font-medium text-white">No Upload Required</span>
        </div>
        <div className="flex items-center space-x-3 text-indigo-400">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
          <span className="font-medium text-white">Instant ZIP Download</span>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-violet-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-20 animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-ping opacity-20 animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default Header;
