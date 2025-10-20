// 代码生成时间: 2025-10-20 12:01:00
 * This tool allows users to search within files and returns matched lines.
 */
import React, { useState, useEffect } from 'react';

interface IFileContent {
  id: string;
  content: string;
}

interface ISearchResult {
  id: string;
  lines: number[];
}

const FileSearchAndIndexTool: React.FC = () => {
  const [files, setFiles] = useState<IFileContent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Function to load file contents
  const loadFiles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Placeholder for file loading logic
      // In a real-world scenario, this would likely fetch from a server or read from local storage
      const mockFiles = [{ id: '1', content: 'Line 1\
def line 2\
ghi line 3' }];
      setFiles(mockFiles);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to search within files
  const searchWithinFiles = () => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const results = files.reduce<ISearchResult[]>((acc, file) => {
      const lines = file.content.split('\
').map((line, index) => ({
        line: line.trim(),
        index
      }));

      lines.forEach(lineObj => {
        if (lineObj.line.includes(searchQuery)) {
          acc.push({
            id: file.id,
            lines: [lineObj.index]
          });
          return;
        }
      });

      return acc;
    }, []);
    setSearchResults(results);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    searchWithinFiles();
  }, [searchQuery]);

  return (
    <div>
      <h1>File Search and Index Tool</h1>
      {error && <p>Error: {error.message}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {
            searchResults.length > 0 ? (
              <ul>
                {searchResults.map((result) => (
                  <li key={result.id}>
                    <h2>File: {result.id}</h2>
                    <ul>
                      {result.lines.map((lineNumber) => (
                        <li key={lineNumber}>Line {lineNumber + 1}: {files.find((f) => f.id === result.id)?.content.split('\
')[lineNumber]}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found.</p>
            )
          }
        </>
      )}
    </div>
  );
};

export default FileSearchAndIndexTool;
