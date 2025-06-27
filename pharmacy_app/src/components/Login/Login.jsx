import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { FiMail, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { BsHospital } from 'react-icons/bs';
import { FaUserMd, FaTruck } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const loginSuccess = onLogin({ email, password, rememberMe });
    
    if (loginSuccess) {
      navigate('/dashboard');
    } else {
      setLoginError('Invalid email or password. Please try again.');
    }
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form">
          <h1>WELCOME BACK</h1>
          <p>Welcome back! Please enter your details.</p>
          
          {loginError && <div className="error-message">{loginError}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="forgot-password">
                Forgot password
              </button>
            </div>

            <button type="submit" className="sign-in-button">
              Sign in
            </button>

            <button type="button" className="google-button">
              <FcGoogle />
              Sign in with Google
            </button>

            <p className="signup-prompt">
              Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
      
      <div className="login-right">
        <div className="overlay-content">
          <div className="pharmacy-brand">
            <h1>Crystal Pharmacy</h1>
            <p className="brand-tagline">Your Health,Our Priority</p>
          </div>
          
          <div className="greeting-section">
            <h2>{getTimeBasedGreeting()}</h2>
          </div>
          
          <div className="feature-cards">
            <div className="feature-card">
              <BsHospital className="icon" />
              <span>Trusted Healthcare Partner</span>
            </div>
            <div className="feature-card">
              <FaUserMd className="icon" />
              <span>Quality Medicines & Care</span>
            </div>
            <div className="feature-card">
              <FaTruck className="icon" />
              <span>Fast & Reliable Service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
