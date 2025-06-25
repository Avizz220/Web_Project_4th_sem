import React, { useState } from 'react'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('login') // 'login' or 'dashboard'

  const handleLogin = (credentials) => {
    // Hardcoded login validation
    if (credentials.email === 'admin@crystalpharmacy.com' && credentials.password === 'admin123') {
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  return (
    <div className="App">
      {currentPage === 'login' ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
