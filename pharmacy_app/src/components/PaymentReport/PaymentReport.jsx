import React, { useState } from 'react';
import './PaymentReport.css';
import './blue-card.css';
import './payment-update-modal.css';
import { FiSearch, FiChevronLeft, FiDownload, FiCalendar, FiFilter, FiPieChart, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { HiOutlineCreditCard, HiOutlineCash, HiOutlineGlobe, HiOutlinePhone, HiOutlineRefresh, HiOutlineCurrencyDollar } from 'react-icons/hi';

const PaymentReport = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

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

  // Sample payment data
  const paymentData = [
    {
      id: 'PAY-2025-001',
      type: 'Bank Transfer',
      date: '2025-06-25',
      supplier: 'Johnson Medical',
      amount: 'Rs. 35,750',
      status: 'Done'
    },
    {
      id: 'PAY-2025-002',
      type: 'Digital Wallet',
      date: '2025-06-24',
      supplier: 'MedEquip Solutions',
      amount: 'Rs. 12,450',
      status: 'Done'
    },
    {
      id: 'PAY-2025-003',
      type: 'Cash',
      date: '2025-06-23',
      supplier: 'PharmaPro Labs',
      amount: 'Rs. 8,900',
      status: 'Done'
    },
    {
      id: 'PAY-2025-004',
      type: 'Credit Card',
      date: '2025-06-22',
      supplier: 'Global Pharma',
      amount: 'Rs. 22,600',
      status: 'Done'
    },
    {
      id: 'PAY-2025-005',
      type: 'Bank Transfer',
      date: '2025-06-21',
      supplier: 'MediTech Supplies',
      amount: 'Rs. 45,300',
      status: 'Pending'
    },
    {
      id: 'PAY-2025-006',
      type: 'Digital Wallet',
      date: '2025-06-20',
      supplier: 'HealthEquip',
      amount: 'Rs. 18,750',
      status: 'Pending'
    },
    {
      id: 'PAY-2025-007',
      type: 'Bank Transfer',
      date: '2025-06-19',
      supplier: 'MedSource',
      amount: 'Rs. 32,800',
      status: 'Done'
    },
    {
      id: 'PAY-2025-008',
      type: 'Cash',
      date: '2025-06-18',
      supplier: 'Johnson Medical',
      amount: 'Rs. 9,650',
      status: 'Done'
    },
    {
      id: 'PAY-2025-009',
      type: 'Credit Card',
      date: '2025-06-17',
      supplier: 'PharmaDistribution',
      amount: 'Rs. 27,400',
      status: 'Pending'
    },
    {
      id: 'PAY-2025-010',
      type: 'Digital Wallet',
      date: '2025-06-16',
      supplier: 'MedEquip Solutions',
      amount: 'Rs. 14,200',
      status: 'Done'
    },
    {
      id: 'PAY-2025-011',
      type: 'Bank Transfer',
      date: '2025-06-15',
      supplier: 'Global Pharma',
      amount: 'Rs. 38,600',
      status: 'Pending'
    },
    {
      id: 'PAY-2025-012',
      type: 'Cash',
      date: '2025-06-14',
      supplier: 'PharmaPro Labs',
      amount: 'Rs. 11,350',
      status: 'Done'
    }
  ];

  // Filter payments
  const filteredPayments = paymentData.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.amount.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'all' || payment.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Add Payment Form Handlers - commented out for now
  /*
  const openAddPaymentForm = () => {
    console.log('Opening Add Payment form');
    setShowAddPaymentForm(true);
  };

  const closeAddPaymentForm = () => {
    setShowAddPaymentForm(false);
    setFormErrors({});
    // Reset form data
    setNewPaymentData({
      type: 'Bank Transfer',
      date: new Date().toISOString().split('T')[0],
      supplier: '',
      amount: '',
      status: 'Done'
    });
  };

  const handleNewPaymentChange = (e) => {
    const { name, value } = e.target;
    setNewPaymentData({
      ...newPaymentData,
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

  const validatePaymentForm = () => {
    const errors = {};
    
    if (!newPaymentData.supplier.trim()) errors.supplier = "Supplier name is required";
    if (!newPaymentData.date) errors.date = "Date is required";
    
    // Validate amount is a number
    if (!newPaymentData.amount) {
      errors.amount = "Amount is required";
    } else if (isNaN(newPaymentData.amount) || parseFloat(newPaymentData.amount) <= 0) {
      errors.amount = "Amount must be a positive number";
    }
    
    return errors;
  };

  const handleAddPaymentSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validatePaymentForm();
    setFormErrors(validationErrors);
    
    // If no errors, add the payment
    if (Object.keys(validationErrors).length === 0) {
      console.log('Adding new payment with data:', newPaymentData);
      
      // Here you would typically call an API to add the payment
      // For now, we'll just simulate it with a success message
      alert(`New payment to ${newPaymentData.supplier} has been added successfully!`);
      
      // Close the form
      setShowAddPaymentForm(false);
    }
  };
  */

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate payment stats
  const bankTransfers = paymentData.filter(p => p.type === 'Bank Transfer').length;
  const cashPayments = paymentData.filter(p => p.type === 'Cash').length;
  const cardPayments = paymentData.filter(p => p.type === 'Credit Card').length;
  const digitalWallets = paymentData.filter(p => p.type === 'Digital Wallet').length;
  const pendingPayments = paymentData.filter(p => p.status === 'Pending').length;
  
  // Calculate total payment amount
  const totalAmount = paymentData.reduce((sum, payment) => {
    const amount = Number(payment.amount.replace(/[^0-9.-]+/g, ''));
    return sum + amount;
  }, 0).toLocaleString('en-IN');

  // Add new state for handling popup and forms
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    id: '',
    type: '',
    date: '',
    supplier: '',
    amount: '',
    status: ''
  });

  // Handle row click
  const handleRowClick = (payment) => {
    setSelectedPayment(payment);
    setUpdateFormData(payment);
    setShowUpdateModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Add your update logic here
    console.log('Updating payment:', updateFormData);
    setShowUpdateModal(false);
  };

  const handleDelete = () => {
    // Add your delete logic here
    console.log('Deleting payment:', selectedPayment);
    setShowDeleteConfirm(false);
    setShowUpdateModal(false);
  };

  // Close all modals
  const handleCloseModals = () => {
    setShowUpdateModal(false);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="payment-report-container">
      {/* Header */}
      <header className="payment-report-header">
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

      {/* Payment Report Content */}
      <div className="payment-report-content">
        <div className="payment-report-title">
          <h1>Payment Report</h1>
          <p>Track and manage all payment transactions with suppliers</p>
        </div>

        {/* Filter Controls */}
        <div className="payment-controls">
          <div className="payment-search">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchQuery}
              onChange={handleSearch}
              className="payment-search-input"
            />
          </div>
          
          <div className="filter-controls">
            <div className="filter-group">
              <label><FiFilter /> Payment Type:</label>
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Types</option>
                <option value="bank transfer">Bank Transfer</option>
                <option value="digital wallet">Digital Wallet</option>
                <option value="cash">Cash</option>
                <option value="credit card">Credit Card</option>
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
                <option value="done">Done</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            <button className="export-btn">
              <FiDownload /> Export Report
            </button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="payment-table-container">
          <table className="payment-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Payment Type</th>
                <th>Date</th>
                <th>Payment By (Supplier)</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {currentItems.map((payment, index) => (
                <tr 
                  key={payment.id} 
                  onClick={() => handleRowClick(payment)}
                  className="clickable-row"
                >
                  <td>{payment.id}</td>
                  <td>
                    <span className={`payment-type ${payment.type.toLowerCase().replace(' ', '-')}`}>
                      {payment.type}
                    </span>
                  </td>
                  <td>{formatDate(payment.date)}</td>
                  <td>{payment.supplier}</td>
                  <td className="amount-cell">{payment.amount}</td>
                  <td>
                    <span className={`status-pill ${payment.status.toLowerCase()}`}>
                      {payment.status}
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
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredPayments.length)} of {filteredPayments.length} payments
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

        {/* Payment Categories Summary */}
        <div className="payment-summary-title">
          <h2>Payment Categories</h2>
          <p>Overview of different payment methods and their statistics</p>
        </div>

        <div className="payment-categories-grid">
          <div className="payment-summary-card total blue-card">
            <div className="card-header">
              <FiPieChart className="card-icon" />
              <div className="card-title">
                <h3>All Transactions</h3>
                <p>Total payment activities</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-value">{paymentData.length}</div>
              <div className="stat-amount">Rs. {totalAmount}</div>
            </div>
            <div className="card-footer">
              <div className="success-rate">
                <span className="rate-label">Success Rate:</span>
                <span className="rate-value">{Math.round((paymentData.length - pendingPayments) / paymentData.length * 100)}%</span>
              </div>
            </div>
          </div>

          <div className="payment-summary-card bank">
            <div className="card-header">
              <HiOutlineCurrencyDollar className="card-icon" />
              <div className="card-title">
                <h3>Bank Transfers</h3>
                <p>Direct bank payment transactions</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-value">{bankTransfers}</div>
            </div>
            <div className="card-footer">
              <div className="trend">
                <span className="trend-positive">↗ 12% this month</span>
              </div>
            </div>
          </div>

          <div className="payment-summary-card cash">
            <div className="card-header">
              <HiOutlineCash className="card-icon" />
              <div className="card-title">
                <h3>Cash Payments</h3>
                <p>In-store cash transactions</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-value">{cashPayments}</div>
            </div>
            <div className="card-footer">
              <div className="trend">
                <span className="trend-positive">↗ 8% this month</span>
              </div>
            </div>
          </div>

          <div className="payment-summary-card card">
            <div className="card-header">
              <HiOutlineCreditCard className="card-icon" />
              <div className="card-title">
                <h3>Card Payments</h3>
                <p>Credit and debit card transactions</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-value">{cardPayments}</div>
            </div>
            <div className="card-footer">
              <div className="trend">
                <span className="trend-positive">↗ 15% this month</span>
              </div>
            </div>
          </div>

          <div className="payment-summary-card digital">
            <div className="card-header">
              <HiOutlinePhone className="card-icon" />
              <div className="card-title">
                <h3>Digital Wallets</h3>
                <p>Mobile payment solutions</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-value">{digitalWallets}</div>
            </div>
            <div className="card-footer">
              <div className="trend">
                <span className="trend-positive">↗ 25% this month</span>
              </div>
            </div>
          </div>

          <div className="payment-summary-card pending">
            <div className="card-header">
              <FiFilter className="card-icon" />
              <div className="card-title">
                <h3>Pending Payments</h3>
                <p>Transactions awaiting clearance</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-value">{pendingPayments}</div>
            </div>
            <div className="card-footer">
              <div className="trend">
                <span className="trend-attention">Needs attention</span>
              </div>
            </div>
          </div>
        </div>

        {/* Update Payment Modal */}
        {showUpdateModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Update Payment</h2>
                <button className="close-btn" onClick={() => setShowUpdateModal(false)}>
                  <FiX />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="update-form">
                <div className="form-group">
                  <label>Payment ID</label>
                  <input
                    type="text"
                    value={updateFormData.id}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Payment Type</label>
                  <select
                    value={updateFormData.type}
                    onChange={(e) => setUpdateFormData({...updateFormData, type: e.target.value})}
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Digital Wallet">Digital Wallet</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={updateFormData.date}
                    onChange={(e) => setUpdateFormData({...updateFormData, date: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Supplier</label>
                  <input
                    type="text"
                    value={updateFormData.supplier}
                    onChange={(e) => setUpdateFormData({...updateFormData, supplier: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="text"
                    value={updateFormData.amount}
                    onChange={(e) => setUpdateFormData({...updateFormData, amount: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={updateFormData.status}
                    onChange={(e) => setUpdateFormData({...updateFormData, status: e.target.value})}
                  >
                    <option value="Done">Done</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div className="button-group">
                  <button type="button" className="cancel-btn" onClick={() => setShowUpdateModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="update-btn">
                    Update Payment
                  </button>
                  <button type="button" className="delete-btn" onClick={() => setShowDeleteConfirm(true)}>
                    Delete Payment
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
              <p>Are you sure you want to delete this payment record?</p>
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

export default PaymentReport;
