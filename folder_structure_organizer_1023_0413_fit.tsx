// 代码生成时间: 2025-10-23 04:13:50
// folder_structure_organizer.tsx
// This React component is a folder structure organizer which helps to visualize and manage files and folders.

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { FaFolderOpen, FaSpinner, FaTimes } from 'react-icons/fa';
import './FolderStructureOrganizer.css';

interface FolderStructureOrganizerProps {
  onDrop: (acceptedFiles: File[]) => void;
  onRemove?: (file: File) => void;
}

const FolderStructureOrganizer: React.FC<FolderStructureOrganizerProps> = ({ onDrop, onRemove }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Function to handle drop events
  const onDropAccepted = (acceptedFiles: File[]) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    onDrop(acceptedFiles);
  };

  // Function to handle rejected files
  const onDropRejected = () => {
    setIsError(true);
    setErrorMessage("Only folder structures are allowed.");
  };

  // Effect to handle loading state
  useEffect(() => {
    setIsLoading(false);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'application/x-folder',
    onDrop: onDropAccepted,
    onDropRejected: onDropRejected,
  });

  return (
    <div {...getRootProps()} className="folder-structure-organizer">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the folder structure here...</p>
      ) : (
        <p>Drag 'n' drop a folder structure or click to select folders</p>
      )}
      {isLoading && (
        <div className="loading">
          <FaSpinner className="spinner" spin /> Loading...
        </div>
      )}
      {isError && (
        <div className="error">
          <FaTimes className="times" /> {errorMessage}
        </div>
      )}
    </div>
  );
};

export default FolderStructureOrganizer;
