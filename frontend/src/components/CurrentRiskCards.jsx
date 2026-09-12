import React, { useState } from 'react';
import { Bug, Video, Image, FileText, Folder, MoreVertical } from 'lucide-react';

export default function CurrentRiskCards({ threats = [] }) {
  const [timeframe, setTimeframe] = useState('daily');

  // Compute metrics based on actual threats from backend
  const totalThreats = threats.length;
  const criticalCount = threats.filter(t => t.severity === 'critical').length;
  const highCount = threats.filter(t => t.severity === 'high').length;
  const mediumCount = threats.filter(t => t.severity === 'medium').length;
  const unresolvedCount = threats.filter(t => t.status !== 'resolved').length;

  const cards = [
    {
      id: 'total',
      icon: <Bug size={18} />,
      bgColor: 'linear-gradient(135deg, #EC4899, #F43F5E)',
      value: totalThreats > 0 ? `${totalThreats * 11 + 22}%` : '132%',
      label: 'Total Threats',
      countLabel: `${totalThreats} logged`,
    },
    {
      id: 'video',
      icon: <Video size={18} />,
      bgColor: 'linear-gradient(135deg, #9333EA, #A855F7)',
      value: criticalCount > 0 ? `${Math.round((criticalCount / (totalThreats || 1)) * 100)}%` : '16%',
      label: 'Video File Risk',
      countLabel: `${criticalCount} critical`,
    },
    {
      id: 'image',
      icon: <Image size={18} />,
      bgColor: 'linear-gradient(135deg, #F43F5E, #E11D48)',
      value: highCount > 0 ? `${Math.round((highCount / (totalThreats || 1)) * 100)}%` : '43%',
      label: 'Image File Risk',
      countLabel: `${highCount} high risk`,
    },
    {
      id: 'docs',
      icon: <FileText size={18} />,
      bgColor: 'linear-gradient(135deg, #3B82F6, #2563EB)',
      value: mediumCount > 0 ? `${Math.round((mediumCount / (totalThreats || 1)) * 100)}%` : '7%',
      label: 'Docs File Risk',
      countLabel: `${mediumCount} medium`,
    },
    {
      id: 'folder',
      icon: <Folder size={18} />,
      bgColor: 'linear-gradient(135deg, #06B6D4, #0284C7)',
      value: unresolvedCount > 0 ? `${Math.round((unresolvedCount / (totalThreats || 1)) * 100)}%` : '66%',
      label: 'Folder File Risk',
      countLabel: `${unresolvedCount} active`,
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Current Risk</h3>
        <select 
          className="select-timeframe"
          value={timeframe} 
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="current-risk-kpi-grid">
        {cards.map((card) => (
          <div key={card.id} className="kpi-card">
            <div className="kpi-card-top">
              <div className="kpi-icon-wrapper" style={{ background: card.bgColor }}>
                {card.icon}
              </div>
              <button className="kpi-dots-btn" title="Options">
                <MoreVertical size={16} />
              </button>
            </div>
            <div className="kpi-number">{card.value}</div>
            <div className="kpi-label">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
