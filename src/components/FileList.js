import React, { useEffect, useState } from 'react';
import { formatBytes } from '../lib/rename';

const FileIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const FileList = ({ files, onRemoveFiles }) => {
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Drop selections for files that no longer exist (removed or cleared)
  useEffect(() => {
    setSelectedIds(prev => {
      const existing = new Set(files.map(file => file.id));
      const next = new Set([...prev].filter(id => existing.has(id)));
      return next.size === prev.size ? prev : next;
    });
  }, [files]);

  const toggleSelected = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allSelected = files.length > 0 && selectedIds.size === files.length;

  const handleSelectAll = () => {
    setSelectedIds(allSelected ? new Set() : new Set(files.map(file => file.id)));
  };

  const handleRemoveSelected = () => {
    onRemoveFiles([...selectedIds]);
    setSelectedIds(new Set());
  };

  const title = (
    <h2 className="text-xl font-semibold text-white flex items-center">
      <FileIcon className="w-5 h-5 mr-2 text-violet-400" />
      File Preview
    </h2>
  );

  if (files.length === 0) {
    return (
      <section className="card-gradient">
        {title}
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-violet-500/15 border border-violet-400/30 rounded-full flex items-center justify-center mb-4">
            <FileIcon className="w-8 h-8 text-violet-300" />
          </div>
          <p className="text-white text-lg font-medium">No files selected</p>
          <p className="text-sm text-violet-200/70 mt-1">Your original → new names will appear here</p>
        </div>
      </section>
    );
  }

  return (
    <section className="card-gradient">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        {title}
        <div className="flex flex-wrap items-center gap-2">
          {selectedIds.size > 0 && (
            <button
              type="button"
              onClick={handleRemoveSelected}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 text-sm font-medium rounded-full border border-red-500/30 hover:border-red-400/50 transition-colors flex items-center gap-1"
            >
              <TrashIcon className="w-3 h-3" />
              <span>Remove {selectedIds.size}</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleSelectAll}
            className="px-3 py-1 bg-violet-500/20 hover:bg-violet-500/30 text-violet-200 text-sm font-medium rounded-full border border-violet-500/30 hover:border-violet-400/50 transition-colors"
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>
          <span className="px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full border border-white/15">
            {files.length} file{files.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <ul className="space-y-2 max-h-[28rem] overflow-y-auto pr-1">
        {files.map((file) => {
          const selected = selectedIds.has(file.id);
          return (
            <li key={file.id} className={`file-item group ${selected ? 'ring-2 ring-violet-400' : ''}`}>
              <label className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleSelected(file.id)}
                  className="w-4 h-4 flex-shrink-0 accent-violet-500"
                  aria-label={`Select ${file.originalName}`}
                />
                <div className="w-9 h-9 flex-shrink-0 bg-violet-500/20 border border-violet-400/30 rounded-lg flex items-center justify-center">
                  <FileIcon className="w-4 h-4 text-violet-200" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-violet-200/70 truncate" title={file.originalName}>
                    {file.originalName}
                  </p>
                  <p className="text-sm font-mono font-medium text-white truncate" title={file.newName}>
                    <span className="text-violet-400 mr-1" aria-hidden="true">→</span>
                    {file.newName}
                  </p>
                </div>
              </label>

              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                {file.adjusted && (
                  <span
                    className="hidden sm:inline px-2 py-0.5 bg-amber-500/15 text-amber-300 text-xs font-medium rounded-full border border-amber-400/30"
                    title="Another file would have the same name, so a number was added"
                  >
                    Renumbered
                  </span>
                )}
                <span className="hidden sm:inline text-xs text-violet-200/60 tabular-nums w-16 text-right">
                  {formatBytes(file.size)}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveFiles([file.id])}
                  className="p-2 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition-colors"
                  title="Remove file"
                  aria-label={`Remove ${file.originalName}`}
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FileList;
