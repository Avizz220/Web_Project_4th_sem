import React, { useState } from 'react';
import './EquipmentStock.css';
import { FiX, FiPlusCircle, FiPackage, FiHash, FiCheckCircle } from 'react-icons/fi';

const EquipmentStock = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    model: '',
    count: ''
  });

  // State for update/delete functionality
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    model: '',
    count: ''
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddNewEquipment = () => {
    setShowAddForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEquipment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
    console.log('New equipment:', newEquipment);
    setShowAddForm(false);
    // Reset form
    setNewEquipment({
      name: '',
      model: '',
      count: ''
    });
  };

  const handleViewFullDetail = (equipmentName) => {
    console.log(`View full detail for ${equipmentName}`);
  };

  const handleUpdateStock = (equipmentName) => {
    console.log(`Update stock for ${equipmentName}`);
  };

  const handleRowClick = (equipment) => {
    setSelectedEquipment(equipment);
    setUpdateFormData(equipment);
    setShowUpdateModal(true);
  };

  const handleUpdateEquipment = (e) => {
    e.preventDefault();
    // Add your update logic here
    console.log('Updating equipment:', updateFormData);
    setShowUpdateModal(false);
  };

  const handleDeleteEquipment = () => {
    // Add your delete logic here
    console.log('Deleting equipment:', selectedEquipment);
    setShowDeleteConfirm(false);
    setShowUpdateModal(false);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Sample equipment stock data
  const equipmentStock = [
    { 
      name: 'Blood Pressure Monitor',
      model: 'HEM-7120',
      count: '24'
    },
    {
      name: 'Glucose Meter',
      model: 'Active',
      count: '15'
    },
    {
      name: 'Nebulizer',
      model: 'InnoSpire Essence',
      count: '8'
    },
    {
      name: 'Digital Thermometer',
      model: 'MT500',
      count: '32'
    },
    {
      name: 'Pulse Oximeter',
      model: 'PO30',
      count: '18'
    }
  ];

  return (
    <div className="equipment-stock-container">
      {/* Header */}
      <header className="equipment-stock-header">
        <div className="header-left">
          <button className="back-to-dashboard-btn" onClick={onBack}>
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
      </header>

      {/* Equipment Stock Content */}
      <div className="equipment-stock-content">
        <div className="content-header">
          <div className="breadcrumb-section">
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
                <th>Model ↕</th>
                <th>No of Equipments ↕</th>
              </tr>
            </thead>
            <tbody>
              {equipmentStock.map((equipment, index) => (
                <tr 
                  key={index} 
                  onClick={() => handleRowClick(equipment)}
                  className="clickable-row"
                >
                  <td>{equipment.name}</td>
                  <td>{equipment.model}</td>
                  <td>{equipment.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Equipment Form Modal */}
        {showAddForm && (
          <div className="modal-overlay">
            <div className="add-equipment-modal">
              <div className="modal-header">
                <h2>
                  <FiPlusCircle className="header-icon" />
                  Add New Equipment
                </h2>
                <button className="close-btn" onClick={() => setShowAddForm(false)}>
                  <FiX />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="equipment-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      <FiPackage className="label-icon" />
                      Equipment Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter equipment name"
                      value={newEquipment.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FiPackage className="label-icon" />
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      placeholder="Enter model number"
                      value={newEquipment.model}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FiHash className="label-icon" />
                      No of Equipments
                    </label>
                    <input
                      type="number"
                      name="count"
                      placeholder="Enter number of equipments"
                      min="0"
                      value={newEquipment.count}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>
                    <FiX /> Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    <FiCheckCircle /> Add Equipment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Update Equipment Modal */}
        {showUpdateModal && (
          <div className="modal-overlay">
            <div className="add-equipment-modal">
              <div className="modal-header">
                <h2>
                  <FiCheckCircle className="header-icon" />
                  Update Equipment
                </h2>
                <button className="close-btn" onClick={() => setShowUpdateModal(false)}>
                  <FiX />
                </button>
              </div>
              
              <form onSubmit={handleUpdateEquipment} className="equipment-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      <FiPackage className="label-icon" />
                      Equipment Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter equipment name"
                      value={updateFormData.name}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FiPackage className="label-icon" />
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      placeholder="Enter model number"
                      value={updateFormData.model}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FiHash className="label-icon" />
                      No of Equipments
                    </label>
                    <input
                      type="number"
                      name="count"
                      placeholder="Enter number of equipments"
                      min="0"
                      value={updateFormData.count}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowUpdateModal(false)}>
                    <FiX /> Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    <FiCheckCircle /> Update Equipment
                  </button>
                  <button type="button" className="delete-btn" onClick={() => setShowDeleteConfirm(true)}>
                    <FiX /> Delete Equipment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="delete-confirm-modal">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this equipment record?</p>
              <div className="button-group">
                <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </button>
                <button className="delete-btn" onClick={handleDeleteEquipment}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="equipment-summary">
          <div className="summary-item">
            <span className="summary-label">Total Equipment Types:</span>
            <span className="summary-value">{equipmentStock.length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Units Available:</span>
            <span className="summary-value">{equipmentStock.reduce((sum, item) => sum + parseInt(item.count), 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentStock;
