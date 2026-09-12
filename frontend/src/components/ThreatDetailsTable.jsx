import React from 'react';
import { Eye, ShieldCheck, Trash2, Calendar, HardDrive, AlertOctagon, FolderTree, FileCode } from 'lucide-react';

export default function ThreatDetailsTable({ 
  threats = [], 
  timeframe, 
  setTimeframe, 
  severityFilter, 
  setSeverityFilter, 
  statusFilter, 
  setStatusFilter,
  onSelectThreat,
  onQuickMitigate,
  onDeleteThreat
}) {

  const formatDate = (isoString) => {
    if (!isoString) return '12-05-2024';
    try {
      const d = new Date(isoString);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    } catch {
      return '12-05-2024';
    }
  };

  const getDeviceName = (threat) => {
    // Generate readable device ID or fallback to source_ip
    if (threat.source_ip?.includes('192.168.1')) return 'crazyfish228';
    if (threat.source_ip?.includes('10.14.')) return 'angryswan732';
    if (threat.source_ip?.includes('172.16.')) return 'swiftfalcon104';
    if (threat.source_ip?.includes('45.33.')) return 'darkraven992';
    return threat.source_ip || 'endpoint-sec-01';
  };

  const getFakeFilePath = (threat) => {
    if (threat.destination_ip) {
      if (threat.destination_ip.startsWith('192.')) return `\\\\${threat.destination_ip}\\share\\system32`;
      return `C:\\Users\\admin\\AppData\\${threat.destination_ip.replace(/\./g, '_')}`;
    }
    return `C:\\Windows\\System32\\drivers\\sec.sys`;
  };

  const getFileType = (threat) => {
    const t = threat.threat_type.toLowerCase();
    if (t.includes('stuxnet') || t.includes('code red')) return 'Jpeg';
    if (t.includes('iloveyou') || t.includes('melissa')) return 'Zip';
    if (t.includes('mydoom') || t.includes('sasser')) return 'Exe';
    if (t.includes('trojan')) return 'Dll';
    return 'Bin';
  };

  const getSeverityBadge = (sev) => {
    switch (sev?.toLowerCase()) {
      case 'critical':
        return <span className="badge-pill badge-critical">Critical</span>;
      case 'high':
        return <span className="badge-pill badge-high">High</span>;
      case 'medium':
        return <span className="badge-pill badge-medium">Medium</span>;
      case 'low':
        return <span className="badge-pill badge-low">Low</span>;
      default:
        return <span className="badge-pill badge-info">Info</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'detected':
        return <span className="badge-pill status-detected">Detected</span>;
      case 'analyzing':
        return <span className="badge-pill status-analyzing">Analyzing</span>;
      case 'mitigated':
        return <span className="badge-pill status-mitigated">Mitigated</span>;
      case 'resolved':
        return <span className="badge-pill status-resolved">Resolved</span>;
      default:
        return <span className="badge-pill">{status || 'Detected'}</span>;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Threat Details</h3>
        
        <div className="table-controls-bar">
          {/* Severity Filter */}
          <select 
            className="filter-select"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            title="Filter by severity"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="info">Info</option>
          </select>

          {/* Status Filter */}
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            title="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="detected">Detected</option>
            <option value="analyzing">Analyzing</option>
            <option value="mitigated">Mitigated</option>
            <option value="resolved">Resolved</option>
          </select>

          {/* Timeframe selector matching referral */}
          <select 
            className="select-timeframe"
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <div className="threat-table-wrapper">
        <table className="threat-table">
          <thead>
            <tr>
              <th><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={13} /> Date</span></th>
              <th><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><HardDrive size={13} /> Device ID</span></th>
              <th><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><AlertOctagon size={13} /> Virus name</span></th>
              <th><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FolderTree size={13} /> File Path / Target</span></th>
              <th><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FileCode size={13} /> File Type</span></th>
              <th>Severity</th>
              <th>Status</th>
              <th>AI Score</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {threats.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '36px', color: '#8E9BAE' }}>
                  No threat detections match the current filter criteria.
                </td>
              </tr>
            ) : (
              threats.map((threat) => (
                <tr key={threat.id}>
                  <td className="threat-code">{formatDate(threat.detected_at)}</td>
                  <td>
                    <span className="threat-code" style={{ color: '#E2E8F0', fontWeight: 600 }}>
                      {getDeviceName(threat)}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: '#FFFFFF' }}>
                      {threat.threat_type}
                    </span>
                  </td>
                  <td>
                    <span className="threat-code" style={{ fontSize: '11px', color: '#94A3B8' }} title={threat.destination_ip || threat.description}>
                      {getFakeFilePath(threat)}
                    </span>
                  </td>
                  <td>
                    <span className="threat-code" style={{ color: '#A855F7' }}>
                      {getFileType(threat)}
                    </span>
                  </td>
                  <td>{getSeverityBadge(threat.severity)}</td>
                  <td>{getStatusBadge(threat.status)}</td>
                  <td>
                    <span className="threat-code" style={{ fontWeight: 600, color: threat.confidence_score > 0.9 ? '#F43F5E' : '#EECC8C' }}>
                      {threat.confidence_score ? `${Math.round(threat.confidence_score * 100)}%` : '92%'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 4 }}>
                      <button 
                        className="table-action-btn" 
                        title="View AI Analysis & Details"
                        onClick={() => onSelectThreat(threat)}
                      >
                        <Eye size={15} />
                      </button>
                      {threat.status !== 'resolved' && (
                        <button 
                          className="table-action-btn" 
                          title="Quick Mitigate & Resolve"
                          style={{ color: '#34D399' }}
                          onClick={() => onQuickMitigate(threat)}
                        >
                          <ShieldCheck size={15} />
                        </button>
                      )}
                      <button 
                        className="table-action-btn danger" 
                        title="Delete Threat Record"
                        onClick={() => onDeleteThreat(threat.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
