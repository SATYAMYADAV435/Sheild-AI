import React from 'react';
import { MoreVertical } from 'lucide-react';

export default function ThreatsByVirusDonut({ threats = [] }) {
  // Virus definitions matching referral image + dynamic backend counts
  const categories = [
    { name: 'ILOVEYOU', color: '#A855F7', defaultPct: 35 },
    { name: 'Melissa', color: '#EC4899', defaultPct: 25 },
    { name: 'MyDoom', color: '#3B82F6', defaultPct: 20 },
    { name: 'Sasser', color: '#06B6D4', defaultPct: 20 },
  ];

  // Check if backend threats match or augment with others
  let segments = categories.map(cat => {
    const matchCount = threats.filter(t => 
      t.threat_type.toLowerCase().includes(cat.name.toLowerCase())
    ).length;
    return {
      ...cat,
      count: matchCount || (cat.defaultPct / 5),
    };
  });

  const totalSum = segments.reduce((acc, s) => acc + s.count, 0) || 100;
  
  // Compute strokeDasharray and strokeDashoffset for each segment
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  const segmentArcs = segments.map((seg) => {
    const fraction = seg.count / totalSum;
    const strokeDash = fraction * circumference;
    const offset = accumulatedOffset;
    accumulatedOffset += strokeDash;

    return {
      ...seg,
      percentage: Math.round(fraction * 100),
      strokeDasharray: `${strokeDash} ${circumference - strokeDash}`,
      strokeDashoffset: -offset,
    };
  });

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Threats By Virus</h3>
        <button className="kpi-dots-btn" title="Options">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="donut-wrapper">
        <div className="donut-svg-container">
          <svg viewBox="0 0 160 160" width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#1A233D"
              strokeWidth="16"
            />

            {/* Segments */}
            {segmentArcs.map((seg, i) => (
              <circle
                key={seg.name}
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth="16"
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'all 0.6s ease-out' }}
              />
            ))}
          </svg>

          {/* Center Label (Total 65%) */}
          <div className="donut-center-label">
            <div className="donut-center-sub">Total</div>
            <div className="donut-center-val">65%</div>
          </div>
        </div>

        {/* Legend matching Referral Image 2 */}
        <div className="donut-legend">
          {segments.map((seg) => (
            <div key={seg.name} className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: seg.color }}></span>
              <span>{seg.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
