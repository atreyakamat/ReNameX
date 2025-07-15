import React from 'react';

const DownloadSection = ({ filesCount, onDownload, onClear, isDownloading }) => {
  const hasFiles = filesCount > 0;

  return (
    <div className="card-gradient">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m3 8H5a2 2 0 01-2-2V8a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V18a2 2 0 01-2 2z" />
        </svg>
        Download & Actions
      </h2>
      
      <div className="space-y-4">
        {hasFiles && (
          <div className="relative overflow-hidden bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-xl p-4 border border-green-200/50 backdrop-blur-sm">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-green-600 mr-2 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-white">Ready to Download</span>
              </div>
              <p className="text-sm text-white">
                <span className="font-semibold text-green-300">{filesCount}</span> file{filesCount !== 1 ? 's' : ''} will be renamed and packaged into a ZIP file
              </p>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onDownload}
            disabled={!hasFiles || isDownloading}
            className={`flex-1 flex items-center justify-center space-x-2 ${
              hasFiles && !isDownloading
                ? 'btn-primary'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed py-3 px-6 rounded-xl'
            }`}
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Creating ZIP...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m3 8H5a2 2 0 01-2-2V8a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V18a2 2 0 01-2 2z" />
                </svg>
                <span>Download ZIP</span>
              </>
            )}
          </button>
          
          <button
            onClick={onClear}
            disabled={!hasFiles || isDownloading}
            className={`btn-secondary ${
              (!hasFiles || isDownloading) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All
          </button>
        </div>
        
        {!hasFiles && (
          <div className="text-center py-6">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-gray-100 to-violet-100 rounded-full flex items-center justify-center mb-3 animate-pulse">
              <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4" />
              </svg>
            </div>
            <p className="text-white text-sm font-medium">
              Upload files to enable download options
            </p>
          </div>
        )}
        
        <div className="text-xs text-white space-y-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center">
            <svg className="w-3 h-3 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Files are renamed and packaged locally - nothing is uploaded</span>
          </div>
          <div className="flex items-center">
            <svg className="w-3 h-3 text-violet-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>ZIP file contains all files with new names</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
