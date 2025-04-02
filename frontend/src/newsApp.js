import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NewsApp() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchNews = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/news/?q=${query}`
    );
    setArticles(response.data);
  };

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white p-4 rounded max-w-3xl mx-auto border">
      <h1 className="text-xl font-bold">뉴스 요약 챗봇</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-5">
        AI 관련 최신 뉴스 요약입니다.
      </p>
      <button
        className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white mb-5"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '☀️ 라이트 모드' : '🌙 다크 모드'}
      </button>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어 입력"
          className="border border-gray-300 text-black rounded px-4 py-2 w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchNews}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          검색
        </button>

        <ul className="mt-6 space-y-4">
          {articles.map((article, idx) => (
            <li
              key={idx}
              className="p-4 border rounded shadow bg-white text-black"
            >
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-gray-600">{article.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NewsApp;
