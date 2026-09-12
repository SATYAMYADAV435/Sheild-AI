import React from 'react';
import { Search, Bell, MessageSquare, Plus, RefreshCw, Database } from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  onOpenCreateModal, 
  onRefresh, 
  isRefreshing, 
  isHealthy, 
  onSeedData, 
  threatCount 
}) {
  return (
    <header className="top-header">
      {/* User Welcome */}
      <div className="user-welcome">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" 
          alt="Kathryn Murphy" 
          className="user-avatar" 
        />
        <div className="welcome-text">
          <h2>Welcome! Kathryn Murphy</h2>
          <p>Security is a process, not a product.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="header-center">
        <div className="search-bar">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search Here (IP, Threat Type, Status)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="header-actions">
        {/* API Health Pill */}
        <div className={`system-status-pill ${isHealthy ? '' : 'offline'}`}>
          <span className="status-indicator-dot"></span>
          <span>{isHealthy ? 'Engine Connected' : 'API Disconnected'}</span>
        </div>

        {/* Seed button if empty */}
        {threatCount === 0 && (
          <button className="btn-secondary" onClick={onSeedData} title="Populate realistic threats into backend">
            <Database size={14} />
            <span>Seed Threats</span>
          </button>
        )}

        {/* Refresh button */}
        <button 
          className="header-icon-btn" 
          onClick={onRefresh} 
          title="Refresh Data from Backend"
          style={{ transform: isRefreshing ? 'rotate(180deg)' : 'none', transition: 'transform 0.4s' }}
        >
          <RefreshCw size={16} />
        </button>

        {/* Messages */}
        <button className="header-icon-btn" title="System Messages">
          <MessageSquare size={16} />
        </button>

        {/* Notifications */}
        <button className="header-icon-btn" title="Security Alerts">
          <Bell size={16} />
          <span className="icon-dot"></span>
        </button>

        {/* Add Threat / Simulate Attack */}
        <button className="btn-primary" onClick={onOpenCreateModal}>
          <Plus size={16} />
          <span>New Threat</span>
        </button>
      </div>
    </header>
  );
}
