import React, { useCallback } from 'react';

const FileUpload = ({ onFilesSelect }) => {
  const handleFileChange = useCallback((event) => {
    const selectedFiles = Array.from(event.target.files);
    onFilesSelect(selectedFiles);
  }, [onFilesSelect]);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    onFilesSelect(droppedFiles);
  }, [onFilesSelect]);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div className="card-gradient">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        Select Files
      </h2>
      
      <div
        className="border-2 border-dashed border-violet-400/50 rounded-xl p-8 text-center hover:border-violet-300/70 hover:bg-gradient-to-r hover:from-violet-900/30 hover:to-indigo-900/30 transition-all duration-300 cursor-pointer group relative overflow-hidden"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('file-input').click()}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="space-y-4 relative z-10">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-violet-200/80 to-indigo-200/80 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
            <svg className="w-8 h-8 text-violet-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          
          <div>
            <p className="text-lg font-medium text-white group-hover:text-violet-300 transition-colors">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-gray-300 mt-1">
              Select multiple files to rename in bulk
            </p>
          </div>
          
          {/* Floating elements */}
          <div className="flex justify-center space-x-4 mt-4">
            <div className="w-2 h-2 bg-violet-400 rounded-full opacity-60 animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
        
        <input
          id="file-input"
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      
      <div className="mt-4 text-xs text-gray-300 text-center">
        💡 <strong>Tip:</strong> Your files never leave your device - everything happens locally in your browser
      </div>
    </div>
  );
};

export default FileUpload;
