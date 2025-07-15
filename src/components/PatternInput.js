import React from 'react';

const PatternInput = ({
  pattern,
  setPattern,
  startIndex,
  setStartIndex,
  leadingZeros,
  setLeadingZeros
}) => {
  return (
    <div className="card-gradient">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Naming Pattern
      </h2>
      
      <div className="space-y-4">
        {/* Pattern Input */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Name Pattern
            <span className="text-violet-300 ml-1 font-semibold">(use {'{index}'} as placeholder)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="input-field pr-10"
              placeholder="e.g., photo_{index}, document_{index}"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a.997.997 0 01-.707.293H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Start Index */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Start Index
            </label>
            <input
              type="number"
              value={startIndex}
              onChange={(e) => setStartIndex(parseInt(e.target.value) || 1)}
              min="0"
              className="input-field"
              placeholder="1"
            />
          </div>

          {/* Leading Zeros */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Leading Zeros
            </label>
            <select
              value={leadingZeros}
              onChange={(e) => setLeadingZeros(parseInt(e.target.value))}
              className="input-field"
            >
              <option value={0}>None (1, 2, 3...)</option>
              <option value={2}>2 digits (01, 02, 03...)</option>
              <option value={3}>3 digits (001, 002, 003...)</option>
              <option value={4}>4 digits (0001, 0002, 0003...)</option>
            </select>
          </div>
        </div>

        {/* Preview Example */}
        <div className="relative overflow-hidden bg-gradient-to-r from-violet-900/50 to-indigo-900/50 rounded-xl p-4 border border-violet-400/50 backdrop-blur-sm">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-indigo-500/5 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-3">
              <svg className="w-4 h-4 text-violet-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-sm font-medium text-white">Live Preview</span>
            </div>
            <div className="text-sm space-y-2">
              <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                <span className="text-gray-800">example.jpg →</span>
                <span className="font-medium text-violet-800 bg-violet-100/50 px-2 py-1 rounded">
                  {pattern.replace('{index}', 
                    leadingZeros > 0 
                      ? startIndex.toString().padStart(leadingZeros, '0')
                      : startIndex.toString()
                  )}.jpg
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                <span className="text-gray-800">document.pdf →</span>
                <span className="font-medium text-violet-800 bg-violet-100/50 px-2 py-1 rounded">
                  {pattern.replace('{index}', 
                    leadingZeros > 0 
                      ? (startIndex + 1).toString().padStart(leadingZeros, '0')
                      : (startIndex + 1).toString()
                  )}.pdf
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternInput;
