import React, { useCallback, useRef, useState } from 'react';

const FileUpload = ({ onFilesSelect, hasFiles }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((event) => {
    onFilesSelect(Array.from(event.target.files));
    // Reset so selecting the same files again still fires onChange
    event.target.value = '';
  }, [onFilesSelect]);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setIsDragging(false);
    onFilesSelect(Array.from(event.dataTransfer.files));
  }, [onFilesSelect]);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDragging(false);
    }
  }, []);

  const openPicker = () => inputRef.current?.click();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPicker();
    }
  };

  return (
    <section className="card-gradient">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        Select Files
      </h2>

      <div
        role="button"
        tabIndex={0}
        aria-label="Add files to rename"
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer group relative overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-400/50 ${
          isDragging
            ? 'border-violet-300 bg-violet-800/40 scale-[1.01]'
            : 'border-violet-400/50 hover:border-violet-300/70 hover:bg-violet-900/30'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openPicker}
        onKeyDown={handleKeyDown}
      >
        <div className="space-y-4 relative z-10">
          <div className={`mx-auto w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center transition-transform duration-300 shadow-lg shadow-violet-900/50 ${
            isDragging ? 'scale-110' : 'group-hover:scale-110'
          }`}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>

          <div>
            <p className="text-lg font-medium text-white group-hover:text-violet-200 transition-colors">
              {isDragging
                ? 'Release to add files'
                : hasFiles
                  ? 'Drop more files or click to add'
                  : 'Drop files here or click to browse'}
            </p>
            <p className="text-sm text-violet-200/70 mt-1">
              Any file type · select as many as you like
            </p>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <p className="mt-4 text-xs text-violet-200/70 text-center">
        🔒 Your files never leave your device — everything happens locally in your browser
      </p>
    </section>
  );
};

export default FileUpload;
