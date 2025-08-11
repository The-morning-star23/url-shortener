import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl('');
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/shorten`, { originalUrl });
      const fullShortUrl = `${API_URL}/${response.data.shortCode}`;
      setShortUrl(fullShortUrl);
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <h1>URL Shortener</h1>
        <p>Enter a long URL to generate a short link.</p>
        <Link to="/admin" className="admin-link">Go to Admin Panel →</Link>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="https://example.com"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Shortening...' : 'Shorten'}
          </button>
        </form>

        <div className="result-container">
          {error && <p className="error">{error}</p>}
          {shortUrl && (
            <div className="result">
              <p>Shortened URL:</p>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;