import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    
    // Call the login function passed from App component
    const loginSuccess = onLogin({ email, password, rememberMe });
    
    if (!loginSuccess) {
      setLoginError('Invalid email or password. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
    // Add Google sign in logic here
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Add forgot password logic here
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form-container">          <div className="login-header">
            <h1>WELCOME BACK</h1>
            <p>Welcome back! Please enter your details.</p>
            
            {/* Demo credentials info */}
            <div className="demo-credentials">
              <h4>Demo Login Credentials:</h4>
              <p><strong>Email:</strong> admin@crystalpharmacy.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>          <form onSubmit={handleSubmit} className="login-form">
            {/* Error message */}
            {loginError && (
              <div className="error-message">
                {loginError}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button 
                type="button" 
                className="forgot-password"
                onClick={handleForgotPassword}
              >
                Forgot password
              </button>
            </div>

            <button type="submit" className="sign-in-btn">
              Login
            </button>

            <button 
              type="button" 
              className="google-sign-in-btn"
              onClick={handleGoogleSignIn}
            >
              <svg className="google-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </form>

          <div className="signup-link">
            Don't have an account? 
            <button type="button" className="signup-btn">
              Sign up 
            </button>
          </div>
        </div>
      </div>      <div className="login-right">
        <div className="pharmacy-image-container">
          <img 
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2130&q=80" 
            alt="Medical Pills and Medicines"
            className="pharmacy-image"
            loading="lazy"
          />          <div className="image-overlay">
            <div className="overlay-content">
              <div className="pharmacy-brand">
                <h1 className="pharmacy-name">Crystal Pharmacy</h1>
                <div className="brand-tagline">Your Health, Our Priority</div>
              </div>
              
              <div className="welcome-section">
                <h2 className="time-greeting">{getTimeBasedGreeting()}</h2>
               
              </div>

              <div className="pharmacy-info">
                <div className="info-item">
                  <span className="info-icon">🏥</span>
                  <span>Trusted Healthcare Partner</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">💊</span>
                  <span>Quality Medicines & Care</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">⚡</span>
                  <span>Fast & Reliable Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
