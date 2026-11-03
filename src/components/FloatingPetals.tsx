import React from 'react';

// Lightweight CSS-only petals: transform/opacity keyframes run on the GPU compositor,
// unlike per-frame JS animation. Values are fixed (no Math.random) so render is stable.
const PETALS = [
  { left: 6, size: 12, dur: 18, delay: 0, drift: 30, color: '#d4b896' },
  { left: 16, size: 9, dur: 22, delay: 6, drift: -20, color: '#e6d5b8' },
  { left: 27, size: 14, dur: 20, delay: 11, drift: 25, color: '#c9a96e' },
  { left: 38, size: 10, dur: 24, delay: 3, drift: -30, color: '#f5ebe0' },
  { left: 49, size: 13, dur: 19, delay: 14, drift: 20, color: '#d4b896' },
  { left: 60, size: 9, dur: 23, delay: 8, drift: -25, color: '#e6d5b8' },
  { left: 71, size: 12, dur: 21, delay: 1, drift: 30, color: '#c9a96e' },
  { left: 81, size: 10, dur: 25, delay: 16, drift: -20, color: '#f5ebe0' },
  { left: 90, size: 13, dur: 20, delay: 5, drift: 25, color: '#d4b896' },
  { left: 96, size: 9, dur: 22, delay: 12, drift: -30, color: '#e6d5b8' },
];

export const FloatingPetals: React.FC = () => (
  <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden" aria-hidden="true">
    {PETALS.map((p, i) => (
      <svg
        key={i}
        className="petal"
        width={p.size}
        height={p.size}
        viewBox="0 0 24 24"
        fill={p.color}
        style={
          {
            left: `${p.left}%`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
          } as React.CSSProperties
        }
      >
        <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
      </svg>
    ))}
  </div>
);
