import React, { useState } from 'react';
import './SalesReport.css';

const SalesReport = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="sales-report-container">
      {/* Header */}
      <header className="sales-report-header">
        <div className="header-left">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for anything here..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
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
      </header>

      {/* Sales Report Content */}
      <div className="sales-report-content">
        <div className="sales-report-title">
          <button className="back-btn" onClick={onBack}>
            ← Back to Dashboard
          </button>
          <h1>Sales Report</h1>
          <p>Detailed sales analytics and revenue insights for the pharmacy operations.</p>
        </div>

        {/* Sales Report Cards */}
        <div className="sales-report-grid">
          <div className="sales-card main-card">
            <div className="sales-icon-container">
              <div className="sales-icon-main">
                📈
              </div>
            </div>
            <div className="sales-content">
              <h2>Rs. 8,55,875</h2>
              <p>Total Sales Revenue</p>
              <div className="sales-stats">
                <span className="stat-item">
                  <span className="stat-value">1,245</span>
                  <span className="stat-label">Total Orders</span>
                </span>
                <span className="stat-item">
                  <span className="stat-value">Rs. 687</span>
                  <span className="stat-label">Avg. Order Value</span>
                </span>
              </div>
            </div>
            <button className="sales-action-main">
              View Detailed Sales Analysis →
            </button>
          </div>

          <div className="sales-card category-card">
            <div className="sales-icon-container">
              <div className="sales-icon-category">
                💊
              </div>
            </div>
            <div className="sales-content">
              <h3>Medicine Sales</h3>
              <p>Prescription and OTC medications</p>
              <div className="category-stats">
                <span className="category-number">Rs. 6,45,230</span>
                <span className="category-percentage">+18% this month</span>
              </div>
            </div>
            <button className="sales-action">
              View Details →
            </button>
          </div>

          <div className="sales-card category-card">
            <div className="sales-icon-container">
              <div className="sales-icon-category">
                🩺
              </div>
            </div>
            <div className="sales-content">
              <h3>Equipment Sales</h3>
              <p>Medical devices and equipment</p>
              <div className="category-stats">
                <span className="category-number">Rs. 1,25,890</span>
                <span className="category-percentage">+22% this month</span>
              </div>
            </div>
            <button className="sales-action">
              View Details →
            </button>
          </div>

          <div className="sales-card category-card">
            <div className="sales-icon-container">
              <div className="sales-icon-category">
                🏥
              </div>
            </div>
            <div className="sales-content">
              <h3>Healthcare Products</h3>
              <p>Wellness and healthcare items</p>
              <div className="category-stats">
                <span className="category-number">Rs. 84,755</span>
                <span className="category-percentage">+12% this month</span>
              </div>
            </div>
            <button className="sales-action">
              View Details →
            </button>
          </div>

          <div className="sales-card category-card">
            <div className="sales-icon-container">
              <div className="sales-icon-category">
                📦
              </div>
            </div>
            <div className="sales-content">
              <h3>Bulk Orders</h3>
              <p>Wholesale and institutional sales</p>
              <div className="category-stats">
                <span className="category-number">Rs. 2,45,120</span>
                <span className="category-percentage">+8% this month</span>
              </div>
            </div>
            <button className="sales-action">
              View Details →
            </button>
          </div>

          <div className="sales-card category-card">
            <div className="sales-icon-container">
              <div className="sales-icon-category">
                📊
              </div>
            </div>
            <div className="sales-content">
              <h3>Monthly Target</h3>
              <p>Progress towards sales goals</p>
              <div className="category-stats">
                <span className="category-number">89%</span>
                <span className="category-percentage achieved">Target achieved</span>
              </div>
            </div>
            <button className="sales-action">
              View Progress →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
