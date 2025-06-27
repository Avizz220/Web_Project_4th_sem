import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import CreateAccount from './components/Auth/CreateAccount'
import './App.css'

function App() {
  const handleLogin = (credentials) => {
    // Hardcoded login validation
    if (credentials.email === 'admin@crystalpharmacy.com' && credentials.password === 'admin123') {
      return true;
    }
    return false;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
