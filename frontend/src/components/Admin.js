import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import { Link } from 'react-router-dom';

function Admin() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/urls`);
        setUrls(response.data);
      } catch (err) {
        setError('Failed to fetch URL data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [API_URL]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="admin-container">
      <h1>Admin Panel - All URLs</h1>
      <Link to="/" className="home-link">← Back to Home</Link>
      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td>
                <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                  {url.originalUrl}
                </a>
              </td>
              <td>
                <a href={`${API_URL}/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
                  {`/${url.shortCode}`}
                </a>
              </td>
              <td>{url.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;