import React, { useState } from 'react';
import './Suppliers.css';
import { FiSearch, FiUsers, FiPackage, FiPlus, FiX } from 'react-icons/fi';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { BsArrowUp, BsArrowDown, BsSun, BsMoon, BsCloud } from 'react-icons/bs';

const Suppliers = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [supplierSearchQuery, setSupplierSearchQuery] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    supplyType: 'Medicine'
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
  
  const handleSupplierSearch = (e) => {
    setSupplierSearchQuery(e.target.value);
  };

  const handleAddNewSupplier = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form data and errors when closing modal
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      supplyType: 'Medicine'
    });
    setFormErrors({});
    setIsSubmitting(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      supplyType: 'Medicine',
      address: '',
      contactPerson: '',
      website: '',
      notes: ''
    });
    setFormErrors({});
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
    if (!formData.name.trim()) errors.name = "Supplier name is required";
    if (!formData.company.trim()) errors.company = "Company name is required";
    
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
        console.log("New supplier data:", formData);
        setIsSubmitting(false);
        handleCloseModal();
        
        // Here you would typically update the suppliers array with the new data
        // For now, let's just show an alert
        alert(`Supplier ${formData.name} added successfully!`);
      }, 1000);
    }
  };

  // Sample suppliers data
  const suppliers = [
    {
      id: 1,
      name: 'Johnson Medical',
      company: 'Johnson & Johnson',
      phone: '(225) 555-0118',
      email: 'orders@johnsonmedical.com',
      supplyType: 'Medicine'
    },
    {
      id: 2,
      name: 'MedEquip Solutions',
      company: 'MedEquip Inc',
      phone: '(205) 555-0100',
      email: 'sales@medequip.com',
      supplyType: 'Equipment'
    },
    {
      id: 3,
      name: 'PharmaPro Labs',
      company: 'PharmaPro',
      phone: '(302) 555-0107',
      email: 'distribution@pharmapro.com',
      supplyType: 'Medicine'
    },
    {
      id: 4,
      name: 'MediTech Supplies',
      company: 'MediTech',
      phone: '(252) 555-0126',
      email: 'info@meditech.com',
      supplyType: 'Equipment'
    },
    {
      id: 5,
      name: 'Global Pharma',
      company: 'Global Pharmaceutical',
      phone: '(629) 555-0129',
      email: 'orders@globalpharma.com',
      supplyType: 'Medicine'
    },
    {
      id: 6,
      name: 'HealthEquip',
      company: 'HealthEquip Co.',
      phone: '(406) 555-0120',
      email: 'sales@healthequip.com',
      supplyType: 'Equipment'
    },
    {
      id: 7,
      name: 'MedSource',
      company: 'Medical Source Ltd',
      phone: '(208) 555-0112',
      email: 'contact@medsource.com',
      supplyType: 'Medicine'
    },
    {
      id: 8,
      name: 'PharmaDistribution',
      company: 'Pharma Distribution Inc',
      phone: '(704) 555-0127',
      email: 'supplies@pharmadist.com',
      supplyType: 'Medicine'
    }
  ];

  // Filter suppliers based on active tab and search query
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'medicine' && supplier.supplyType === 'Medicine') ||
                      (activeTab === 'equipment' && supplier.supplyType === 'Equipment');
    
    const matchesSearch = supplierSearchQuery === '' || 
      supplier.name.toLowerCase().includes(supplierSearchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(supplierSearchQuery.toLowerCase()) ||
      supplier.company.toLowerCase().includes(supplierSearchQuery.toLowerCase()) ||
      supplier.supplyType.toLowerCase().includes(supplierSearchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  // Sort suppliers based on selected option
  const sortedSuppliers = [...filteredSuppliers];
  
  switch(sortOption) {
    case 'newest':
      // Keep original order (assumed to be newest)
      break;
    case 'oldest':
      sortedSuppliers.reverse();
      break;
    case 'name-asc':
      sortedSuppliers.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sortedSuppliers.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'company-asc':
      sortedSuppliers.sort((a, b) => a.company.localeCompare(b.company));
      break;
    case 'company-desc':
      sortedSuppliers.sort((a, b) => b.company.localeCompare(a.company));
      break;
    default:
      break;
  }

  return (
    <div className="suppliers-container">
      {/* Header */}
      <header className="suppliers-header">
        <div className="header-left">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for anything here..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <button className="search-btn"><FiSearch /></button>
          </div>
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

      {/* Suppliers Content */}
      <div className="suppliers-content">
        <div className="content-header">
          <div className="breadcrumb-section">
            <button className="back-btn" onClick={onBack}>
              <HiChevronLeft /> Back to Dashboard
            </button>
            <div className="page-title">
              <h1>Supplier Management 📦</h1>
              <p>Here are your supplier statistics and data</p>
            </div>
          </div>
          <button className="add-supplier-btn" onClick={handleAddNewSupplier}>
            <FiPlus style={{ marginRight: "0.5rem" }} /> Add New Supplier
          </button>
        </div>

        {/* Supplier Stats Cards */}
        <div className="supplier-stats-cards">
          <div className="stat-card total-suppliers">
            <div className="stat-icon-container">
              <FiUsers className="stat-icon" />
            </div>
            <div className="stat-content">
              <p className="stat-title">Total Suppliers</p>
              <h3 className="stat-value">143</h3>
              <p className="stat-change increase">
                <BsArrowUp /> 12% this month
              </p>
            </div>
          </div>
          
          <div className="stat-card active-supplies">
            <div className="stat-icon-container">
              <FiPackage className="stat-icon" />
            </div>
            <div className="stat-content">
              <p className="stat-title">Active Supply Orders</p>
              <h3 className="stat-value">38</h3>
              <p className="stat-change increase">
                <BsArrowUp /> 8% this month
              </p>
            </div>
          </div>
        </div>

        {/* Supplier Management */}
        <div className="supplier-management">
          <div className="supplier-tabs">
            <h2>All Suppliers</h2>
            <div className="tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => handleTabChange('all')}
              >
                All
              </button>
              <button 
                className={`tab-btn ${activeTab === 'medicine' ? 'active' : ''}`}
                onClick={() => handleTabChange('medicine')}
              >
                Medicine Suppliers
              </button>
              <button 
                className={`tab-btn ${activeTab === 'equipment' ? 'active' : ''}`}
                onClick={() => handleTabChange('equipment')}
              >
                Equipment Suppliers
              </button>
            </div>
          </div>
          
          <div className="supplier-controls">
            <div className="supplier-search">
              <span className="search-icon"><FiSearch /></span>
              <input
                type="text"
                placeholder="Search in suppliers list..."
                className="supplier-search-input"
                value={supplierSearchQuery}
                onChange={handleSupplierSearch}
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
                <option value="company-asc">Company (A-Z)</option>
                <option value="company-desc">Company (Z-A)</option>
              </select>
            </div>
          </div>
          
          {/* Supplier Table */}
          <div className="supplier-table-container">
            <table className="supplier-table">
              <thead>
                <tr>
                  <th>Supplier Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Supply Type</th>
                </tr>
              </thead>
              <tbody>
                {sortedSuppliers.length > 0 ? (
                  sortedSuppliers.map(supplier => (
                    <tr key={supplier.id}>
                      <td>{supplier.name}</td>
                      <td>{supplier.company}</td>
                      <td>{supplier.email}</td>
                      <td>{supplier.phone}</td>
                      <td>
                        <span className={`supply-type-pill ${supplier.supplyType.toLowerCase()}`}>
                          {supplier.supplyType}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                      No suppliers found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="pagination">
            <div className="pagination-info">
              Showing data 1 to {sortedSuppliers.length} of 143 entries
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
              <button className="pagination-btn">18</button>
              <button className="pagination-btn">
                <HiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Supplier Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="supplier-modal">
            <div className="modal-header">
              <h2>Add New Supplier</h2>
              <button className="close-modal-btn" onClick={handleCloseModal}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="supplier-form">
              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="name">Supplier Name <span className="required-mark">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={formErrors.name ? 'error' : ''}
                    placeholder="Enter supplier name"
                  />
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Company <span className="required-mark">*</span></label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={formErrors.company ? 'error' : ''}
                    placeholder="Enter company name"
                  />
                  {formErrors.company && <span className="error-message">{formErrors.company}</span>}
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
                
                <div className="form-group supply-type-group">
                  <label htmlFor="supplyType">Supply Type <span className="required-mark">*</span></label>
                  <div className="supply-type-buttons">
                    <label className={`supply-type-option ${formData.supplyType === 'Medicine' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="supplyType"
                        value="Medicine"
                        checked={formData.supplyType === 'Medicine'}
                        onChange={handleInputChange}
                        hidden
                      />
                      <span className="option-icon">💊</span>
                      <span className="option-text">Medicine</span>
                    </label>
                    <label className={`supply-type-option ${formData.supplyType === 'Equipment' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="supplyType"
                        value="Equipment"
                        checked={formData.supplyType === 'Equipment'}
                        onChange={handleInputChange}
                        hidden
                      />
                      <span className="option-icon">🔧</span>
                      <span className="option-text">Equipment</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
