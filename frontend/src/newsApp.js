import React, { useState } from "react";
import axios from "axios";

function NewsApp() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);

  const fetchNews = async () => {
    const response = await axios.get(`http://localhost:8000/api/news/?q=${query}`);
    setArticles(response.data);
  };

  return (
    <div className="p-4">
      <h1>뉴스 요약 챗봇</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="검색어 입력" />
      <button onClick={fetchNews}>검색</button>
      <ul>
        {articles.map((article, idx) => (
          <li key={idx}>
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsApp;
