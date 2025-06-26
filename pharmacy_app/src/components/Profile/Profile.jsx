import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ onBack }) => {
  // Set document title when component mounts
  React.useEffect(() => {
    document.title = "Application Settings | Crystal Pharmacy";
    return () => {
      document.title = "Crystal Pharmacy";
    };
  }, []);

  const [profileData, setProfileData] = useState({
    firstName: 'Peter',
    lastName: 'Griffin',
    email: 'hello@designtoproducts.io',
    birthday: { day: '09', month: '12', year: '1975' },
    gender: '',
    userId: 'siderabcdefghijklmnopqrstuvwxyz'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Get current time-based greeting
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

  // Current date formatting
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }) + ' - ' + now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBirthdayChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      birthday: {
        ...prev.birthday,
        [field]: value
      }
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    alert('Profile changes saved successfully!');
  };

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Changing password');
    alert('Password changed successfully! You will be asked to log in again with your new password after you save your changes.');
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <header className="profile-header">
        <div className="header-left">
          <button className="back-btn-header" onClick={onBack}>
            ← Back to Dashboard
          </button>
        </div>
        <div className="header-right">
          <div className="language-selector">
            <span>🌐 English (US)</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          <div className="greeting-container">
            <span className="greeting-icon">☀️</span>
            <span className="greeting-text">{getTimeBasedGreeting()}</span>
          </div>
          <div className="date-time">
            {getCurrentDate()}
          </div>
        </div>
      </header>      {/* Profile Content */}
      <div className="profile-content">
        {/* Profile Information Form */}
        <div className="profile-form-container">
          <div className="form-section">
            <h2 className="section-title">User Profile</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label required">
                  
                  FIRST NAME
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => handleProfileChange('firstName', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">LAST NAME</label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => handleProfileChange('lastName', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label required">
                  EMAIL
                
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">BIRTHDAY</label>
                <div className="birthday-inputs">
                  <select
                    value={profileData.birthday.day}
                    onChange={(e) => handleBirthdayChange('day', e.target.value)}
                    className="form-input birthday-select"
                  >
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <select
                    value={profileData.birthday.month}
                    onChange={(e) => handleBirthdayChange('month', e.target.value)}
                    className="form-input birthday-select"
                  >
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <select
                    value={profileData.birthday.year}
                    onChange={(e) => handleBirthdayChange('year', e.target.value)}
                    className="form-input birthday-select"
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 80 }, (_, i) => (
                      <option key={2024 - i} value={2024 - i}>
                        {2024 - i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">GENDER</label>
                <select
                  value={profileData.gender}
                  onChange={(e) => handleProfileChange('gender', e.target.value)}
                  className="form-input"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label className="form-label">USER ID</label>
                <input
                  type="text"
                  value={profileData.userId}
                  onChange={(e) => handleProfileChange('userId', e.target.value)}
                  className="form-input"
                  placeholder="yourname/companybrandname/userid"
                />
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveProfile}>
              SAVE CHANGES
            </button>
          </div>

          {/* Change Password Section */}
          <div className="password-section">
            <h2 className="section-title">Change Password</h2>
            
            <div className="password-form">
              <div className="form-group">
                <label className="form-label">CURRENT PASSWORD</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="password-row">
                <div className="form-group">
                  <label className="form-label">NEW PASSWORD</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">CONFIRM PASSWORD</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <button className="save-btn" onClick={handleSavePassword}>
                SAVE CHANGES
              </button>

              <p className="password-note">
                YOU WILL BE ASKED TO LOG IN AGAIN WITH YOUR NEW PASSWORD AFTER YOU SAVE YOUR CHANGES.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
