import React, { useState, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const UploadPassport = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("File selected for Persona upload:", file.name);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-white flex flex-col font-sans text-slate-900">
      
      {/* Top Navigation Bar */}
      <nav className="w-full p-4 flex items-center justify-between border-b border-slate-100">
        <button
          onClick={() => navigate(-1)}
          className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition text-slate-600"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure Upload</span>
        </div>
      </nav>

      {/* Main Content Area - Full Width Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-10 flex flex-col">
        
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Upload Passport
          </h1>
          <p className="text-slate-500 mt-3 text-lg">
            Please provide a high-resolution image of your passport's photo page.
          </p>
        </header>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,.pdf"
          className="hidden" 
        />

        {/* Upload Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerUpload}
          className={`relative group w-full flex-grow min-h-[300px] border-3 border-dashed rounded-3xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-8
            ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-slate-50 hover:border-indigo-400 hover:bg-white'}`}
        >
          <div className={`mb-6 p-6 rounded-2xl transition-transform duration-500 shadow-sm 
            ${isDragging ? 'bg-indigo-600 text-white scale-110' : 'bg-white text-indigo-600 group-hover:scale-105'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>

          <div className="text-center max-w-sm">
            {selectedFile ? (
              <div className="space-y-2">
                <p className="text-xl font-bold text-indigo-600 uppercase tracking-tight">File Ready</p>
                <p className="text-slate-600 font-medium">{selectedFile.name}</p>
                <p className="text-xs text-slate-400 mt-2 italic text-center">Click or drag again to replace</p>
              </div>
            ) : (
              <>
                <p className="text-xl font-bold text-slate-800">
                  {isDragging ? "Drop to upload" : "Select passport image"}
                </p>
                <p className="text-slate-500 mt-2 font-medium">
                  Drag and drop your file here, or <span className="text-indigo-600 underline">browse computer</span>
                </p>
                <p className="text-xs text-slate-400 mt-6 uppercase tracking-widest font-bold">
                  Supports JPG, PNG or PDF
                </p>
              </>
            )}
          </div>
        </div>

        {/* Requirements Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="text-emerald-500 mt-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            </div>
            <p className="text-sm text-slate-600 font-medium">All four corners visible</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-emerald-500 mt-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            </div>
            <p className="text-sm text-slate-600 font-medium">Text is clear and legible</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-emerald-500 mt-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            </div>
            <p className="text-sm text-slate-600 font-medium">No glare or reflections</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12">
          <button
            disabled={!selectedFile}
            className={`w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-lg
              ${selectedFile 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 shadow-indigo-200' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
          >
            Continue to Verification
          </button>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full p-8 border-t border-slate-100 flex flex-col items-center justify-center bg-slate-50/50">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Identity verified by</p>
        <div className="flex items-center grayscale opacity-50 contrast-125">
           {/* Placeholder for Persona Logo */}
           <span className="text-xl font-black italic tracking-tighter text-slate-900">PERSONA</span>
        </div>
      </footer>
    </div>
  );
};

export default UploadPassport;