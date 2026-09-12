// API client for backend FastAPI endpoints
const API_BASE = '/api/v1/threats';

export const threatsApi = {
  // GET /api/v1/threats/ with optional skip, limit, severity, status_filter
  async getThreats({ skip = 0, limit = 100, severity = '', status = '' } = {}) {
    const params = new URLSearchParams();
    if (skip) params.append('skip', skip);
    if (limit) params.append('limit', limit);
    if (severity && severity !== 'all') params.append('severity', severity);
    if (status && status !== 'all') params.append('status_filter', status);

    const url = `${API_BASE}/${params.toString() ? `?${params.toString()}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch threats: ${res.statusText}`);
    }
    return res.json();
  },

  // GET /api/v1/threats/{id}
  async getThreatById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch threat ${id}: ${res.statusText}`);
    }
    return res.json();
  },

  // POST /api/v1/threats/
  async createThreat(threatData) {
    const res = await fetch(`${API_BASE}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(threatData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || `Failed to create threat: ${res.statusText}`);
    }
    return res.json();
  },

  // PUT /api/v1/threats/{id}
  async updateThreat(id, updateData) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || `Failed to update threat: ${res.statusText}`);
    }
    return res.json();
  },

  // DELETE /api/v1/threats/{id}
  async deleteThreat(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Failed to delete threat: ${res.statusText}`);
    }
    return true;
  },

  // GET /health
  async checkHealth() {
    try {
      const res = await fetch('/health');
      if (res.ok) {
        const data = await res.json();
        return data.status === 'healthy';
      }
      return false;
    } catch {
      return false;
    }
  },

  // Seed realistic threats if the database is initially empty
  async seedInitialThreats() {
    const sampleThreats = [
      {
        threat_type: 'Code Red',
        severity: 'critical',
        source_ip: '192.168.1.105',
        destination_ip: '10.0.0.45',
        description: 'Buffer overflow worm payload targeting IIS web server endpoints. Identified malicious GET request with repeated NOP sled.',
        confidence_score: 0.96,
        ai_analysis: 'High-confidence signature match with Code Red variant v2. Automated heuristic isolation recommended immediately.',
        mitigation_action: 'Blocked source IP at firewall and applied patch MS01-033 to destination host.',
      },
      {
        threat_type: 'Stuxnet',
        severity: 'critical',
        source_ip: '10.14.88.12',
        destination_ip: '10.14.88.200',
        description: 'Zero-day RPC exploit attempting privilege escalation and rootkit injection in SCADA telemetry system.',
        confidence_score: 0.99,
        ai_analysis: 'Complex polymorphic binary utilizing stolen certificates and kernel-level drivers. Air-gap protocols activated.',
        mitigation_action: 'Quarantined endpoint crazyfish228 and severed external communication routes.',
      },
      {
        threat_type: 'ILOVEYOU',
        severity: 'high',
        source_ip: '172.16.4.22',
        destination_ip: '172.16.4.1',
        description: 'Visual Basic Script attachment spreading via mail daemon. Executing LOVE-LETTER-FOR-YOU.TXT.vbs payload.',
        confidence_score: 0.92,
        ai_analysis: 'Mass-mailing worm replacing multimedia files with VBS scripts. Registry run keys modified.',
        mitigation_action: 'Inbound email gateway rule configured to drop VBS attachments; endpoint cleaned.',
      },
      {
        threat_type: 'Melissa',
        severity: 'medium',
        source_ip: '192.168.10.55',
        destination_ip: '192.168.10.1',
        description: 'Macro virus detected inside incoming Word document list.doc. Attempting Outlook address book harvesting.',
        confidence_score: 0.88,
        ai_analysis: 'Macro payload matches Word97/Melissa.A. Disabling macro execution across network shares.',
        mitigation_action: 'Disabled VBA macro execution globally via GPO policy update.',
      },
      {
        threat_type: 'MyDoom',
        severity: 'high',
        source_ip: '45.33.32.156',
        destination_ip: '10.0.2.18',
        description: 'High volume TCP SYN flood on port 3127 opening backdoor listener and initiating DDoS flooding.',
        confidence_score: 0.94,
        ai_analysis: 'Backdoor trojan variant novarg.b. Attempting DNS query spam towards root servers.',
        mitigation_action: 'Port 3127 dropped on border router and host network interface isolated.',
      },
      {
        threat_type: 'Sasser',
        severity: 'high',
        source_ip: '185.220.101.5',
        destination_ip: '10.0.1.99',
        description: 'LSASS buffer overflow exploitation attempt on TCP port 445 causing intermittent LSASS.EXE system restarts.',
        confidence_score: 0.91,
        ai_analysis: 'Sasser.B worm propagating automatically across unpatched subnet segments.',
        mitigation_action: 'Filtered TCP port 445 and dispatched security update KB835732.',
      },
      {
        threat_type: 'Conficker',
        severity: 'critical',
        source_ip: '198.51.100.42',
        destination_ip: '10.0.5.12',
        description: 'NetAPI32.dll vulnerability exploitation attempt with dictionary attack on local administrator accounts.',
        confidence_score: 0.97,
        ai_analysis: 'Conficker worm attempting P2P coordination and DNS flux rendezvous.',
        mitigation_action: 'Automated remediation executed: account locked, MS08-067 patch enforced.',
      },
      {
        threat_type: 'Zeus Trojan',
        severity: 'medium',
        source_ip: '10.0.3.44',
        destination_ip: '104.244.42.1',
        description: 'Man-in-the-browser keylogging activity detected intercepting secure session tokens.',
        confidence_score: 0.85,
        ai_analysis: 'Form-grabbing hook detected in browser memory space. Process terminated.',
        mitigation_action: 'Revoked active user session and reset multi-factor authentication tokens.',
      }
    ];

    const results = [];
    for (const item of sampleThreats) {
      try {
        const created = await this.createThreat(item);
        results.push(created);
      } catch (e) {
        console.error('Seed item failed', e);
      }
    }
    return results;
  }
};
