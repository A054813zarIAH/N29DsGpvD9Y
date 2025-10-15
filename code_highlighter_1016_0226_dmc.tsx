// 代码生成时间: 2025-10-16 02:26:22
import React, { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // 可根据需要选择不同的样式

// 组件用于高亮显示代码
const CodeHighlighter: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  const [highlightedCode, setHighlightedCode] = useState('');

  // 使用useEffect以确保代码在组件加载和更新时高亮
  useEffect(() => {
    // 清除旧的高亮
    hljs.highlightBlock(document.querySelector('.code-highlight'));
    // 高亮新的代码
    const result = hljs.highlight(code, { language }).value;
    setHighlightedCode(result);
  }, [code, language]);

  return (
    <pre>
      <code className={`hljs ${language}`} dangerouslySetInnerHTML={{ __html: highlightedCode }}></code>
    </pre>
  );
};

// 包装器组件，用于处理代码输入和错误处理
const CodeHighlighterWrapper: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [error, setError] = useState<Error | null>(null);

  // 处理代码更改
  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCode(event.target.value);
  };

  // 处理语言更改
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  // 渲染高亮代码或错误信息
  const renderCodeOrError = () => {
    if (error) {
      return <p>Error: {error.message}</p>;
    }
    return <CodeHighlighter code={inputCode} language={selectedLanguage} />;
  };

  return (
    <div>
      <textarea
        value={inputCode}
        onChange={handleCodeChange}
        placeholder='Enter your code here...'
        rows={10}
        cols={50}
      />
      
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        {Object.keys(hljs.getLanguages()).map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
      
      {renderCodeOrError()}
    </div>
  );
};

export default CodeHighlighterWrapper;