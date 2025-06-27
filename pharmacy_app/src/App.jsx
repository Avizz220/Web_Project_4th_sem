import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import CreateAccount from './components/Auth/CreateAccount'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in on app load
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (credentials) => {
    // Hardcoded login validation
    if (credentials.email === 'admin@crystalpharmacy.com' && credentials.password === 'admin123') {
      // Set authentication state and store token
      setIsAuthenticated(true);
      localStorage.setItem('userToken', 'authenticated');
      localStorage.setItem('userData', JSON.stringify({
        email: credentials.email,
        name: 'Admin User'
      }));
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    // Clear authentication state and stored data
    setIsAuthenticated(false);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          <Route path="/signup" element={<CreateAccount />} />
          <Route 
            path="/dashboard/*" 
            element={
              isAuthenticated ? 
              <Dashboard onLogout={handleLogout} /> : 
              <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
