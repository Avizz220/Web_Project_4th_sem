import React, { useState } from 'react';
import './Dashboard.css';
import Reports from '../Reports/Reports';
import MedicineGroups from '../MedicineGroups/MedicineGroups';
import PaymentReport from '../PaymentReport/PaymentReport';
import SalesReport from '../SalesReport/SalesReport';
import Profile from '../Profile/Profile';
import EquipmentStock from '../EquipmentStock/EquipmentStock';

const Dashboard = ({ onLogout }) => {
  const [selectedMonth, setSelectedMonth] = useState('January 2022');
  const [searchQuery, setSearchQuery] = useState('');
  const [inventoryDropdownOpen, setInventoryDropdownOpen] = useState(false);
  const [reportsDropdownOpen, setReportsDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [currentView, setCurrentView] = useState('dashboard'); // Add navigation state

  // Toggle dropdown for navigation items
  const toggleDropdown = (itemName) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };  // Navigation functions
  const navigateToReports = () => {
    setCurrentView('reports');
    setOpenDropdowns({}); // Close all dropdowns
  };

  const navigateToPaymentReport = () => {
    setCurrentView('payment-report');
    setOpenDropdowns({}); // Close all dropdowns
  };

  const navigateToSalesReport = () => {
    setCurrentView('sales-report');
    setOpenDropdowns({}); // Close all dropdowns
  };

  const navigateToMedicineGroups = () => {
    setCurrentView('medicine-groups');
    setOpenDropdowns({}); // Close all dropdowns
  };
  
  const navigateToEquipmentStock = () => {
    setCurrentView('equipment-stock');
    setOpenDropdowns({}); // Close all dropdowns
  };
  const navigateToDashboard = () => {
    setCurrentView('dashboard');
  };

  const navigateToProfile = () => {
    setCurrentView('profile');
  };

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

  const handleDownloadReport = () => {
    console.log('Downloading report...');
  };  // Render Reports component if current view is reports
  if (currentView === 'reports') {
    return <Reports onBack={navigateToDashboard} />;
  }

  // Render Payment Report component if current view is payment-report
  if (currentView === 'payment-report') {
    return <PaymentReport onBack={navigateToDashboard} />;
  }

  // Render Sales Report component if current view is sales-report
  if (currentView === 'sales-report') {
    return <SalesReport onBack={navigateToDashboard} />;
  }
  // Render Medicine Groups component if current view is medicine-groups
  if (currentView === 'medicine-groups') {
    return <MedicineGroups onBack={navigateToDashboard} />;
  }

  // Render Profile component if current view is profile
  if (currentView === 'profile') {
    return <Profile onBack={navigateToDashboard} />;
  }
  
  // Render Equipment Stock component if current view is equipment-stock
  if (currentView === 'equipment-stock') {
    return <EquipmentStock onBack={navigateToDashboard} />;
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">🏥</div>
            <h2 className="logo-text">Crystal Pharmacy</h2>
          </div>
        </div>

        <div className="user-profile">
          <div className="user-avatar">
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face" alt="User" />
          </div>
          <div className="user-info">
            <h3>Subash</h3>
            <span className="user-role">Super Admin</span>
          </div>
          <button className="user-menu-btn" onClick={onLogout} title="Logout">
            🚪
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item active">
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </div>
          
          <div className="nav-item-container">
            <div 
              className={`nav-item ${openDropdowns.inventory ? 'expanded' : ''}`}
              onClick={() => toggleDropdown('inventory')}
            >
              <span className="nav-icon">📦</span>
              <span className="nav-text">Inventory</span>
              <span className={`nav-arrow ${openDropdowns.inventory ? 'rotated' : ''}`}>▶</span>
            </div>            {openDropdowns.inventory && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={navigateToMedicineGroups}>
                  <span className="dropdown-icon">💊</span>
                  <span className="dropdown-text">Medicine Stock</span>
                </div>
                <div className="dropdown-item" onClick={navigateToEquipmentStock}>
                  <span className="dropdown-icon">🩺</span>
                  <span className="dropdown-text">Equipment Stock</span>
                </div>
              </div>
            )}
          </div>
            <div className="nav-item-container">
            <div 
              className={`nav-item ${openDropdowns.reports ? 'expanded' : ''}`}
              onClick={() => toggleDropdown('reports')}
            >
              <span className="nav-icon">📋</span>
              <span className="nav-text">Reports</span>
              <span className={`nav-arrow ${openDropdowns.reports ? 'rotated' : ''}`}>▶</span>
            </div>
            {openDropdowns.reports && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={navigateToPaymentReport}>
                  <span className="dropdown-icon">💳</span>
                  <span className="dropdown-text">Payment Report</span>
                </div>
                <div className="dropdown-item" onClick={navigateToSalesReport}>
                  <span className="dropdown-icon">�</span>
                  <span className="dropdown-text">Sales Report</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="nav-item">
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Configuration</span>
          </div>
          
          <div className="nav-item-container">
            <div 
              className={`nav-item ${openDropdowns.contact ? 'expanded' : ''}`}
              onClick={() => toggleDropdown('contact')}
            >
              <span className="nav-icon">👥</span>
              <span className="nav-text">Contact Management</span>
              <span className={`nav-arrow ${openDropdowns.contact ? 'rotated' : ''}`}>▶</span>
            </div>
            {openDropdowns.contact && (
              <div className="dropdown-menu">
                <div className="dropdown-item">
                  <span className="dropdown-icon">👤</span>
                  <span className="dropdown-text">Customers</span>
                </div>
                <div className="dropdown-item">
                  <span className="dropdown-icon">🏭</span>
                  <span className="dropdown-text">Suppliers</span>
                </div>
              </div>
            )}
          </div>
            <div className="nav-item">
            <span className="nav-icon">🔔</span>
            <span className="nav-text">Notifications</span>
            <span className="notification-badge">5</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">💬</span>
            <span className="nav-text">Chat with Visitors</span>
          </div>
          <div className="nav-item" onClick={navigateToProfile}>
            <span className="nav-icon">🛠️</span>
            <span className="nav-text">Application Settings</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">🦠</span>
            <span className="nav-text">Covid-19</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">❓</span>
            <span className="nav-text">Get Technical Help</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <p>Powered by Subash © 2023</p>
          <p>v1.1.3</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
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

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="content-header">
            <div className="page-title">
              <h1>Dashboard</h1>
              <p>A quick data overview of the inventory.</p>
            </div>
            <button className="download-report-btn" onClick={handleDownloadReport}>
              Download Report ▼
            </button>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card good">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>Good</h3>
                <p>Inventory Status</p>
              </div>
              <button className="stat-action">View Detailed Report →</button>
            </div>

            <div className="stat-card revenue">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>Rs. 8,55,875</h3>
                <p>Revenue • Jan 2022 ▼</p>
              </div>
              <button className="stat-action">View Detailed Report →</button>
            </div>

            <div className="stat-card medicines">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <h3>298</h3>
                <p>Medicines Available</p>
              </div>
              <button className="stat-action">Visit Inventory →</button>
            </div>

            <div className="stat-card shortage">
              <div className="stat-icon">⚠️</div>
              <div className="stat-content">
                <h3>01</h3>
                <p>Medicine Shortage</p>
              </div>
              <button className="stat-action">Resolve Now →</button>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bottom-section">
            <div className="section-left">
              <div className="inventory-section">
                <div className="section-header">
                  <h2>Inventory</h2>
                  <button className="section-action">Go to Configuration →</button>
                </div>
                <div className="inventory-stats">
                  <div className="inventory-item">
                    <h3>298</h3>
                    <p>Total no of Medicines</p>
                  </div>
                  <div className="inventory-item">
                    <h3>24</h3>
                    <p>Medicine Groups</p>
                  </div>
                </div>
              </div>

              <div className="pharmacy-section">
                <div className="section-header">
                  <h2>My Pharmacy</h2>
                  <button className="section-action">Go to User Management →</button>
                </div>
                <div className="pharmacy-stats">
                  <div className="pharmacy-item">
                    <h3>04</h3>
                    <p>Total no of Suppliers</p>
                  </div>
                  <div className="pharmacy-item">
                    <h3>05</h3>
                    <p>Total no of Users</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-right">
              <div className="quick-report-section">
                <div className="section-header">
                  <h2>Quick Report</h2>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="month-selector"
                  >
                    <option>January 2022</option>
                    <option>February 2022</option>
                    <option>March 2022</option>
                  </select>
                </div>
                <div className="report-stats">
                  <div className="report-item">
                    <h3>70,856</h3>
                    <p>Qty of Medicines Sold</p>
                  </div>
                  <div className="report-item">
                    <h3>5,288</h3>
                    <p>Invoices Generated</p>
                  </div>
                </div>
              </div>

              <div className="customers-section">
                <div className="section-header">
                  <h2>Customers</h2>
                  <button className="section-action">Go to Customers Page →</button>
                </div>
                <div className="customers-stats">
                  <div className="customers-item">
                    <h3>845</h3>
                    <p>Total no of Customers</p>
                  </div>
                  <div className="customers-item featured">
                    <h3>Adalimumab</h3>
                    <p>Frequently bought Item</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
