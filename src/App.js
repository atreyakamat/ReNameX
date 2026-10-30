import React, { useState, useCallback, useMemo, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import FileUpload from './components/FileUpload';
import PatternInput from './components/PatternInput';
import FileList from './components/FileList';
import DownloadSection from './components/DownloadSection';
import Header from './components/Header';
import Footer from './components/Footer';
import { WarpBackground } from './components/WarpBackground';
import { computeRenames } from './lib/rename';

const fileKey = (file) => `${file.name}:${file.size}:${file.lastModified}`;

function App() {
  const [files, setFiles] = useState([]);
  const [pattern, setPattern] = useState('file_{index}');
  const [startIndex, setStartIndex] = useState(1);
  const [leadingZeros, setLeadingZeros] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');
  const nextId = useRef(0);

  // New selections are appended; picking the exact same file twice is ignored
  const handleFilesSelect = useCallback((newFiles) => {
    setFiles(prevFiles => {
      const seen = new Set(prevFiles.map(entry => fileKey(entry.file)));
      const additions = [];
      for (const file of newFiles) {
        const key = fileKey(file);
        if (seen.has(key)) continue;
        seen.add(key);
        additions.push({ id: nextId.current++, file });
      }
      return additions.length ? [...prevFiles, ...additions] : prevFiles;
    });
  }, []);

  const handleRemoveFiles = useCallback((idsToRemove) => {
    const ids = new Set(idsToRemove);
    setFiles(prevFiles => prevFiles.filter(entry => !ids.has(entry.id)));
  }, []);

  const renamedFiles = useMemo(() => {
    const renames = computeRenames(
      files.map(entry => entry.file.name),
      { pattern, startIndex, leadingZeros }
    );
    return renames.map((rename, i) => ({
      ...rename,
      id: files[i].id,
      originalFile: files[i].file,
      size: files[i].file.size,
    }));
  }, [files, pattern, startIndex, leadingZeros]);

  const totalSize = useMemo(
    () => files.reduce((sum, entry) => sum + entry.file.size, 0),
    [files]
  );

  const handleDownload = async () => {
    if (renamedFiles.length === 0) return;

    setIsDownloading(true);
    setError('');

    try {
      const zip = new JSZip();

      for (const fileData of renamedFiles) {
        zip.file(fileData.newName, fileData.originalFile);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'renamed-files.zip');
    } catch (err) {
      console.error('Error creating ZIP file:', err);
      setError('Something went wrong while creating the ZIP file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleClearFiles = () => {
    setFiles([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-950 to-indigo-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-800/30 via-purple-900/20 to-transparent"></div>

      <WarpBackground
        className="min-h-screen border-none p-0"
        perspective={200}
        beamsPerSide={4}
        beamSize={3}
        beamDelayMax={5}
        beamDelayMin={1}
        beamDuration={4}
        gridColor="rgba(139, 69, 196, 0.3)"
      >
        <main className="container mx-auto px-4 py-10 max-w-6xl relative z-10">
          <Header />

          <div className="space-y-6 mt-8">
            <FileUpload onFilesSelect={handleFilesSelect} hasFiles={files.length > 0} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PatternInput
                pattern={pattern}
                setPattern={setPattern}
                startIndex={startIndex}
                setStartIndex={setStartIndex}
                leadingZeros={leadingZeros}
                setLeadingZeros={setLeadingZeros}
              />

              <DownloadSection
                filesCount={files.length}
                totalSize={totalSize}
                onDownload={handleDownload}
                onClear={handleClearFiles}
                isDownloading={isDownloading}
                error={error}
              />
            </div>

            <FileList files={renamedFiles} onRemoveFiles={handleRemoveFiles} />
          </div>

          <Footer />
        </main>
      </WarpBackground>
    </div>
  );
}

export default App;
