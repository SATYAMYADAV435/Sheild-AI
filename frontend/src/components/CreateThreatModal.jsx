import React, { useState } from 'react';
import { X, ShieldAlert, Sparkles } from 'lucide-react';

export default function CreateThreatModal({ isOpen, onClose, onCreateThreat }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    threat_type: '',
    severity: 'medium',
    source_ip: '192.168.1.100',
    destination_ip: '10.0.0.1',
    description: '',
    confidence_score: 0.92,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const samplePresets = [
    {
      name: 'Code Red Worm',
      threat_type: 'Code Red',
      severity: 'critical',
      source_ip: '192.168.1.105',
      destination_ip: '10.0.0.45',
      description: 'Buffer overflow payload targeting IIS web server endpoints with repeated NOP sled.',
      confidence_score: 0.96,
    },
    {
      name: 'Stuxnet Exploit',
      threat_type: 'Stuxnet',
      severity: 'critical',
      source_ip: '10.14.88.12',
      destination_ip: '10.14.88.200',
      description: 'Zero-day RPC exploit attempting privilege escalation and rootkit injection in SCADA telemetry system.',
      confidence_score: 0.99,
    },
    {
      name: 'ILOVEYOU Script',
      threat_type: 'ILOVEYOU',
      severity: 'high',
      source_ip: '172.16.4.22',
      destination_ip: '172.16.4.1',
      description: 'VBS mass-mailing payload targeting Outlook contact records and overwriting media files.',
      confidence_score: 0.91,
    },
    {
      name: 'SQL Injection Attack',
      threat_type: 'SQL Injection',
      severity: 'high',
      source_ip: '198.51.100.18',
      destination_ip: '10.0.2.22',
      description: 'Automated blind SQL injection probe targeting authentication endpoints with union select payloads.',
      confidence_score: 0.89,
    },
  ];

  const handleApplyPreset = (preset) => {
    setFormData({
      threat_type: preset.threat_type,
      severity: preset.severity,
      source_ip: preset.source_ip,
      destination_ip: preset.destination_ip,
      description: preset.description,
      confidence_score: preset.confidence_score,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.threat_type || !formData.description) {
      setErrorMsg('Please fill in Threat Type and Description.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await onCreateThreat({
        ...formData,
        confidence_score: parseFloat(formData.confidence_score),
      });
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit threat detection');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="logo-icon" style={{ width: 28, height: 28, borderRadius: 6 }}>
              <ShieldAlert size={16} />
            </div>
            <h3>Simulate Threat / Log Incident</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {errorMsg && (
          <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', borderRadius: 8, color: '#F87171', fontSize: 13, marginBottom: 16 }}>
            {errorMsg}
          </div>
        )}

        {/* Quick Presets */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11.5, color: '#94A3B8', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
            <Sparkles size={13} color="#A855F7" /> Quick Attack Presets:
          </div>
          <div className="preset-pills-row">
            {samplePresets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                className="preset-pill"
                onClick={() => handleApplyPreset(preset)}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Threat / Virus Type *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Code Red, Ransomware"
                value={formData.threat_type}
                onChange={(e) => setFormData({ ...formData, threat_type: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Severity Level *</label>
              <select
                className="form-select"
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="info">Info</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Source IP / Host</label>
              <input
                type="text"
                className="form-input"
                placeholder="192.168.1.100"
                value={formData.source_ip}
                onChange={(e) => setFormData({ ...formData, source_ip: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Target / Destination IP</label>
              <input
                type="text"
                className="form-input"
                placeholder="10.0.0.45"
                value={formData.destination_ip}
                onChange={(e) => setFormData({ ...formData, destination_ip: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>AI Confidence Score (0.0 to 1.0)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              className="form-input"
              value={formData.confidence_score}
              onChange={(e) => setFormData({ ...formData, confidence_score: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Threat Description *</label>
            <textarea
              rows={3}
              className="form-textarea"
              placeholder="Detailed description of the malicious payload, pattern, or vector..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Logging to Backend...' : 'Submit Threat Detection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
