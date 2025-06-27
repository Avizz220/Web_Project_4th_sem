import React, { useState, useEffect } from 'react';
import './Customers.css';
import { FiSearch, FiUsers, FiUserCheck, FiPlus, FiX, FiEdit, FiTrash2 } from 'react-icons/fi';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { BsArrowUp, BsArrowDown, BsSun, BsMoon, BsCloud } from 'react-icons/bs';

const Customers = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Dropdown state
  const [dropdownPosition, setDropdownPosition] = useState({ visible: false, x: 0, y: 0 });
  const [activeRowId, setActiveRowId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: 'Male',
    lastTransaction: new Date().toISOString().split('T')[0]
  });
  
  // Form validation
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current time-based greeting and icon
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return { text: "Good Morning", icon: <BsSun /> };
    } else if (hour >= 12 && hour < 17) {
      return { text: "Good Afternoon", icon: <BsCloud /> };
    } else if (hour >= 17 && hour < 21) {
      return { text: "Good Evening", icon: <BsMoon /> };
    } else {
      return { text: "Good Night", icon: <BsMoon /> };
    }
  };

  const greeting = getTimeBasedGreeting();

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
  
  const handleCustomerSearch = (e) => {
    setCustomerSearchQuery(e.target.value);
  };

  const handleAddNewCustomer = () => {
    setIsEditMode(false);
    setSelectedCustomer(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      gender: 'Male',
      lastTransaction: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedCustomer(null);
    // Reset form data and errors when closing modal
    setFormData({
      name: '',
      phone: '',
      email: '',
      gender: 'Male',
      lastTransaction: new Date().toISOString().split('T')[0]
    });
    setFormErrors({});
    setIsSubmitting(false);
  };
  
  const handleUpdateCustomer = (customer) => {
    setIsEditMode(true);
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      gender: customer.gender,
      lastTransaction: new Date(customer.lastTransaction).toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };
  
  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };
  
  const handleConfirmDelete = () => {
    // In a real application, you would call an API to delete the customer
    // For now, we'll just simulate the deletion
    console.log(`Deleting customer: ${selectedCustomer.id}`);
    setIsDeleteModalOpen(false);
    setSelectedCustomer(null);
  };
  
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
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

  const validateForm = () => {
    const errors = {};
    
    // Required fields validation
    if (!formData.name.trim()) errors.name = "Customer name is required";
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s+()-]{10,15}$/;
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Invalid phone number format";
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    setFormErrors(validationErrors);
    
    // If no errors, proceed with submission
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        if (isEditMode) {
          console.log("Updated customer data:", formData);
          alert(`Customer ${formData.name} updated successfully!`);
        } else {
          console.log("New customer data:", formData);
          alert(`Customer ${formData.name} added successfully!`);
        }
        
        setIsSubmitting(false);
        handleCloseModal();
      }, 1000);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleRowClick = (customer, e) => {
    e.preventDefault();
    setSelectedCustomer(customer);
    
    // Toggle dropdown if clicking on the same row
    if (activeRowId === customer.id) {
      setDropdownPosition({ visible: false, x: 0, y: 0 });
      setActiveRowId(null);
      return;
    }
    
    setActiveRowId(customer.id);
    
    // Calculate position for dropdown
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    setDropdownPosition({
      visible: true,
      x: centerX,
      y: rect.bottom + window.scrollY + 10 // Add a small gap between row and dropdown
    });
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    if (dropdownPosition.visible) {
      const handleOutsideClick = (e) => {
        // Don't close if clicking on the dropdown itself
        if (e.target.closest('.row-dropdown-menu')) {
          return;
        }
        setDropdownPosition({ visible: false, x: 0, y: 0 });
        setActiveRowId(null);
      };
      
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }
  }, [dropdownPosition.visible]);

  // Sample customers data
  const customers = [
    {
      id: 1,
      name: 'Jane Cooper',
      phone: '(225) 555-0118',
      email: 'jane@microsoft.com',
      gender: 'Female',
      lastTransaction: '2025-06-20'
    },
    {
      id: 2,
      name: 'Floyd Miles',
      phone: '(205) 555-0100',
      email: 'floyd@yahoo.com',
      gender: 'Male',
      lastTransaction: '2025-06-18'
    },
    {
      id: 3,
      name: 'Ronald Richards',
      phone: '(302) 555-0107',
      email: 'ronald@adobe.com',
      gender: 'Male',
      lastTransaction: '2025-06-15'
    },
    {
      id: 4,
      name: 'Marvin McKinney',
      phone: '(252) 555-0126',
      email: 'marvin@tesla.com',
      gender: 'Male',
      lastTransaction: '2025-06-24'
    },
    {
      id: 5,
      name: 'Jerome Bell',
      phone: '(629) 555-0129',
      email: 'jerome@google.com',
      gender: 'Male',
      lastTransaction: '2025-06-23'
    },
    {
      id: 6,
      name: 'Kathryn Murphy',
      phone: '(406) 555-0120',
      email: 'kathryn@microsoft.com',
      gender: 'Female',
      lastTransaction: '2025-06-22'
    },
    {
      id: 7,
      name: 'Jacob Jones',
      phone: '(208) 555-0112',
      email: 'jacob@yahoo.com',
      gender: 'Male',
      lastTransaction: '2025-06-19'
    },
    {
      id: 8,
      name: 'Kristin Watson',
      phone: '(704) 555-0127',
      email: 'kristin@facebook.com',
      gender: 'Female',
      lastTransaction: '2025-06-17'
    }
  ];

  // Filter customers based on active tab and search query
  const filteredCustomers = customers.filter(customer => {
    // Since we removed status, we'll change the tab filter to filter by gender
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && customer.gender === 'Male') ||
                      (activeTab === 'inactive' && customer.gender === 'Female');
    
    const matchesSearch = customerSearchQuery === '' || 
      customer.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
      customer.gender.toLowerCase().includes(customerSearchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  // Sort customers based on selected option
  const sortedCustomers = [...filteredCustomers];
  
  switch(sortOption) {
    case 'newest':
      // Keep original order (assumed to be newest)
      break;
    case 'oldest':
      sortedCustomers.reverse();
      break;
    case 'name-asc':
      sortedCustomers.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sortedCustomers.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'recent-transaction':
      sortedCustomers.sort((a, b) => new Date(b.lastTransaction) - new Date(a.lastTransaction));
      break;
    case 'oldest-transaction':
      sortedCustomers.sort((a, b) => new Date(a.lastTransaction) - new Date(b.lastTransaction));
      break;
    default:
      break;
  }

  return (
    <div className="customers-container">
      {/* Header */}
      <header className="customers-header">
        <div className="header-left">
          <button className="header-back-btn" onClick={onBack}>
            <HiChevronLeft /> Back to Dashboard
          </button>
        </div>
        <div className="header-right">
          <div className="language-selector">
            <span>🌐 English (US)</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          <div className="greeting-container">
            <span className="greeting-icon">{greeting.icon}</span>
            <span className="greeting-text">{greeting.text}</span>
          </div>
          <div className="date-time">
            {getCurrentDate()}
          </div>
        </div>
      </header>

      {/* Customers Content */}
      <div className="customers-content">
        <div className="content-header">
          <div className="breadcrumb-section">
            <div className="page-title">
              <h1>Customer Management 👥</h1>
              <p>Here are your customer statistics and data</p>
            </div>
          </div>
          <button className="add-customer-btn" onClick={handleAddNewCustomer}>
            <FiPlus style={{ marginRight: "0.5rem" }} /> Add New Customer
          </button>
        </div>

        {/* Customer Stats Cards */}
        <div className="customer-stats-cards">
          <div className="stat-card total-customers">
            <div className="stat-icon-container">
              <FiUsers className="stat-icon" />
            </div>
            <div className="stat-content">
              <p className="stat-title">Total Customers</p>
              <h3 className="stat-value">5,423</h3>
              <p className="stat-change increase">
                <BsArrowUp /> 16% this month
              </p>
            </div>
          </div>
          
          <div className="stat-card members">
            <div className="stat-icon-container">
              <FiUserCheck className="stat-icon" />
            </div>
            <div className="stat-content">
              <p className="stat-title">Members</p>
              <h3 className="stat-value">1,893</h3>
              <p className="stat-change decrease">
                <BsArrowDown /> 1% this month
              </p>
            </div>
          </div>
        </div>

        {/* Customer Management */}
        <div className="customer-management">
          <div className="customer-tabs">
            <h2>All Customers</h2>
            <div className="tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => handleTabChange('all')}
              >
                All
              </button>
              <button 
                className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => handleTabChange('active')}
              >
                Male Customers
              </button>
              <button 
                className={`tab-btn ${activeTab === 'inactive' ? 'active' : ''}`}
                onClick={() => handleTabChange('inactive')}
              >
                Female Customers
              </button>
            </div>
          </div>
          
          <div className="customer-controls">
            <div className="customer-search">
              <span className="search-icon"><FiSearch /></span>
              <input
                type="text"
                placeholder="Search in customer list..."
                className="customer-search-input"
                value={customerSearchQuery}
                onChange={handleCustomerSearch}
              />
            </div>
            
            <div className="sort-control">
              <span>Sort by: </span>
              <select 
                className="sort-select"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="recent-transaction">Recent Transactions</option>
                <option value="oldest-transaction">Oldest Transactions</option>
              </select>
            </div>
          </div>
          
          {/* Customer Table */}
          <div className="customer-table-container">
            <table className="customer-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Last Transaction</th>
                </tr>
              </thead>
              <tbody>
                {sortedCustomers.length > 0 ? (
                  sortedCustomers.map(customer => (
                    <tr 
                      key={customer.id} 
                      onClick={(e) => handleRowClick(customer, e)}
                      className={activeRowId === customer.id ? 'active' : ''}
                    >
                      <td>{customer.name}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.email}</td>
                      <td>
                        <span className={`gender-pill ${customer.gender.toLowerCase()}`}>
                          {customer.gender}
                        </span>
                      </td>
                      <td>{new Date(customer.lastTransaction).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                      No customers found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="pagination">
            <div className="pagination-info">
              Showing data 1 to {sortedCustomers.length} of 256K entries
            </div>
            <div className="pagination-controls">
              <button className="pagination-btn" disabled>
                <HiChevronLeft />
              </button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <button className="pagination-btn">4</button>
              <span>...</span>
              <button className="pagination-btn">40</button>
              <button className="pagination-btn">
                <HiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="customer-modal">
            <div className="modal-header">
              <h2>{isEditMode ? 'Edit Customer' : 'Add New Customer'}</h2>
              <button className="close-modal-btn" onClick={handleCloseModal}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="customer-form">
              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="name">Customer Name <span className="required-mark">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={formErrors.name ? 'error' : ''}
                    placeholder="Enter customer name"
                  />
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required-mark">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? 'error' : ''}
                      placeholder="Enter email address"
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number <span className="required-mark">*</span></label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? 'error' : ''}
                      placeholder="Enter phone number"
                    />
                    {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group gender-group">
                    <label htmlFor="gender">Gender <span className="required-mark">*</span></label>
                    <div className="gender-buttons">
                      <label className={`gender-option ${formData.gender === 'Male' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === 'Male'}
                          onChange={handleInputChange}
                          hidden
                        />
                        <span className="option-icon">👨</span>
                        <span className="option-text">Male</span>
                      </label>
                      <label className={`gender-option ${formData.gender === 'Female' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === 'Female'}
                          onChange={handleInputChange}
                          hidden
                        />
                        <span className="option-icon">👩</span>
                        <span className="option-text">Female</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastTransaction">Last Transaction Date</label>
                    <input
                      type="date"
                      id="lastTransaction"
                      name="lastTransaction"
                      value={formData.lastTransaction}
                      onChange={handleInputChange}
                      className={formErrors.lastTransaction ? 'error' : ''}
                    />
                    {formErrors.lastTransaction && <span className="error-message">{formErrors.lastTransaction}</span>}
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting 
                    ? (isEditMode ? 'Updating... ⏳' : 'Adding... ⏳') 
                    : (isEditMode ? 'Update Customer' : 'Add Customer')
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="delete-modal-header">
              <h2>Confirm Deletion</h2>
              <button className="close-modal-btn" onClick={handleCancelDelete}>
                <FiX />
              </button>
            </div>
            <div className="delete-modal-content">
              <div className="delete-icon">
                <FiTrash2 />
              </div>
              <p>Are you sure you want to delete the customer <strong>{selectedCustomer?.name}</strong>?</p>
              <p className="delete-warning">This action cannot be undone.</p>
            </div>
            <div className="delete-modal-actions">
              <button className="cancel-btn" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="delete-confirm-btn" onClick={handleConfirmDelete}>
                Delete Customer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Row Action Dropdown */}
      {dropdownPosition.visible && (
        <div 
          className="row-dropdown-menu"
          style={{ 
            position: 'fixed', 
            top: `${dropdownPosition.y}px`, 
            left: `${dropdownPosition.x}px`,
            transform: 'translateX(-50%)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="dropdown-item edit-item"
            onClick={() => {
              handleUpdateCustomer(selectedCustomer);
              setDropdownPosition({ visible: false, x: 0, y: 0 });
            }}
          >
            <FiEdit size={18} /> Update Customer
          </button>
          <button 
            className="dropdown-item delete-item"
            onClick={() => {
              handleDeleteClick(selectedCustomer);
              setDropdownPosition({ visible: false, x: 0, y: 0 });
            }}
          >
            <FiTrash2 size={18} /> Delete Customer
          </button>
        </div>
      )}
    </div>
  );
};

export default Customers;
