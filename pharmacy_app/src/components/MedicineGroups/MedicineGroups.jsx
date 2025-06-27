import React, { useState } from 'react';
import './MedicineGroups.css';
import { FiX, FiPlusCircle, FiPackage, FiDollarSign, FiCalendar, FiHash, FiCheckCircle } from 'react-icons/fi';

const MedicineGroups = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    type: '',
    count: '',
    status: 'Available',
    expiredDate: ''
  });

  // State for update/delete functionality
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    type: '',
    count: '',
    status: '',
    expiredDate: ''
  });

  const handleRowClick = (medicine) => {
    setSelectedMedicine(medicine);
    setUpdateFormData(medicine);
    setShowUpdateModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Add your update logic here
    console.log('Updating medicine:', updateFormData);
    setShowUpdateModal(false);
  };

  const handleDelete = () => {
    // Add your delete logic here
    console.log('Deleting medicine:', selectedMedicine);
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
    setShowAddForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
    console.log('New medicine:', newMedicine);
    setShowAddForm(false);
    // Reset form
    setNewMedicine({
      name: '',
      type: '',
      count: '',
      status: 'Available',
      expiredDate: ''
    });
  };

  const handleViewFullDetail = (groupName) => {
    console.log(`View full detail for ${groupName}`);
  };

  // Sample medicine groups data
  const medicineGroups = [
    { 
      name: 'Paracetamol', 
      type: 'Pain Relief',
      count: '25',
      status: 'Available',
      expiredDate: '2025-12-31'
    },
    { 
      name: 'Aspirin', 
      type: 'Blood Thinner',
      count: '15',
      status: 'Expired',
      expiredDate: '2025-01-15'
    },
    { 
      name: 'Metformin', 
      type: 'Diabetes',
      count: '40',
      status: 'Available',
      expiredDate: '2026-06-20'
    },
    { 
      name: 'Amoxicillin', 
      type: 'Antibiotic',
      count: '30',
      status: 'Available',
      expiredDate: '2025-09-10'
    }
  ];

  return (
    <div className="medicine-groups-container">
      {/* Header */}
      <header className="medicine-groups-header">
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

      {/* Medicine Groups Content */}
      <div className="medicine-groups-content">
        <div className="content-header">
          <div className="breadcrumb-section">
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
                <th>Medicine Name ↕</th>
                <th>Medicine Type ↕</th>
                <th>No of Medicines ↕</th>
                <th>Status ↕</th>
                <th>Expired Date ↕</th>
              </tr>
            </thead>
            <tbody>
              {medicineGroups.map((medicine, index) => (
                <tr 
                  key={index} 
                  onClick={() => handleRowClick(medicine)}
                  className="clickable-row"
                >
                  <td>{medicine.name}</td>
                  <td>{medicine.type}</td>
                  <td>{medicine.count}</td>
                  <td>
                    <span className={`status-badge ${medicine.status.toLowerCase()}`}>
                      {medicine.status}
                    </span>
                  </td>
                  <td>{medicine.expiredDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Medicine Form Modal */}
        {showAddForm && (
          <div className="modal-overlay">
            <div className="add-medicine-modal">
              <div className="modal-header">
                <h2>
                  <FiPlusCircle className="header-icon" />
                  Add New Medicine
                </h2>
                <button className="close-btn" onClick={() => setShowAddForm(false)}>
                  <FiX />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="medicine-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      <FiPackage className="label-icon" />
                      Medicine Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter medicine name"
                      value={newMedicine.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FiPackage className="label-icon" />
                      Medicine Type
                    </label>
                    <select
                      name="type"
                      value={newMedicine.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Medicine Type</option>
                      <option value="Pain Relief">Pain Relief</option>
                      <option value="Diabetes">Diabetes</option>
                      <option value="Blood Thinner">Blood Thinner</option>
                      <option value="Antibiotic">Antibiotic</option>
                      <option value="Cardiovascular">Cardiovascular</option>
                      <option value="Vitamins">Vitamins</option>
                      <option value="Respiratory">Respiratory</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      <FiHash className="label-icon" />
                      No of Medicines
                    </label>
                    <input
                      type="number"
                      name="count"
                      placeholder="Enter number of medicines"
                      min="0"
                      value={newMedicine.count}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FiCheckCircle className="label-icon" />
                      Status
                    </label>
                    <select
                      name="status"
                      value={newMedicine.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Available">Available</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      <FiCalendar className="label-icon" />
                      Expired Date
                    </label>
                    <input
                      type="date"
                      name="expiredDate"
                      value={newMedicine.expiredDate}
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
                    <FiCheckCircle /> Add Medicine
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Update Medicine Modal */}
        {showUpdateModal && (
          <div className="modal-overlay">
            <div className="add-medicine-modal">
              <div className="modal-header">
                <h2>
                  <FiCheckCircle className="header-icon" />
                  Update Medicine
                </h2>
                <button className="close-btn" onClick={() => setShowUpdateModal(false)}>
                  <FiX />
                </button>
              </div>
              
              <form onSubmit={handleUpdate} className="medicine-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      <FiPackage className="label-icon" />
                      Medicine Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter medicine name"
                      value={updateFormData.name}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FiPackage className="label-icon" />
                      Medicine Type
                    </label>
                    <select
                      name="type"
                      value={updateFormData.type}
                      onChange={handleUpdateInputChange}
                      required
                    >
                      <option value="">Select Medicine Type</option>
                      <option value="Pain Relief">Pain Relief</option>
                      <option value="Diabetes">Diabetes</option>
                      <option value="Blood Thinner">Blood Thinner</option>
                      <option value="Antibiotic">Antibiotic</option>
                      <option value="Cardiovascular">Cardiovascular</option>
                      <option value="Vitamins">Vitamins</option>
                      <option value="Respiratory">Respiratory</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      <FiHash className="label-icon" />
                      No of Medicines
                    </label>
                    <input
                      type="number"
                      name="count"
                      placeholder="Enter number of medicines"
                      min="0"
                      value={updateFormData.count}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FiCheckCircle className="label-icon" />
                      Status
                    </label>
                    <select
                      name="status"
                      value={updateFormData.status}
                      onChange={handleUpdateInputChange}
                      required
                    >
                      <option value="Available">Available</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      <FiCalendar className="label-icon" />
                      Expired Date
                    </label>
                    <input
                      type="date"
                      name="expiredDate"
                      value={updateFormData.expiredDate}
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
                    <FiCheckCircle /> Update Medicine
                  </button>
                  <button type="button" className="delete-btn" onClick={() => setShowDeleteConfirm(true)}>
                    <FiX /> Delete Medicine
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
              <p>Are you sure you want to delete this medicine record?</p>
              <div className="button-group">
                <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineGroups;
