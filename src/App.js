import React, { useState, useCallback, useMemo } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import FileUpload from './components/FileUpload';
import PatternInput from './components/PatternInput';
import FileList from './components/FileList';
import DownloadSection from './components/DownloadSection';
import Header from './components/Header';
import { WarpBackground } from './components/WarpBackground';

function App() {
  const [files, setFiles] = useState([]);
  const [pattern, setPattern] = useState('file_{index}');
  const [startIndex, setStartIndex] = useState(1);
  const [leadingZeros, setLeadingZeros] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFilesSelect = useCallback((newFiles) => {
    setFiles(newFiles);
  }, []);

  const handleRemoveFile = useCallback((indexToRemove) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  }, []);

  const handleRemoveFiles = useCallback((indicesToRemove) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => !indicesToRemove.includes(index)));
  }, []);

  const generateNewName = useCallback((originalName, index) => {
    const extension = originalName.includes('.') 
      ? originalName.substring(originalName.lastIndexOf('.'))
      : '';
    
    const actualIndex = startIndex + index;
    const paddedIndex = leadingZeros > 0 
      ? actualIndex.toString().padStart(leadingZeros, '0')
      : actualIndex.toString();
    
    return pattern.replace('{index}', paddedIndex) + extension;
  }, [pattern, startIndex, leadingZeros]);

  const renamedFiles = useMemo(() => {
    return files.map((file, index) => ({
      originalFile: file,
      originalName: file.name,
      newName: generateNewName(file.name, index)
    }));
  }, [files, generateNewName]);

  const handleDownload = async () => {
    if (renamedFiles.length === 0) return;

    setIsDownloading(true);
    
    try {
      const zip = new JSZip();
      
      for (const fileData of renamedFiles) {
        zip.file(fileData.newName, fileData.originalFile);
      }
      
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'renamed-files.zip');
    } catch (error) {
      console.error('Error creating ZIP file:', error);
      alert('Error creating ZIP file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleClearFiles = () => {
    setFiles([]);
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
        <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
          <Header />
          
          <div className="space-y-6 mt-8">
            {/* Top Row - File Upload */}
            <FileUpload onFilesSelect={handleFilesSelect} />
            
            {/* Middle Row - Pattern & Download Side by Side */}
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
                onDownload={handleDownload}
                onClear={handleClearFiles}
                isDownloading={isDownloading}
              />
            </div>
            
            {/* Bottom Row - File Preview */}
            <FileList files={renamedFiles} onRemoveFile={handleRemoveFile} onRemoveFiles={handleRemoveFiles} />
          </div>
        </div>
      </WarpBackground>
    </div>
  );
}

export default App;
