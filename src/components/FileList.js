import React from 'react';

const FileList = ({ files }) => {
  if (files.length === 0) {
    return (
      <div className="card-gradient">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          File Preview
        </h2>
        
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-100 to-violet-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-white text-lg font-medium">No files selected</p>
          <p className="text-sm text-gray-300 mt-1">Upload files to see the live preview</p>
          
          {/* Floating dots */}
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-violet-300 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-gradient">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <svg className="w-5 h-5 mr-2 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          File Preview
        </h2>
        <span className="px-3 py-1 bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-800 text-sm font-medium rounded-full border border-violet-200/50">
          {files.length} file{files.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {files.map((file, index) => (
          <div key={index} className="file-item group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 truncate">
                    Original: <span className="font-medium text-white">{file.originalName}</span>
                  </p>
                  <p className="text-sm font-medium text-white truncate">
                    Renamed: <span className="text-violet-300 bg-violet-900/50 px-2 py-0.5 rounded">{file.newName}</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs font-medium rounded-full border border-green-200/50">
                  Ready
                </span>
                <svg className="w-4 h-4 text-green-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {files.length > 5 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-300">
            Showing all <span className="font-semibold text-white">{files.length}</span> files
          </p>
        </div>
      )}
    </div>
  );
};

export default FileList;
