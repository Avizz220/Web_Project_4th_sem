import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CreateAccount.css';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import pharmacyLoginIllustration from '../../assets/pharmacy-login-illustration.js';
import googleIcon from '../../assets/google-icon.svg';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="create-account-container">
      <div className="create-account-card">
        <div className="illustration-section">
          <img src={pharmacyLoginIllustration} alt="Pharmacy Login" className="pharmacy-illustration" />
        </div>
        <div className="create-account-form">
          <h2>H2Oasis</h2>
          <h1>Create your Free Account</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-with-icon">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your Full Name here"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-with-icon">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email here"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your Password here"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group terms">
              <label className="checkbox-label">
               
              </label>
            </div>

            <button type="submit" className="create-account-btn">
              Create Account
            </button>
          </form>

          <div className="divider">
            <span>- OR -</span>
          </div>

          <button className="google-signup-btn">
            <img src={googleIcon} alt="Google" className="google-icon" />
            Sign up with Google
          </button>

          <div className="login-link">
            Already have an account? <a href="#" onClick={() => navigate('/login')}>Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
