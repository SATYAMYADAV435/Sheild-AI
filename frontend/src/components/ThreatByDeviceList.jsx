import React from 'react';
import { Monitor, MoreVertical, Server, Laptop } from 'lucide-react';

export default function ThreatByDeviceList({ threats = [] }) {
  // Extract unique devices from threats or use referral defaults
  const defaultDevices = [
    { id: 'crazyfish228', ip: '192.168.1.105', riskScore: 84, icon: <Monitor size={18} /> },
    { id: 'angryswan732', ip: '10.14.88.12', riskScore: 72, icon: <Server size={18} /> },
    { id: 'swiftfalcon104', ip: '172.16.4.22', riskScore: 48, icon: <Laptop size={18} /> },
    { id: 'darkraven992', ip: '45.33.32.156', riskScore: 61, icon: <Monitor size={18} /> },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Threat by device</h3>
        <button className="kpi-dots-btn" title="Options">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="device-list">
        {defaultDevices.map((dev) => {
          // Circular gauge params
          const radius = 16;
          const circum = 2 * Math.PI * radius;
          const strokeDashoffset = circum * (1 - dev.riskScore / 100);

          // Color based on risk score
          const strokeColor = dev.riskScore > 75 ? '#A36361' : dev.riskScore > 50 ? '#EECC8C' : '#BDD1C5';

          return (
            <div key={dev.id} className="device-item">
              <div className="device-info">
                <div className="device-icon">
                  {dev.icon}
                </div>
                <div className="device-text">
                  <div className="device-sub">Device ID</div>
                  <div className="device-id">{dev.id}</div>
                </div>
              </div>

              {/* Circular Mini Gauge */}
              <div className="device-gauge-mini">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <circle
                    cx="20"
                    cy="20"
                    r={radius}
                    fill="transparent"
                    stroke="#1C243C"
                    strokeWidth="4"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r={radius}
                    fill="transparent"
                    stroke={strokeColor}
                    strokeWidth="4"
                    strokeDasharray={circum}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                  />
                </svg>
                <span className="mini-gauge-score" style={{ color: strokeColor }}>
                  {dev.riskScore}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
