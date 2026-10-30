import React from 'react';
import { formatBytes } from '../lib/rename';

const DownloadSection = ({ filesCount, totalSize, onDownload, onClear, isDownloading, error }) => {
  const hasFiles = filesCount > 0;

  return (
    <section className="card-gradient flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m3 8H5a2 2 0 01-2-2V8a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V18a2 2 0 01-2 2z" />
        </svg>
        Download & Actions
      </h2>

      <div className="space-y-4 flex-1 flex flex-col">
        {hasFiles ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-4 bg-emerald-500/10 border border-emerald-400/30">
              <p className="text-xs uppercase tracking-wide text-emerald-300/80">Files ready</p>
              <p className="text-2xl font-bold text-white mt-1">{filesCount}</p>
            </div>
            <div className="rounded-xl p-4 bg-violet-500/10 border border-violet-400/30">
              <p className="text-xs uppercase tracking-wide text-violet-300/80">Total size</p>
              <p className="text-2xl font-bold text-white mt-1">{formatBytes(totalSize)}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white text-sm font-medium">Add some files to get started</p>
            <p className="text-violet-200/70 text-xs mt-1">They'll be renamed and zipped right here</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onDownload}
            disabled={!hasFiles || isDownloading}
            className={`flex-1 flex items-center justify-center gap-2 ${
              hasFiles && !isDownloading
                ? 'btn-primary'
                : 'bg-white/10 text-white/40 border border-white/10 cursor-not-allowed py-3 px-6 rounded-xl font-semibold'
            }`}
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <span>Creating ZIP...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download ZIP</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClear}
            disabled={!hasFiles || isDownloading}
            className="btn-secondary flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All
          </button>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-200 bg-red-500/15 border border-red-400/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <ul className="mt-auto text-xs text-violet-100/80 space-y-2 bg-white/5 rounded-lg p-3">
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2" aria-hidden="true"></span>
            Renamed and packaged locally — nothing is uploaded
          </li>
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mr-2" aria-hidden="true"></span>
            Original files on your device are left untouched
          </li>
        </ul>
      </div>
    </section>
  );
};

export default DownloadSection;
