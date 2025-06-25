import React, { useState } from 'react';
import './PaymentReport.css';

const PaymentReport = ({ onBack }) => {
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
    <div className="payment-report-container">
      {/* Header */}
      <header className="payment-report-header">
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

      {/* Payment Report Content */}
      <div className="payment-report-content">
        <div className="payment-report-title">
          <button className="back-btn" onClick={onBack}>
            ← Back to Dashboard
          </button>
          <h1>Payment Report</h1>
          <p>Comprehensive payment analytics and transaction details for the pharmacy.</p>
        </div>

        {/* Payment Report Cards */}
        <div className="payment-report-grid">
          <div className="payment-card main-card">
            <div className="payment-icon-container">
              <div className="payment-icon-main">
                💳
              </div>
            </div>
            <div className="payment-content">
              <h2>523</h2>
              <p>Total Payment Transactions</p>
              <div className="payment-stats">
                <span className="stat-item">
                  <span className="stat-value">Rs. 2,45,789</span>
                  <span className="stat-label">Total Amount</span>
                </span>
                <span className="stat-item">
                  <span className="stat-value">89%</span>
                  <span className="stat-label">Success Rate</span>
                </span>
              </div>
            </div>
            <button className="payment-action-main">
              View Detailed Payment Analysis →
            </button>
          </div>

          <div className="payment-card category-card">
            <div className="payment-icon-container">
              <div className="payment-icon-category">
                🏦
              </div>
            </div>
            <div className="payment-content">
              <h3>Bank Transfers</h3>
              <p>Direct bank payment transactions</p>
              <div className="category-stats">
                <span className="category-number">245</span>
                <span className="category-percentage">+12% this month</span>
              </div>
            </div>
            <button className="payment-action">
              View Details →
            </button>
          </div>

          <div className="payment-card category-card">
            <div className="payment-icon-container">
              <div className="payment-icon-category">
                💰
              </div>
            </div>
            <div className="payment-content">
              <h3>Cash Payments</h3>
              <p>In-store cash transactions</p>
              <div className="category-stats">
                <span className="category-number">189</span>
                <span className="category-percentage">+8% this month</span>
              </div>
            </div>
            <button className="payment-action">
              View Details →
            </button>
          </div>

          <div className="payment-card category-card">
            <div className="payment-icon-container">
              <div className="payment-icon-category">
                💳
              </div>
            </div>
            <div className="payment-content">
              <h3>Card Payments</h3>
              <p>Credit and debit card transactions</p>
              <div className="category-stats">
                <span className="category-number">89</span>
                <span className="category-percentage">+15% this month</span>
              </div>
            </div>
            <button className="payment-action">
              View Details →
            </button>
          </div>

          <div className="payment-card category-card">
            <div className="payment-icon-container">
              <div className="payment-icon-category">
                📱
              </div>
            </div>
            <div className="payment-content">
              <h3>Digital Wallets</h3>
              <p>Mobile payment solutions</p>
              <div className="category-stats">
                <span className="category-number">67</span>
                <span className="category-percentage">+25% this month</span>
              </div>
            </div>
            <button className="payment-action">
              View Details →
            </button>
          </div>

          <div className="payment-card category-card">
            <div className="payment-icon-container">
              <div className="payment-icon-category">
                🔄
              </div>
            </div>
            <div className="payment-content">
              <h3>Pending Payments</h3>
              <p>Transactions awaiting clearance</p>
              <div className="category-stats">
                <span className="category-number">12</span>
                <span className="category-percentage pending">Needs attention</span>
              </div>
            </div>
            <button className="payment-action">
              Resolve Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReport;
