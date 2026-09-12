import React, { useState } from 'react';

export default function ThreatSummaryChart({ threats = [] }) {
  const [timeframe, setTimeframe] = useState('yearly');
  const [hoveredIndex, setHoveredIndex] = useState(5); // Default hovered on June (index 5) matching image

  // Monthly data points Jan - Dec
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Base threat volume values
  const basePoints = [18, 22, 19, 24, 21, 29, 23, 20, 26, 21, 19, 25];

  // Adjust if backend threats provide monthly timestamps
  const points = [...basePoints];
  if (threats.length > 0) {
    // Distribute actual backend threats into recent months
    points[5] = Math.max(29, threats.length * 3);
  }

  // SVG dimensions
  const width = 600;
  const height = 180;
  const paddingX = 20;
  const paddingY = 20;
  const maxVal = 40;

  // Calculate coordinates
  const coords = points.map((val, i) => {
    const x = paddingX + (i / (points.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (val / maxVal) * (height - paddingY * 2);
    return { x, y, val, month: months[i] };
  });

  // Construct smooth bezier curve path
  const makePath = () => {
    if (coords.length === 0) return '';
    let d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i === 0 ? 0 : i - 1];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const linePath = makePath();
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;

  const hoveredPoint = coords[hoveredIndex] || coords[5];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Threat Summary</h3>
        <select 
          className="select-timeframe"
          value={timeframe} 
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="chart-container">
        {/* Y Axis percentage labels */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 24,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: '10px',
          color: '#5E6C84',
          pointerEvents: 'none'
        }}>
          <span>500%</span>
          <span>400%</span>
          <span>300%</span>
          <span>200%</span>
          <span>100%</span>
          <span>0%</span>
        </div>

        {/* SVG Chart */}
        <div style={{ marginLeft: 34, height: '100%', position: 'relative' }}>
          <svg 
            viewBox={`0 0 ${width} ${height}`} 
            className="chart-svg" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="purpleAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#9333EA" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#9333EA" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0.2, 0.4, 0.6, 0.8].map((ratio, i) => (
              <line
                key={i}
                x1="0"
                y1={height * ratio}
                x2={width}
                y2={height * ratio}
                stroke="rgba(255, 255, 255, 0.04)"
                strokeDasharray="4 4"
              />
            ))}

            {/* Shaded Area */}
            <path d={areaPath} fill="url(#purpleAreaGrad)" />

            {/* Smooth Wave Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#A855F7"
              strokeWidth="2.8"
              filter="drop-shadow(0px 0px 8px rgba(168, 85, 247, 0.7))"
            />

            {/* Vertical Guide for hovered point */}
            {hoveredPoint && (
              <line
                x1={hoveredPoint.x}
                y1={hoveredPoint.y}
                x2={hoveredPoint.x}
                y2={height}
                stroke="#A855F7"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.8"
              />
            )}

            {/* Interactive Points */}
            {coords.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r={i === hoveredIndex ? 6 : 4}
                fill={i === hoveredIndex ? '#FFFFFF' : '#A855F7'}
                stroke="#9333EA"
                strokeWidth={i === hoveredIndex ? 3 : 2}
                style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                onMouseEnter={() => setHoveredIndex(i)}
              />
            ))}
          </svg>

          {/* Hover Tooltip (June 2024 Threats: 29) */}
          {hoveredPoint && (
            <div 
              className="chart-tooltip" 
              style={{ 
                left: `${(hoveredPoint.x / width) * 100}%`, 
                top: `${(hoveredPoint.y / height) * 100}%` 
              }}
            >
              <div>{hoveredPoint.month} 2024</div>
              <div>Threats: {hoveredPoint.val}</div>
            </div>
          )}
        </div>
      </div>

      {/* X Axis Month Labels */}
      <div className="chart-x-labels">
        {months.map((m, i) => (
          <span 
            key={m} 
            style={{ 
              color: i === hoveredIndex ? '#A855F7' : '#5E6C84', 
              fontWeight: i === hoveredIndex ? '600' : '400',
              cursor: 'pointer' 
            }}
            onClick={() => setHoveredIndex(i)}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
