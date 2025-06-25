import React, { useState } from 'react';
import './MedicineGroups.css';

const MedicineGroups = ({ onBack }) => {
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

  const handleAddNewGroup = () => {
    console.log('Add new group clicked');
  };

  const handleViewFullDetail = (groupName) => {
    console.log(`View full detail for ${groupName}`);
  };

  // Sample medicine groups data
  const medicineGroups = [
    { name: 'Generic Medicine', count: '02' },
    { name: 'Diabetes', count: '32' }
  ];

  return (
    <div className="medicine-groups-container">
      {/* Header */}
      <header className="medicine-groups-header">
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

      {/* Medicine Groups Content */}
      <div className="medicine-groups-content">
        <div className="content-header">
          <div className="breadcrumb-section">
            <button className="back-btn" onClick={onBack}>
              ← Back to Dashboard
            </button>
            <div className="page-title">
              <h1>Inventory › Medicine Groups (02)</h1>
              <p>List of medicines groups.</p>
            </div>
          </div>
          <button className="add-group-btn" onClick={handleAddNewGroup}>
            + Add New Group
          </button>
        </div>

        {/* Search Medicine Groups */}
        <div className="medicine-search-container">
          <input
            type="text"
            placeholder="Search Medicine Groups..."
            className="medicine-search-input"
          />
          <button className="medicine-search-btn">🔍</button>
        </div>

        {/* Medicine Groups Table */}
        <div className="medicine-groups-table-container">
          <table className="medicine-groups-table">
            <thead>
              <tr>
                <th>Group Name ↕</th>
                <th>No of Medicines ↕</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {medicineGroups.map((group, index) => (
                <tr key={index}>
                  <td>{group.name}</td>
                  <td>{group.count}</td>
                  <td>
                    <button 
                      className="view-detail-btn"
                      onClick={() => handleViewFullDetail(group.name)}
                    >
                      View Full Detail →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicineGroups;
