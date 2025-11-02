// 代码生成时间: 2025-11-02 16:47:16
import React, { useState } from 'react';
import hljs from 'highlight.js'; // Importing the highlight.js library for syntax highlighting
import './CodeHighlighter.css'; // Assuming a CSS file for styling

interface CodeHighlighterProps {
  code: string; // The code to be highlighted
  language: string; // The programming language of the code
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({ code, language }) => {
  const [highlightedCode, setHighlightedCode] = useState('');

  // Function to highlight the code using highlight.js
  const highlightCode = (code: string, language: string) => {
    try {
      // Check if the language is supported by highlight.js
      if (!hljs.getLanguage(language)) {
        throw new Error(`Language ${language} not supported by highlight.js`);
      }
      // Use highlight.js to highlight the code
      const highlighted = hljs.highlight(code, { language }).value;
      setHighlightedCode(highlighted);
    } catch (error) {
      console.error('Error highlighting code:', error);
      // In case of error, set the highlighted code to the original code
      setHighlightedCode(code);
    }
  };

  // Effect hook to highlight the code when the component mounts or when props change
  React.useEffect(() => {
    highlightCode(code, language);
  }, [code, language]);

  return (
    <pre className='code-highlighter'>
      <code dangerouslySetInnerHTML={{
        __html: highlightedCode,
      }} />
    </pre>
  );
};

export default CodeHighlighter;
