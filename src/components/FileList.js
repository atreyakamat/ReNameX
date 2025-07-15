import React, { useState } from 'react';

const FileList = ({ files, onRemoveFile, onRemoveFiles }) => {
  const [selectedFiles, setSelectedFiles] = useState(new Set());

  const handleSelectFile = (index) => {
    setSelectedFiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedFiles.size === files.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(files.map((_, index) => index)));
    }
  };

  const handleRemoveSelected = () => {
    const indicesToRemove = Array.from(selectedFiles);
    onRemoveFiles(indicesToRemove);
    setSelectedFiles(new Set());
  };

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
        <div className="flex items-center space-x-3">
          {selectedFiles.size > 0 && (
            <button
              onClick={handleRemoveSelected}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 text-sm font-medium rounded-full border border-red-500/30 hover:border-red-400/50 transition-all duration-200 flex items-center space-x-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Remove {selectedFiles.size}</span>
            </button>
          )}
          <button
            onClick={handleSelectAll}
            className="px-3 py-1 bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 hover:text-violet-300 text-sm font-medium rounded-full border border-violet-500/30 hover:border-violet-400/50 transition-all duration-200"
          >
            {selectedFiles.size === files.length ? 'Deselect All' : 'Select All'}
          </button>
          <span className="px-3 py-1 bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-800 text-sm font-medium rounded-full border border-violet-200/50">
            {files.length} file{files.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {files.map((file, index) => (
          <div key={index} className={`file-item group ${selectedFiles.has(index) ? 'ring-2 ring-violet-400 bg-gradient-to-r from-violet-800/90 to-purple-800/90' : ''}`}>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedFiles.has(index)}
                onChange={() => handleSelectFile(index)}
                className="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded focus:ring-violet-500 focus:ring-2"
              />
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
                  <button
                    onClick={() => onRemoveFile(index)}
                    className="ml-2 p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 hover:scale-110 border border-red-500/30 hover:border-red-400/50"
                    title="Remove file"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
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
