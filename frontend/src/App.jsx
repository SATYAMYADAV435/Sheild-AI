import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CurrentRiskCards from './components/CurrentRiskCards';
import RiskScoreGauge from './components/RiskScoreGauge';
import ThreatSummaryChart from './components/ThreatSummaryChart';
import ThreatsByVirusDonut from './components/ThreatsByVirusDonut';
import ThreatDetailsTable from './components/ThreatDetailsTable';
import ThreatByDeviceList from './components/ThreatByDeviceList';
import CreateThreatModal from './components/CreateThreatModal';
import ThreatDetailModal from './components/ThreatDetailModal';
import { threatsApi } from './api/threatsApi';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isHealthy, setIsHealthy] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeframe, setTimeframe] = useState('daily');

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState(null);

  // Load threats from backend
  const loadThreats = useCallback(async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    try {
      const data = await threatsApi.getThreats({
        severity: severityFilter,
        status: statusFilter,
      });
      setThreats(data || []);
      
      const health = await threatsApi.checkHealth();
      setIsHealthy(health);
    } catch (err) {
      console.warn('Backend fetch notice:', err.message);
      setIsHealthy(false);
    } finally {
      setLoading(false);
      if (showRefreshIndicator) {
        setTimeout(() => setIsRefreshing(false), 400);
      }
    }
  }, [severityFilter, statusFilter]);

  // Initial fetch & interval polling
  useEffect(() => {
    loadThreats();
    const interval = setInterval(() => {
      loadThreats();
    }, 15000);
    return () => clearInterval(interval);
  }, [loadThreats]);

  // Seed initial threats if empty
  const handleSeedData = async () => {
    setIsRefreshing(true);
    try {
      await threatsApi.seedInitialThreats();
      await loadThreats();
    } catch (err) {
      alert(`Seeding failed: ${err.message}`);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Create Threat
  const handleCreateThreat = async (threatData) => {
    const created = await threatsApi.createThreat(threatData);
    setThreats((prev) => [created, ...prev]);
    loadThreats();
  };

  // Update Threat
  const handleUpdateThreat = async (id, updateData) => {
    const updated = await threatsApi.updateThreat(id, updateData);
    setThreats((prev) => prev.map((t) => (t.id === id ? updated : t)));
    loadThreats();
  };

  // Quick Mitigate
  const handleQuickMitigate = async (threat) => {
    try {
      await threatsApi.updateThreat(threat.id, {
        status: 'resolved',
        mitigation_action: 'Automated quarantine and firewall ingress rule dispatched by Shield-AI engine.',
        resolved_at: new Date().toISOString(),
      });
      await loadThreats();
    } catch (err) {
      alert(`Mitigation failed: ${err.message}`);
    }
  };

  // Delete Threat
  const handleDeleteThreat = async (id) => {
    if (!window.confirm(`Are you sure you want to delete threat record #${id}?`)) return;
    try {
      await threatsApi.deleteThreat(id);
      setThreats((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  // Filter threats for search query
  const filteredThreats = threats.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.threat_type?.toLowerCase().includes(q) ||
      t.source_ip?.toLowerCase().includes(q) ||
      t.destination_ip?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q) ||
      t.status?.toLowerCase().includes(q) ||
      t.severity?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="app-layout">
      {/* Left Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        threatCount={threats.filter(t => t.status !== 'resolved').length}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Top Header */}
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          onRefresh={() => loadThreats(true)}
          isRefreshing={isRefreshing}
          isHealthy={isHealthy}
          onSeedData={handleSeedData}
          threatCount={threats.length}
        />

        {/* Dashboard Grid */}
        <main className="dashboard-content">
          {/* Top Row: Current Risk KPI Cards + Risk Score Gauge */}
          <section className="top-dashboard-row">
            <CurrentRiskCards threats={threats} />
            <RiskScoreGauge threats={threats} />
          </section>

          {/* Middle Row: Threat Summary Wave Chart + Threats by Virus Donut */}
          <section className="middle-dashboard-row">
            <ThreatSummaryChart threats={threats} />
            <ThreatsByVirusDonut threats={threats} />
          </section>

          {/* Bottom Row: Threat Details Table + Threat by Device */}
          <section className="bottom-dashboard-row">
            <ThreatDetailsTable 
              threats={filteredThreats}
              timeframe={timeframe}
              setTimeframe={setTimeframe}
              severityFilter={severityFilter}
              setSeverityFilter={setSeverityFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onSelectThreat={(t) => setSelectedThreat(t)}
              onQuickMitigate={handleQuickMitigate}
              onDeleteThreat={handleDeleteThreat}
            />
            <ThreatByDeviceList threats={threats} />
          </section>
        </main>
      </div>

      {/* Create Threat Modal */}
      <CreateThreatModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateThreat={handleCreateThreat}
      />

      {/* Threat Detail & AI Analysis Modal */}
      <ThreatDetailModal 
        threat={selectedThreat}
        isOpen={!!selectedThreat}
        onClose={() => setSelectedThreat(null)}
        onUpdateThreat={handleUpdateThreat}
      />
    </div>
  );
}
