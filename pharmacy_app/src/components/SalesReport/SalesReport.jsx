import React, { useState, useEffect } from 'react';
import './SalesReport.css';
import './blue-card.css';
import '../modal-fix.css';
import { FiSearch, FiChevronLeft, FiDownload, FiCalendar, FiFilter, FiDollarSign, FiPieChart, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { HiOutlineCubeTransparent, HiOutlineShoppingBag, HiOutlineBeaker, HiOutlineClipboardCheck, HiOutlineScale, HiOutlineExclamation } from 'react-icons/hi';

const SalesReport = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  
  // State for handling popup
  const [selectedSale, setSelectedSale] = useState(null);
  const [showActionPopup, setShowActionPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  
  // State for update form
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    id: '',
    type: '',
    date: '',
    customer: '',
    amount: '',
    status: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // State for add sale form
  const [showAddSaleForm, setShowAddSaleForm] = useState(false);
  const [newSaleData, setNewSaleData] = useState({
    type: 'Medicine',
    date: new Date().toISOString().split('T')[0],
    customer: '',
    amount: '',
    status: 'Completed'
  });

  // State for delete confirmation modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  // Sample sales data
  const salesData = [
    {
      id: 'SALE-2025-001',
      type: 'Medicine',
      date: '2025-06-25',
      customer: 'John Doe',
      amount: 'Rs. 2,500',
      status: 'Completed'
    },
    {
      id: 'SALE-2025-002',
      type: 'Equipment',
      date: '2025-06-24',
      customer: 'Jane Smith',
      amount: 'Rs. 7,800',
      status: 'Completed'
    },
    {
      id: 'SALE-2025-003',
      type: 'Healthcare',
      date: '2025-06-23',
      customer: 'Acme Corp',
      amount: 'Rs. 1,200',
      status: 'Pending'
    },
    {
      id: 'SALE-2025-004',
      type: 'Bulk',
      date: '2025-06-22',
      customer: 'Pharma Wholesale',
      amount: 'Rs. 15,000',
      status: 'Completed'
    },
    {
      id: 'SALE-2025-005',
      type: 'Medicine',
      date: '2025-06-21',
      customer: 'Mary Jane',
      amount: 'Rs. 3,400',
      status: 'Pending'
    },
    {
      id: 'SALE-2025-006',
      type: 'Equipment',
      date: '2025-06-20',
      customer: 'Metro Hospital',
      amount: 'Rs. 9,600',
      status: 'Completed'
    },
    {
      id: 'SALE-2025-007',
      type: 'Healthcare',
      date: '2025-06-19',
      customer: 'Sarah Williams',
      amount: 'Rs. 2,800',
      status: 'Completed'
    },
    {
      id: 'SALE-2025-008',
      type: 'Medicine',
      date: '2025-06-18',
      customer: 'Robert Brown',
      amount: 'Rs. 1,750',
      status: 'Pending'
    },
    {
      id: 'SALE-2025-009',
      type: 'Bulk',
      date: '2025-06-17',
      customer: 'City Clinic',
      amount: 'Rs. 18,200',
      status: 'Completed'
    },
    {
      id: 'SALE-2025-010',
      type: 'Equipment',
      date: '2025-06-16',
      customer: 'Health Center',
      amount: 'Rs. 6,400',
      status: 'Completed'
    }
  ];

  // Filter sales
  const filteredSales = salesData.filter(sale => {
    const matchesSearch = 
      sale.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.amount.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || sale.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'all' || sale.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSales.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate sales stats
  const medicineSales = salesData.filter(s => s.type === 'Medicine').length;
  const equipmentSales = salesData.filter(s => s.type === 'Equipment').length;
  const healthcareSales = salesData.filter(s => s.type === 'Healthcare').length;
  const bulkSales = salesData.filter(s => s.type === 'Bulk').length;
  const pendingSales = salesData.filter(s => s.status === 'Pending').length;
  
  // Calculate total sales amount
  const totalAmount = salesData.reduce((sum, sale) => {
    const amount = Number(sale.amount.replace(/[^0-9.-]+/g, ''));
    return sum + amount;
  }, 0).toLocaleString('en-IN');

  // Handle row click to show action popup
  const handleRowClick = (sale, event) => {
    // Calculate position for the popup
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY
    });
    
    setSelectedSale(sale);
    setShowActionPopup(true);
  };

  // Close the popup
  const closePopup = () => {
    setShowActionPopup(false);
    setSelectedSale(null);
  };

  // Handle update action
  const handleUpdate = () => {
    // Prepare form data from selected sale
    const amountValue = selectedSale.amount.replace(/[^0-9.-]+/g, '');
    
    setUpdateFormData({
      id: selectedSale.id,
      type: selectedSale.type,
      date: selectedSale.date,
      customer: selectedSale.customer,
      amount: amountValue,
      status: selectedSale.status
    });
    
    // Close popup and show update form
    setShowActionPopup(false);
    setShowUpdateForm(true);
  };

  // Handle update form input changes
  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({
      ...updateFormData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Validate update form
  const validateUpdateForm = () => {
    const errors = {};
    
    if (!updateFormData.customer.trim()) errors.customer = "Customer name is required";
    if (!updateFormData.date) errors.date = "Date is required";
    
    // Validate amount is a number
    if (!updateFormData.amount) {
      errors.amount = "Amount is required";
    } else if (isNaN(updateFormData.amount) || parseFloat(updateFormData.amount) <= 0) {
      errors.amount = "Amount must be a positive number";
    }
    
    return errors;
  };

  // Handle update form submission
  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateUpdateForm();
    setFormErrors(validationErrors);
    
    // If no errors, update the sale
    if (Object.keys(validationErrors).length === 0) {
      console.log('Updating sale with data:', updateFormData);
      
      // Here you would typically call an API to update the sale
      // For now, we'll just simulate it with a success message
      alert(`Sale ${updateFormData.id} has been updated successfully!`);
      
      // Close the form
      setShowUpdateForm(false);
      setSelectedSale(null);
    }
  };

  // Close update form
  const closeUpdateForm = () => {
    setShowUpdateForm(false);
    setFormErrors({});
  };

  // Add Sale Form Handlers
  const handleNewSaleChange = (e) => {
    const { name, value } = e.target;
    console.log('Changing sale form field:', name, value); // Debug log
    setNewSaleData({
      ...newSaleData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateSaleForm = () => {
    const errors = {};
    
    if (!newSaleData.customer.trim()) errors.customer = "Customer name is required";
    if (!newSaleData.date) errors.date = "Date is required";
    
    // Validate amount is a number
    if (!newSaleData.amount) {
      errors.amount = "Amount is required";
    } else if (isNaN(newSaleData.amount) || parseFloat(newSaleData.amount) <= 0) {
      errors.amount = "Amount must be a positive number";
    }
    
    return errors;
  };

  const handleAddSaleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateSaleForm();
    setFormErrors(validationErrors);
    
    // If no errors, add the sale
    if (Object.keys(validationErrors).length === 0) {
      console.log('Adding new sale with data:', newSaleData);
      
      // Here you would typically call an API to add the sale
      // For now, we'll just simulate it with a success message
      alert(`New sale to ${newSaleData.customer} has been added successfully!`);
      
      // Close the form
      setShowAddSaleForm(false);
    }
  };

  // Handle delete action
  const handleDelete = () => {
    setShowActionPopup(false);
    setShowDeleteConfirm(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    console.log('Deleting sale:', selectedSale);
    
    // Here you would typically call an API to delete the sale
    // For now, we'll just simulate it with a success message
    alert(`Sale ${selectedSale.id} has been deleted successfully!`);
    
    // Close modals and reset state
    setShowDeleteConfirm(false);
    setSelectedSale(null);
  };

  // Handle clicks outside the popup to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showActionPopup && !event.target.closest('.action-popup') && 
          !event.target.closest('.sales-table tr')) {
        closePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActionPopup]);

  return (
    <div className="sales-report-container">
      {/* Header */}
      <header className="sales-report-header">
        <div className="header-left">
          <button className="header-back-btn" onClick={onBack}>
            <FiChevronLeft /> Back to Dashboard
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

      {/* Sales Report Content */}
      <div className="sales-report-content">
        <div className="sales-report-title">
          <h1>Sales Report</h1>
          <p>Detailed sales analytics and revenue insights for the pharmacy operations.</p>
        </div>

        {/* Filter Controls */}
        <div className="payment-controls">
          <div className="payment-search">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search sales..."
              value={searchQuery}
              onChange={handleSearch}
              className="payment-search-input"
            />
          </div>
          
          <div className="filter-controls">
            <div className="filter-group">
              <label><FiFilter /> Sale Type:</label>
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Types</option>
                <option value="medicine">Medicine</option>
                <option value="equipment">Equipment</option>
                <option value="healthcare">Healthcare</option>
                <option value="bulk">Bulk</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label><FiCalendar /> Status:</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            <button className="export-btn">
              <FiDownload /> Export Report
            </button>
            
            <button className="add-sale-btn" onClick={() => {
              console.log('Opening Add Sale form');
              setShowAddSaleForm(true);
            }}>
              <FiDollarSign /> Add Sale
            </button>
          </div>
        </div>

        {/* Sales Table */}
        <div className="sales-table-container">
          <table className="sales-table">
            <thead>
              <tr>
                <th>Sale ID</th>
                <th>Sale Type</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((sale) => (
                <tr 
                  key={sale.id}
                  onClick={(event) => handleRowClick(sale, event)}
                  className="clickable-row"
                >
                  <td>{sale.id}</td>
                  <td>{sale.type}</td>
                  <td>{sale.date}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.amount}</td>
                  <td>
                    <span className={`status-badge ${sale.status.toLowerCase()}`}>
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSales.length)} of {filteredSales.length} sales
          </div>
          <div className="pagination-controls">
            <button 
              className="pagination-btn" 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            
            <button 
              className="pagination-btn" 
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Sales Categories Summary */}
        <div className="sales-summary-title">
          <h2>Sales Categories</h2>
          <p>Overview of different sales types and their statistics</p>
        </div>

        <div className="sales-categories-grid">
          <div className="sales-summary-card total blue-card">
            <div className="card-header">
              <FiPieChart className="card-icon" />
              <div className="card-title">
                <h3>All Sales</h3>
                <p>Total sales activities</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-value">{salesData.length}</div>
              <div className="stat-amount">Rs. {totalAmount}</div>
            </div>
            <div className="card-footer">
              <div className="success-rate">
                <span className="rate-label">Completion Rate:</span>
                <span className="rate-value">{Math.round((salesData.length - pendingSales) / salesData.length * 100)}%</span>
              </div>
            </div>
          </div>

          <div className="sales-summary-card medicine">
            <div className="card-header">
              <HiOutlineBeaker className="card-icon" />
              <div className="card-title">
                <h3>Medicine Sales</h3>
                <p>Pharmaceutical product sales</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-value">{medicineSales}</div>
            </div>
            <div className="card-footer">
              <div className="trend">
                <span className="trend-positive">↗ 15% this month</span>
              </div>
            </div>
          </div>

          <div className="sales-summary-card equipment">
            <div className="card-header">
              <HiOutlineCubeTransparent className="card-icon" />
              <div className="card-title">
                <h3>Equipment Sales</h3>
                <p>Medical equipment transactions</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-value">{equipmentSales}</div>
            </div>
            <div className="card-footer">
              <div className="trend">
                <span className="trend-positive">↗ 8% this month</span>
              </div>
            </div>
          </div>

          <div className="sales-summary-card healthcare">
            <div className="card-header">
              <HiOutlineShoppingBag className="card-icon" />
              <div className="card-title">
                <h3>Healthcare Products</h3>
                <p>Wellness and healthcare items</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-value">{healthcareSales}</div>
            </div>
            <div className="card-footer">
              <div className="trend">
                <span className="trend-positive">↗ 12% this month</span>
              </div>
            </div>
          </div>

          <div className="sales-summary-card bulk">
            <div className="card-header">
              <HiOutlineScale className="card-icon" />
              <div className="card-title">
                <h3>Bulk Orders</h3>
                <p>Large volume sales to institutions</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-value">{bulkSales}</div>
            </div>
            <div className="card-footer">
              <div className="trend">
                <span className="trend-positive">↗ 20% this month</span>
              </div>
            </div>
          </div>

          <div className="sales-summary-card pending">
            <div className="card-header">
              <HiOutlineExclamation className="card-icon" />
              <div className="card-title">
                <h3>Pending Sales</h3>
                <p>Transactions awaiting completion</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-value">{pendingSales}</div>
            </div>
            <div className="card-footer">
              <div className="trend">
                <span className="trend-attention">Needs attention</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Popup */}
        {showActionPopup && selectedSale && (
          <div className="action-popup" style={{ left: popupPosition.x, top: popupPosition.y }}>
            <div className="popup-content">
              <h3>Sale Details</h3>
              <div className="popup-field">
                <strong>Sale ID:</strong> {selectedSale.id}
              </div>
              <div className="popup-field">
                <strong>Type:</strong> {selectedSale.type}
              </div>
              <div className="popup-field">
                <strong>Date:</strong> {formatDate(selectedSale.date)}
              </div>
              <div className="popup-field">
                <strong>Customer:</strong> {selectedSale.customer}
              </div>
              <div className="popup-field">
                <strong>Amount:</strong> {selectedSale.amount}
              </div>
              <div className="popup-field">
                <strong>Status:</strong> {selectedSale.status}
              </div>

              <div className="popup-actions">
                <button className="btn-update" onClick={handleUpdate}>
                  <FiEdit /> Update
                </button>
                <button className="btn-delete" onClick={handleDelete}>
                  <FiTrash2 /> Delete
                </button>
              </div>
              <button className="btn-close" onClick={closePopup}>
                <FiX />
              </button>
            </div>
          </div>
        )}
        
        {/* Update Sale Form */}
        {showUpdateForm && (
          <div className="modal-overlay">
            <div className="sale-update-modal">
              <div className="modal-header">
                <h2>Update Sale</h2>
                <button className="close-modal-btn" onClick={closeUpdateForm}>
                  <FiX />
                </button>
              </div>
              
              <form onSubmit={handleUpdateFormSubmit} className="sale-update-form">
                <div className="form-content">
                  <div className="form-group">
                    <label htmlFor="id">Sale ID</label>
                    <input
                      type="text"
                      id="id"
                      name="id"
                      value={updateFormData.id}
                      disabled
                      className="readonly-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="customer">Customer <span className="required-mark">*</span></label>
                    <input
                      type="text"
                      id="customer"
                      name="customer"
                      value={updateFormData.customer}
                      onChange={handleUpdateFormChange}
                      className={formErrors.customer ? 'error' : ''}
                      placeholder="Enter customer name"
                    />
                    {formErrors.customer && <span className="error-message">{formErrors.customer}</span>}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="type">Sale Type <span className="required-mark">*</span></label>
                      <select
                        id="type"
                        name="type"
                        value={updateFormData.type}
                        onChange={handleUpdateFormChange}
                        className={formErrors.type ? 'error' : ''}
                      >
                        <option value="Medicine">Medicine</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Bulk">Bulk</option>
                      </select>
                      {formErrors.type && <span className="error-message">{formErrors.type}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="status">Status <span className="required-mark">*</span></label>
                      <select
                        id="status"
                        name="status"
                        value={updateFormData.status}
                        onChange={handleUpdateFormChange}
                        className={formErrors.status ? 'error' : ''}
                      >
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                      </select>
                      {formErrors.status && <span className="error-message">{formErrors.status}</span>}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="date">Date <span className="required-mark">*</span></label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={updateFormData.date}
                        onChange={handleUpdateFormChange}
                        className={formErrors.date ? 'error' : ''}
                      />
                      {formErrors.date && <span className="error-message">{formErrors.date}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="amount">Amount (Rs.) <span className="required-mark">*</span></label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={updateFormData.amount}
                        onChange={handleUpdateFormChange}
                        className={formErrors.amount ? 'error' : ''}
                        placeholder="Enter amount"
                        step="0.01"
                        min="0"
                      />
                      {formErrors.amount && <span className="error-message">{formErrors.amount}</span>}
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={closeUpdateForm}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Update Sale
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && selectedSale && (
          <div className="modal-overlay">
            <div className="delete-confirm-modal">
              <div className="modal-header">
                <h3>Confirm Delete</h3>
                <button className="close-modal-btn" onClick={() => setShowDeleteConfirm(false)}>
                  <FiX />
                </button>
              </div>
              <div className="delete-content">
                <p>Are you sure you want to delete this sale record?</p>
                <div className="sale-details">
                  <strong>Sale ID:</strong> {selectedSale.id}<br />
                  <strong>Customer:</strong> {selectedSale.customer}<br />
                  <strong>Amount:</strong> {selectedSale.amount}
                </div>
                <p className="warning-text">This action cannot be undone.</p>
              </div>
              <div className="form-actions">
                <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </button>
                <button className="delete-btn" onClick={confirmDelete}>
                  <FiTrash2 /> Delete Sale
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Sale Modal */}
        {showAddSaleForm && (
          <div className="modal-overlay">
            <div className="sale-update-modal">
              <div className="modal-header">
                <h2>Add New Sale</h2>
                <button className="close-modal-btn" onClick={() => {
                  setShowAddSaleForm(false);
                  setFormErrors({});
                  setNewSaleData({
                    type: 'Medicine',
                    date: new Date().toISOString().split('T')[0],
                    customer: '',
                    amount: '',
                    status: 'Completed'
                  });
                }}>
                  <FiX />
                </button>
              </div>
              
              <form onSubmit={handleAddSaleSubmit} className="sale-update-form">
                <div className="form-content">
                  <div className="form-group">
                    <label htmlFor="newCustomer">Customer <span className="required-mark">*</span></label>
                    <input
                      type="text"
                      id="newCustomer"
                      name="customer"
                      value={newSaleData.customer}
                      onChange={handleNewSaleChange}
                      className={formErrors.customer ? 'error' : ''}
                      placeholder="Enter customer name"
                    />
                    {formErrors.customer && <span className="error-message">{formErrors.customer}</span>}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="newType">Sale Type <span className="required-mark">*</span></label>
                      <select
                        id="newType"
                        name="type"
                        value={newSaleData.type}
                        onChange={handleNewSaleChange}
                        className={formErrors.type ? 'error' : ''}
                      >
                        <option value="Medicine">Medicine</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Bulk">Bulk</option>
                      </select>
                      {formErrors.type && <span className="error-message">{formErrors.type}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newStatus">Status <span className="required-mark">*</span></label>
                      <select
                        id="newStatus"
                        name="status"
                        value={newSaleData.status}
                        onChange={handleNewSaleChange}
                        className={formErrors.status ? 'error' : ''}
                      >
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                      </select>
                      {formErrors.status && <span className="error-message">{formErrors.status}</span>}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="newDate">Date <span className="required-mark">*</span></label>
                      <input
                        type="date"
                        id="newDate"
                        name="date"
                        value={newSaleData.date}
                        onChange={handleNewSaleChange}
                        className={formErrors.date ? 'error' : ''}
                      />
                      {formErrors.date && <span className="error-message">{formErrors.date}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newAmount">Amount (Rs.) <span className="required-mark">*</span></label>
                      <input
                        type="number"
                        id="newAmount"
                        name="amount"
                        value={newSaleData.amount}
                        onChange={handleNewSaleChange}
                        className={formErrors.amount ? 'error' : ''}
                        placeholder="Enter amount"
                        step="0.01"
                        min="0"
                      />
                      {formErrors.amount && <span className="error-message">{formErrors.amount}</span>}
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => {
                    setShowAddSaleForm(false);
                    setFormErrors({});
                    setNewSaleData({
                      type: 'Medicine',
                      date: new Date().toISOString().split('T')[0],
                      customer: '',
                      amount: '',
                      status: 'Completed'
                    });
                  }}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Add Sale
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesReport;
