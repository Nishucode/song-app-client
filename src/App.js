import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import SongList from './components/SongList';
import Favorites from './components/Favorites';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [token]);

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar token={token} handleLogout={handleLogout} />
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-6">Song App</h1>
          <Routes>
            <Route
              path="/"
              element={token ? <SongList token={token} /> : <Navigate to="/login" />}
            />
            <Route
              path="/favorites"
              element={token ? <Favorites token={token} /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={token ? <Navigate to="/" /> : <Login setToken={setToken} />}
            />
            <Route
              path="/register"
              element={token ? <Navigate to="/" /> : <Register setToken={setToken} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;