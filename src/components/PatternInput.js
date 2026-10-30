import React, { useRef } from 'react';
import { applyPattern } from '../lib/rename';

const EXAMPLES = [
  { name: 'example', ext: '.jpg' },
  { name: 'document', ext: '.pdf' },
];

const PatternInput = ({
  pattern,
  setPattern,
  startIndex,
  setStartIndex,
  leadingZeros,
  setLeadingZeros
}) => {
  const inputRef = useRef(null);
  const missingIndex = !pattern.includes('{index}');

  const insertIndexToken = () => {
    const input = inputRef.current;
    const start = input?.selectionStart ?? pattern.length;
    const end = input?.selectionEnd ?? pattern.length;
    setPattern(pattern.slice(0, start) + '{index}' + pattern.slice(end));
    requestAnimationFrame(() => {
      if (!input) return;
      input.focus();
      input.setSelectionRange(start + 7, start + 7);
    });
  };

  const handleStartIndexChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setStartIndex(Number.isNaN(value) ? 0 : Math.max(0, value));
  };

  return (
    <section className="card-gradient">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Naming Pattern
      </h2>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="pattern" className="block text-sm font-medium text-white">
              Name Pattern
            </label>
            <button
              type="button"
              onClick={insertIndexToken}
              className="px-2.5 py-0.5 text-xs font-mono font-semibold text-violet-200 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-400/40 rounded-full transition-colors"
              title="Insert {index} at the cursor"
            >
              + {'{index}'}
            </button>
          </div>
          <input
            id="pattern"
            ref={inputRef}
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="input-field font-mono"
            placeholder="e.g. photo_{index}"
            spellCheck={false}
            autoComplete="off"
          />
          {missingIndex && (
            <p className="mt-2 text-xs text-amber-300">
              No {'{index}'} in the pattern — duplicates will get a " (2)", " (3)"… suffix.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-index" className="block text-sm font-medium text-white mb-2">
              Start Index
            </label>
            <input
              id="start-index"
              type="number"
              value={startIndex}
              onChange={handleStartIndexChange}
              min="0"
              className="input-field"
              placeholder="1"
            />
          </div>

          <div>
            <label htmlFor="leading-zeros" className="block text-sm font-medium text-white mb-2">
              Leading Zeros
            </label>
            <select
              id="leading-zeros"
              value={leadingZeros}
              onChange={(e) => setLeadingZeros(parseInt(e.target.value, 10))}
              className="input-field"
            >
              <option value={0}>None (1, 2, 3...)</option>
              <option value={2}>2 digits (01, 02, 03...)</option>
              <option value={3}>3 digits (001, 002, 003...)</option>
              <option value={4}>4 digits (0001, 0002, 0003...)</option>
            </select>
          </div>
        </div>

        <div className="bg-black/20 rounded-xl p-4 border border-violet-400/30">
          <div className="flex items-center mb-3">
            <svg className="w-4 h-4 text-violet-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-sm font-medium text-white">Live Preview</span>
          </div>
          <div className="text-sm space-y-2">
            {EXAMPLES.map(({ name, ext }, i) => (
              <div key={name} className="flex items-center justify-between gap-3 px-3 py-2 bg-white/5 rounded-lg">
                <span className="text-violet-200/70 truncate">{name}{ext}</span>
                <span className="text-violet-400 flex-shrink-0" aria-hidden="true">→</span>
                <span className="font-mono font-medium text-white bg-violet-500/25 px-2 py-0.5 rounded truncate">
                  {applyPattern(pattern, startIndex + i, leadingZeros)}{ext}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatternInput;
