import React, { useState } from 'react';
import './Customers.css';
import { FiSearch, FiUsers, FiUserCheck, FiPlus } from 'react-icons/fi';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { BsArrowUp, BsArrowDown, BsSun, BsMoon, BsCloud } from 'react-icons/bs';

const Customers = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');

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
    console.log('Add new customer clicked');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

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

      {/* Customers Content */}
      <div className="customers-content">
        <div className="content-header">
          <div className="breadcrumb-section">
            <button className="back-btn" onClick={onBack}>
              <HiChevronLeft /> Back to Dashboard
            </button>
            <div className="page-title">
              <h1>Hello Evano 👋</h1>
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
                Male
              </button>
              <button 
                className={`tab-btn ${activeTab === 'inactive' ? 'active' : ''}`}
                onClick={() => handleTabChange('inactive')}
              >
                Female
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
                    <tr key={customer.id}>
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
    </div>
  );
};

export default Customers;
