import React, { useState } from 'react';
import './EquipmentStock.css';

const EquipmentStock = ({ onBack }) => {
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

  const handleAddNewEquipment = () => {
    console.log('Add new equipment clicked');
  };

  const handleViewFullDetail = (equipmentName) => {
    console.log(`View full detail for ${equipmentName}`);
  };

  const handleUpdateStock = (equipmentName) => {
    console.log(`Update stock for ${equipmentName}`);
  };

  // Sample equipment stock data
  const equipmentStock = [
    { 
      id: 1,
      name: 'Blood Pressure Monitor',
      brand: 'Omron',
      model: 'HEM-7120',
      available: 24,
      category: 'Diagnostic',
      price: 2500
    },
    {
      id: 2,
      name: 'Glucose Meter',
      brand: 'Accu-Check',
      model: 'Active',
      available: 15,
      category: 'Diagnostic',
      price: 1800
    },
    {
      id: 3,
      name: 'Nebulizer',
      brand: 'Philips',
      model: 'InnoSpire Essence',
      available: 8,
      category: 'Respiratory',
      price: 3500
    },
    {
      id: 4,
      name: 'Digital Thermometer',
      brand: 'Microlife',
      model: 'MT500',
      available: 32,
      category: 'Diagnostic',
      price: 850
    },
    {
      id: 5,
      name: 'Pulse Oximeter',
      brand: 'Beurer',
      model: 'PO30',
      available: 18,
      category: 'Diagnostic',
      price: 1200
    }
  ];

  return (
    <div className="equipment-stock-container">
      {/* Header */}
      <header className="equipment-stock-header">
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

      {/* Equipment Stock Content */}
      <div className="equipment-stock-content">
        <div className="content-header">
          <div className="breadcrumb-section">
            <button className="back-btn" onClick={onBack}>
              ← Back to Dashboard
            </button>
            <div className="page-title">
              <h1>Inventory › Equipment Stock ({equipmentStock.length})</h1>
              <p>List of medical equipment and devices.</p>
            </div>
          </div>
          <button className="add-equipment-btn" onClick={handleAddNewEquipment}>
            + Add New Equipment
          </button>
        </div>

        {/* Search Equipment */}
        <div className="equipment-search-section">
          <div className="equipment-search-container">
            <input
              type="text"
              placeholder="Search Equipment..."
              className="equipment-search-input"
            />
            <button className="equipment-search-btn">🔍</button>
          </div>
          
          <div className="filter-container">
            <select className="filter-select">
              <option value="">All Categories</option>
              <option value="diagnostic">Diagnostic</option>
              <option value="respiratory">Respiratory</option>
              <option value="mobility">Mobility</option>
            </select>
            
            <select className="filter-select">
              <option value="">Sort By</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="stock-asc">Stock (Low-High)</option>
              <option value="stock-desc">Stock (High-Low)</option>
            </select>
          </div>
        </div>

        {/* Equipment Stock Table */}
        <div className="equipment-stock-table-container">
          <table className="equipment-stock-table">
            <thead>
              <tr>
                <th>Equipment Name ↕</th>
                <th>Brand ↕</th>
                <th>Model ↕</th>
                <th>Available ↕</th>
                <th>Category ↕</th>
                <th>Price (Rs) ↕</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipmentStock.map((equipment) => (
                <tr key={equipment.id}>
                  <td>{equipment.name}</td>
                  <td>{equipment.brand}</td>
                  <td>{equipment.model}</td>
                  <td className={equipment.available < 10 ? 'low-stock' : ''}>{equipment.available}</td>
                  <td>{equipment.category}</td>
                  <td>{equipment.price.toLocaleString()}</td>
                  <td className="action-buttons">
                    <button 
                      className="view-detail-btn"
                      onClick={() => handleViewFullDetail(equipment.name)}
                    >
                      View Details
                    </button>
                    <button
                      className="update-stock-btn"
                      onClick={() => handleUpdateStock(equipment.name)}
                    >
                      Update Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="equipment-summary">
          <div className="summary-item">
            <span className="summary-label">Total Equipment Types:</span>
            <span className="summary-value">{equipmentStock.length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Units Available:</span>
            <span className="summary-value">{equipmentStock.reduce((sum, item) => sum + item.available, 0)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Items Low in Stock:</span>
            <span className="summary-value warning">{equipmentStock.filter(item => item.available < 10).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentStock;
