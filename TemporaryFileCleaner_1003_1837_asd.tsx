// 代码生成时间: 2025-10-03 18:37:52
import React, { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import { ipcRenderer } from 'electron';

// Define a type for File Information
interface FileInfo {
  path: string;
  name: string;
  size: number;
  lastModified: Date;
}

// Define a type for Directory Information
interface DirectoryInfo {
  name: string;
  files: FileInfo[];
}

// TemporaryFileCleaner component
const TemporaryFileCleaner: React.FC = () => {
  const [directories, setDirectories] = useState<DirectoryInfo[]>([]);
  const [selectedDirectory, setSelectedDirectory] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<FileInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch directory contents
  const fetchDirectories = async () => {
    setIsLoading(true);
    setError("");

    try {
      const dirPath = path.join(__dirname, 'temp'); // Adjust this path according to your temp directory
      const files = await fs.promises.readdir(dirPath, { withFileTypes: true });
      const filteredFiles = files.filter((file) => file.isFile());

      const fileInfos = await Promise.all(
        filteredFiles.map(async (file) => {
          const stats = await fs.promises.stat(path.join(dirPath, file.name));
          return {
            path: path.join(dirPath, file.name),
            name: file.name,
            size: stats.size,
            lastModified: stats.mtime,
          };
        }),
      );

      setDirectories([{ name: 'Temporary Files', files: fileInfos }]);
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Select a directory and fetch its contents
  const handleDirectorySelect = (dir: DirectoryInfo) => {
    setSelectedDirectory(dir.name);
    setSelectedFiles(dir.files);
  };

  // Delete selected files
  const handleDeleteFiles = async () => {
    if (!selectedFiles.length) return;

    try {
      for (const file of selectedFiles) {
        await fs.promises.unlink(file.path);
      }

      // Reload directories to reflect changes
      fetchDirectories();
    } catch (err) {
      setError(`An error occurred while deleting files: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchDirectories();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h1>Temporary File Cleaner</h1>
          <ul>
            {directories.map((dir) => (
              <li key={dir.name} onClick={() => handleDirectorySelect(dir)}
                style={{ cursor: 'pointer' }}
              >
                {dir.name}
              </li>
            ))}
          </ul>
          <div>
            {selectedDirectory && (
              <>
                <h2>Selected Directory: {selectedDirectory}</h2>
                <ul>
                  {selectedFiles.map((file) => (
                    <li key={file.name}>{file.name} - Size: {file.size} bytes</li>
                  ))}
                </ul>
                <button onClick={handleDeleteFiles} disabled={!selectedFiles.length}>Delete Selected Files</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemporaryFileCleaner;
