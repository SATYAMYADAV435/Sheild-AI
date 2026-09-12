import React from 'react';
import { MoreVertical } from 'lucide-react';

export default function RiskScoreGauge({ threats = [] }) {
  // Calculate a dynamic risk score from 0 to 1000 based on threats
  let score = 741; // Default matching referral image

  if (threats.length > 0) {
    const criticals = threats.filter(t => t.severity === 'critical').length;
    const highs = threats.filter(t => t.severity === 'high').length;
    const mediums = threats.filter(t => t.severity === 'medium').length;
    const lows = threats.filter(t => t.severity === 'low').length;

    // Weight scores: critical: 120, high: 80, medium: 40, low: 15
    const computed = Math.min(1000, 300 + (criticals * 110) + (highs * 75) + (mediums * 35) + (lows * 15));
    score = computed;
  }

  // Determine label & badge styling based on referral swatches
  let level = 'High';
  let badgeClass = 'badge-high';
  if (score >= 800) {
    level = 'Critical';
    badgeClass = 'badge-critical';
  } else if (score >= 600) {
    level = 'High';
    badgeClass = 'badge-high';
  } else if (score >= 400) {
    level = 'Medium';
    badgeClass = 'badge-medium';
  } else {
    level = 'Low';
    badgeClass = 'badge-low';
  }

  // Semicircular Arc Math
  // Angle from -180 deg to 0 deg (or math coordinates)
  // Radius = 75, Center = (100, 95)
  const radius = 72;
  const cx = 100;
  const cy = 90;
  
  // Percentage of 1000
  const ratio = Math.max(0, Math.min(1, score / 1000));
  // Total semi-circle arc length = PI * R
  const arcLength = Math.PI * radius;
  const strokeDashoffset = arcLength * (1 - ratio);

  // Indicator needle/circle position
  const angle = Math.PI * (1 - ratio); // from PI (left, score 0) to 0 (right, score 1000)
  const px = cx - radius * Math.cos(angle);
  const py = cy - radius * Math.sin(angle);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Risk Score</h3>
        <button className="kpi-dots-btn" title="Options">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="gauge-card-content">
        <div className="gauge-svg-wrapper">
          <svg viewBox="0 0 200 115" width="220" height="125">
            <defs>
              {/* Gradient matching referral colors (coral, amber, orange) */}
              <linearGradient id="gaugeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EECC8C" />
                <stop offset="50%" stopColor="#E8B298" />
                <stop offset="100%" stopColor="#A36361" />
              </linearGradient>
            </defs>

            {/* Track Background */}
            <path
              d="M 28 90 A 72 72 0 0 1 172 90"
              fill="none"
              stroke="#1C243C"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Progress Arc */}
            <path
              d="M 28 90 A 72 72 0 0 1 172 90"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={arcLength}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
            />

            {/* Indicator Dot */}
            <circle
              cx={px}
              cy={py}
              r="10"
              fill="#FFFFFF"
              stroke="#E8B298"
              strokeWidth="4"
              filter="drop-shadow(0px 0px 6px rgba(255,255,255,0.8))"
              style={{ transition: 'all 0.8s ease-out' }}
            />
          </svg>

          {/* Central Overlay */}
          <div className="gauge-text-overlay">
            <span className="gauge-sub">Score</span>
            <span className="gauge-score">{score}</span>
            <span className={`gauge-badge-pill ${badgeClass}`}>{level}</span>
          </div>
        </div>

        {/* 0 and 1000 bounds */}
        <div className="gauge-endpoints">
          <span>0</span>
          <span>1000</span>
        </div>
      </div>
    </div>
  );
}
