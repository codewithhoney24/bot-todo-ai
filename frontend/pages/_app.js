import '../styles/globals.css';
import { useState, useEffect } from 'react';
import React from 'react';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, verify token with backend
      const userId = localStorage.getItem('userId');
      setUser({ id: userId });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // For demo purposes, we'll simulate login
    // In a real app, you would call your backend login endpoint
    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('userId', username);
      setUser({ id: username });
      return { success: true };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">Loading...</div>;
  }

  return <Component {...pageProps} auth={{ user, login, logout }} />;
}

export default MyApp;