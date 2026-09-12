import React from 'react';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  AlertTriangle, 
  FileText, 
  Activity, 
  FileSearch, 
  HelpCircle, 
  Settings, 
  LogOut, 
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, threatCount = 0 }) {
  return (
    <aside className="sidebar">
      {/* Brand Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <ShieldAlert size={20} color="#FFFFFF" />
        </div>
        <div className="brand-text">
          Vertex<span>Guard</span>
        </div>
      </div>

      {/* General Section */}
      <div className="nav-group-title">General</div>
      <ul className="nav-list">
        <li>
          <button 
            className={`nav-item-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="item-left">
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </span>
          </button>
        </li>
        <li>
          <button 
            className={`nav-item-btn ${activeTab === 'issues' ? 'active' : ''}`}
            onClick={() => setActiveTab('issues')}
          >
            <span className="item-left">
              <AlertTriangle size={18} />
              <span>Issues</span>
            </span>
            {threatCount > 0 && <span className="nav-badge">{threatCount}</span>}
          </button>
        </li>
        <li>
          <button 
            className={`nav-item-btn ${activeTab === 'files' ? 'active' : ''}`}
            onClick={() => setActiveTab('files')}
          >
            <span className="item-left">
              <FileText size={18} />
              <span>Files</span>
            </span>
            <ChevronRight size={14} color="#5E6C84" />
          </button>
        </li>
      </ul>

      {/* Reports Section */}
      <div className="nav-group-title" style={{ marginTop: '16px' }}>Reports</div>
      <ul className="nav-list">
        <li>
          <button 
            className={`nav-item-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            <span className="item-left">
              <FileSearch size={18} />
              <span>Threat Details</span>
            </span>
          </button>
        </li>
        <li>
          <button 
            className={`nav-item-btn ${activeTab === 'threats' ? 'active' : ''}`}
            onClick={() => setActiveTab('threats')}
          >
            <span className="item-left">
              <Activity size={18} />
              <span>Threats</span>
            </span>
            <ChevronRight size={14} color="#5E6C84" />
          </button>
        </li>
      </ul>

      {/* Settings Section */}
      <div className="nav-group-title" style={{ marginTop: '16px' }}>Settings</div>
      <ul className="nav-list">
        <li>
          <button 
            className={`nav-item-btn ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => setActiveTab('support')}
          >
            <span className="item-left">
              <HelpCircle size={18} />
              <span>Help & Supports</span>
            </span>
          </button>
        </li>
        <li>
          <button 
            className={`nav-item-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="item-left">
              <Settings size={18} />
              <span>Settings</span>
            </span>
          </button>
        </li>
      </ul>

      {/* Additional Features Banner */}
      <div className="sidebar-upgrade-card">
        <div className="upgrade-chip-icon">
          <Sparkles size={16} />
        </div>
        <p className="upgrade-text">
          Additional features to enhance your security.
        </p>
        <button className="upgrade-link" onClick={() => alert('AI Security Shield Engine is fully activated in Pro mode.')}>
          Upgrade <ArrowRight size={12} />
        </button>
      </div>

      {/* Logout */}
      <button className="logout-btn" onClick={() => alert('SOC Session Active. To switch user, modify credentials.')}>
        <LogOut size={16} />
        <span>Log Out</span>
      </button>
    </aside>
  );
}
