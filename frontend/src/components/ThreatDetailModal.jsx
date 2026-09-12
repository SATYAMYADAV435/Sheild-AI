import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Cpu, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export default function ThreatDetailModal({ threat, isOpen, onClose, onUpdateThreat }) {
  if (!isOpen || !threat) return null;

  const [status, setStatus] = useState(threat.status || 'detected');
  const [mitigationAction, setMitigationAction] = useState(threat.mitigation_action || '');
  const [aiAnalysis, setAiAnalysis] = useState(
    threat.ai_analysis || 
    `Automated neural inspection suggests signature match with ${threat.threat_type}. Anomaly vector isolated from source host ${threat.source_ip || 'N/A'}. Recommend immediate firewall rule enforcement and host endpoint quarantine.`
  );
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (threat) {
      setStatus(threat.status || 'detected');
      setMitigationAction(threat.mitigation_action || '');
    }
  }, [threat]);

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      const payload = {
        status: status,
        mitigation_action: mitigationAction,
        ai_analysis: aiAnalysis,
      };
      if (status === 'resolved') {
        payload.resolved_at = new Date().toISOString();
      }
      await onUpdateThreat(threat.id, payload);
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to update threat record');
    } finally {
      setIsUpdating(false);
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
            <div>
              <h3 style={{ margin: 0 }}>Incident #{threat.id}: {threat.threat_type}</h3>
              <div style={{ fontSize: 11.5, color: '#8E9BAE', marginTop: 2 }}>
                Detected: {new Date(threat.detected_at).toLocaleString()}
              </div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Threat Overview Meta */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18, background: '#172037', padding: 14, borderRadius: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: '#8E9BAE' }}>Severity</div>
            <div style={{ fontWeight: 700, textTransform: 'capitalize', color: threat.severity === 'critical' ? '#A36361' : threat.severity === 'high' ? '#E8B298' : '#EECC8C' }}>
              {threat.severity}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#8E9BAE' }}>Source IP</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: '#E2E8F0' }}>
              {threat.source_ip || '192.168.1.100'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#8E9BAE' }}>Target / Dest IP</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: '#E2E8F0' }}>
              {threat.destination_ip || '10.0.0.1'}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Payload Description</label>
          <div style={{ background: '#1A233D', padding: '10px 14px', borderRadius: 8, fontSize: 12.5, color: '#D1D5DB', lineHeight: 1.5 }}>
            {threat.description}
          </div>
        </div>

        {/* AI Analysis */}
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Cpu size={14} color="#A855F7" />
            AI Autonomous Threat Analysis
          </label>
          <textarea
            rows={3}
            className="form-textarea"
            value={aiAnalysis}
            onChange={(e) => setAiAnalysis(e.target.value)}
          />
        </div>

        {/* Mitigation Action & Status Form */}
        <div className="form-row">
          <div className="form-group">
            <label>Update Incident Status</label>
            <select 
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="detected">Detected</option>
              <option value="analyzing">Analyzing</option>
              <option value="mitigated">Mitigated</option>
              <option value="resolved">Resolved</option>
              <option value="false_positive">False Positive</option>
            </select>
          </div>

          <div className="form-group">
            <label>AI Confidence Rating</label>
            <div style={{ background: '#1A233D', padding: '10px 14px', borderRadius: 8, fontSize: 13, color: '#34D399', fontWeight: 600 }}>
              {threat.confidence_score ? `${Math.round(threat.confidence_score * 100)}% Match` : '95% Match'}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={14} color="#34D399" />
            Mitigation / Remediation Action
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Host quarantined, IP blocked, rule applied..."
            value={mitigationAction}
            onChange={(e) => setMitigationAction(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            type="button" 
            className="btn-primary"
            disabled={isUpdating}
            onClick={handleSave}
          >
            {isUpdating ? 'Saving to Backend...' : 'Update Incident Record'}
          </button>
        </div>
      </div>
    </div>
  );
}
