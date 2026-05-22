export function ProcurementVisual() {
  return (
    <svg viewBox="0 0 420 250" className="project-image-svg" aria-hidden="true">
      <defs>
        <linearGradient id="procGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00e5cc" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ff2a6d" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="420" height="250" fill="#0d2020" />
      <rect x="0" y="0" width="420" height="250" fill="url(#procGrad)" />
      {/* Conveyor belt */}
      <line x1="40" y1="180" x2="380" y2="180" stroke="#1a4a4a" strokeWidth="2" />
      <line x1="40" y1="190" x2="380" y2="190" stroke="#1a4a4a" strokeWidth="2" />
      {/* Boxes on conveyor */}
      <rect x="60" y="150" width="40" height="30" fill="none" stroke="#00e5cc" strokeWidth="1.5" opacity="0.7" />
      <rect x="120" y="145" width="40" height="35" fill="none" stroke="#00e5cc" strokeWidth="1.5" opacity="0.9" />
      <rect x="180" y="152" width="40" height="28" fill="none" stroke="#ff2a6d" strokeWidth="1.5" opacity="0.8" />
      <rect x="240" y="148" width="40" height="32" fill="none" stroke="#00e5cc" strokeWidth="1.5" opacity="0.7" />
      <rect x="300" y="155" width="40" height="25" fill="none" stroke="#f7f709" strokeWidth="1.5" opacity="0.6" />
      {/* Flow arrows */}
      <path d="M80 120 L80 100 L200 100 L200 120" fill="none" stroke="#00e5cc" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      <path d="M220 120 L220 100 L340 100 L340 120" fill="none" stroke="#ff2a6d" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      {/* Data nodes */}
      <circle cx="80" cy="90" r="4" fill="#00e5cc" opacity="0.8" />
      <circle cx="200" cy="90" r="4" fill="#00e5cc" opacity="0.8" />
      <circle cx="340" cy="90" r="4" fill="#ff2a6d" opacity="0.8" />
      {/* Status bars */}
      <rect x="60" y="220" width="300" height="6" rx="3" fill="#1a3a3a" />
      <rect x="60" y="220" width="240" height="6" rx="3" fill="#00e5cc" opacity="0.7" />
      <text x="370" y="225" fill="#7aadad" fontSize="10" fontFamily="JetBrains Mono, monospace">78%</text>
      {/* Scanlines */}
      <line x1="0" y1="50" x2="420" y2="50" stroke="#39ff14" strokeWidth="0.5" opacity="0.04" />
      <line x1="0" y1="100" x2="420" y2="100" stroke="#39ff14" strokeWidth="0.5" opacity="0.04" />
      <line x1="0" y1="150" x2="420" y2="150" stroke="#39ff14" strokeWidth="0.5" opacity="0.04" />
      <line x1="0" y1="200" x2="420" y2="200" stroke="#39ff14" strokeWidth="0.5" opacity="0.04" />
    </svg>
  );
}

export function NocVisual() {
  return (
    <svg viewBox="0 0 420 250" className="project-image-svg" aria-hidden="true">
      <rect width="420" height="250" fill="#0d2020" />
      {/* Grid background */}
      <line x1="0" y1="50" x2="420" y2="50" stroke="#1a3a3a" strokeWidth="0.5" opacity="0.3" />
      <line x1="0" y1="100" x2="420" y2="100" stroke="#1a3a3a" strokeWidth="0.5" opacity="0.3" />
      <line x1="0" y1="150" x2="420" y2="150" stroke="#1a3a3a" strokeWidth="0.5" opacity="0.3" />
      <line x1="0" y1="200" x2="420" y2="200" stroke="#1a3a3a" strokeWidth="0.5" opacity="0.3" />
      <line x1="70" y1="0" x2="70" y2="250" stroke="#1a3a3a" strokeWidth="0.5" opacity="0.3" />
      <line x1="140" y1="0" x2="140" y2="250" stroke="#1a3a3a" strokeWidth="0.5" opacity="0.3" />
      <line x1="210" y1="0" x2="210" y2="250" stroke="#1a3a3a" strokeWidth="0.5" opacity="0.3" />
      <line x1="280" y1="0" x2="280" y2="250" stroke="#1a3a3a" strokeWidth="0.5" opacity="0.3" />
      <line x1="350" y1="0" x2="350" y2="250" stroke="#1a3a3a" strokeWidth="0.5" opacity="0.3" />
      {/* Waveform */}
      <path
        d="M20 125 Q40 80, 70 125 T120 125 T170 70 T220 125 T270 90 T320 125 T370 60 T420 125"
        fill="none"
        stroke="#00e5cc"
        strokeWidth="2"
        opacity="0.8"
      />
      <path
        d="M20 135 Q40 100, 70 135 T120 135 T170 90 T220 135 T270 110 T320 135 T370 80 T420 135"
        fill="none"
        stroke="#ff2a6d"
        strokeWidth="1.5"
        opacity="0.5"
      />
      {/* Radar circles */}
      <circle cx="210" cy="125" r="60" fill="none" stroke="#00e5cc" strokeWidth="0.5" opacity="0.2" />
      <circle cx="210" cy="125" r="40" fill="none" stroke="#00e5cc" strokeWidth="0.5" opacity="0.3" />
      <circle cx="210" cy="125" r="20" fill="none" stroke="#00e5cc" strokeWidth="0.5" opacity="0.4" />
      {/* Sweep line */}
      <line x1="210" y1="125" x2="260" y2="75" stroke="#00e5cc" strokeWidth="1" opacity="0.6" />
      {/* Alert dots */}
      <circle cx="150" cy="100" r="3" fill="#f7f709" opacity="0.9" />
      <circle cx="280" cy="150" r="2.5" fill="#ff2a6d" opacity="0.8" />
      <circle cx="320" cy="90" r="2" fill="#00e5cc" opacity="0.7" />
      {/* Labels */}
      <text x="30" y="230" fill="#7aadad" fontSize="9" fontFamily="JetBrains Mono, monospace">SIGNAL: STRONG</text>
      <text x="280" y="230" fill="#7aadad" fontSize="9" fontFamily="JetBrains Mono, monospace">LATENCY: 12ms</text>
    </svg>
  );
}

export function SupportVisual() {
  return (
    <svg viewBox="0 0 420 250" className="project-image-svg" aria-hidden="true">
      <rect width="420" height="250" fill="#0d2020" />
      {/* Book stack */}
      <rect x="60" y="100" width="100" height="110" rx="2" fill="none" stroke="#00e5cc" strokeWidth="1.5" opacity="0.7" />
      <line x1="70" y1="115" x2="150" y2="115" stroke="#00e5cc" strokeWidth="1" opacity="0.5" />
      <line x1="70" y1="130" x2="150" y2="130" stroke="#00e5cc" strokeWidth="1" opacity="0.5" />
      <line x1="70" y1="145" x2="150" y2="145" stroke="#00e5cc" strokeWidth="1" opacity="0.5" />
      <line x1="70" y1="160" x2="150" y2="160" stroke="#00e5cc" strokeWidth="1" opacity="0.5" />
      <line x1="70" y1="175" x2="150" y2="175" stroke="#00e5cc" strokeWidth="1" opacity="0.5" />
      <line x1="70" y1="190" x2="150" y2="190" stroke="#00e5cc" strokeWidth="1" opacity="0.5" />
      {/* Ticket stub */}
      <rect x="200" y="80" width="160" height="130" rx="2" fill="none" stroke="#ff2a6d" strokeWidth="1.5" opacity="0.8" />
      <line x1="200" y1="100" x2="360" y2="100" stroke="#ff2a6d" strokeWidth="1" opacity="0.4" />
      <line x1="200" y1="120" x2="360" y2="120" stroke="#ff2a6d" strokeWidth="1" opacity="0.3" strokeDasharray="4 2" />
      <line x1="200" y1="140" x2="360" y2="140" stroke="#ff2a6d" strokeWidth="1" opacity="0.3" strokeDasharray="4 2" />
      <line x1="200" y1="160" x2="360" y2="160" stroke="#ff2a6d" strokeWidth="1" opacity="0.3" strokeDasharray="4 2" />
      <line x1="200" y1="180" x2="360" y2="180" stroke="#ff2a6d" strokeWidth="1" opacity="0.4" />
      {/* Ticket number */}
      <text x="220" y="95" fill="#ff2a6d" fontSize="10" fontFamily="JetBrains Mono, monospace" opacity="0.9">TKT-#0421</text>
      {/* Connection line */}
      <path d="M160 155 L200 155" stroke="#f7f709" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <polygon points="195,152 200,155 195,158" fill="#f7f709" opacity="0.6" />
      {/* Status indicators */}
      <circle cx="80" cy="60" r="4" fill="#00e5cc" opacity="0.8" />
      <text x="92" y="64" fill="#7aadad" fontSize="9" fontFamily="JetBrains Mono, monospace">KB_SYNC: OK</text>
      <circle cx="80" cy="78" r="4" fill="#39ff14" opacity="0.8" />
      <text x="92" y="82" fill="#7aadad" fontSize="9" fontFamily="JetBrains Mono, monospace">TICKET_PIPE: ACTIVE</text>
    </svg>
  );
}

export function FleetVisual() {
  return (
    <svg viewBox="0 0 420 250" className="project-image-svg" aria-hidden="true">
      <rect width="420" height="250" fill="#0d2020" />
      {/* Device grid */}
      <rect x="50" y="60" width="70" height="110" rx="4" fill="none" stroke="#00e5cc" strokeWidth="1.5" opacity="0.6" />
      <rect x="135" y="60" width="70" height="110" rx="4" fill="none" stroke="#00e5cc" strokeWidth="1.5" opacity="0.6" />
      <rect x="220" y="60" width="70" height="110" rx="4" fill="none" stroke="#00e5cc" strokeWidth="1.5" opacity="0.6" />
      <rect x="305" y="60" width="70" height="110" rx="4" fill="none" stroke="#00e5cc" strokeWidth="1.5" opacity="0.6" />

      {/* Screen bars inside devices */}
      <rect x="60" y="75" width="50" height="6" rx="3" fill="#00e5cc" opacity="0.4" />
      <rect x="60" y="90" width="35" height="4" rx="2" fill="#00e5cc" opacity="0.3" />
      <rect x="145" y="75" width="50" height="6" rx="3" fill="#00e5cc" opacity="0.4" />
      <rect x="145" y="90" width="35" height="4" rx="2" fill="#00e5cc" opacity="0.3" />
      <rect x="230" y="75" width="50" height="6" rx="3" fill="#ff2a6d" opacity="0.4" />
      <rect x="230" y="90" width="35" height="4" rx="2" fill="#ff2a6d" opacity="0.3" />
      <rect x="315" y="75" width="50" height="6" rx="3" fill="#00e5cc" opacity="0.4" />
      <rect x="315" y="90" width="35" height="4" rx="2" fill="#00e5cc" opacity="0.3" />

      {/* Signal bars */}
      <rect x="65" y="130" width="6" height="12" fill="#39ff14" opacity="0.8" />
      <rect x="74" y="124" width="6" height="18" fill="#39ff14" opacity="0.8" />
      <rect x="83" y="118" width="6" height="24" fill="#39ff14" opacity="0.8" />
      <rect x="92" y="112" width="6" height="30" fill="#39ff14" opacity="0.4" />

      <rect x="150" y="130" width="6" height="12" fill="#39ff14" opacity="0.8" />
      <rect x="159" y="124" width="6" height="18" fill="#39ff14" opacity="0.8" />
      <rect x="168" y="118" width="6" height="24" fill="#39ff14" opacity="0.8" />
      <rect x="177" y="112" width="6" height="30" fill="#39ff14" opacity="0.8" />

      <rect x="235" y="130" width="6" height="12" fill="#f7f709" opacity="0.6" />
      <rect x="244" y="124" width="6" height="18" fill="#f7f709" opacity="0.6" />
      <rect x="253" y="118" width="6" height="24" fill="#f7f709" opacity="0.4" />
      <rect x="262" y="112" width="6" height="30" fill="#f7f709" opacity="0.2" />

      <rect x="320" y="130" width="6" height="12" fill="#39ff14" opacity="0.8" />
      <rect x="329" y="124" width="6" height="18" fill="#39ff14" opacity="0.8" />
      <rect x="338" y="118" width="6" height="24" fill="#39ff14" opacity="0.8" />
      <rect x="347" y="112" width="6" height="30" fill="#39ff14" opacity="0.8" />

      {/* Connection mesh */}
      <line x1="85" y1="170" x2="170" y2="170" stroke="#1a4a4a" strokeWidth="1" />
      <line x1="170" y1="170" x2="255" y2="170" stroke="#1a4a4a" strokeWidth="1" />
      <line x1="255" y1="170" x2="340" y2="170" stroke="#1a4a4a" strokeWidth="1" />
      <line x1="85" y1="170" x2="255" y2="170" stroke="#1a4a4a" strokeWidth="0.5" opacity="0.5" />
      <line x1="170" y1="170" x2="340" y2="170" stroke="#1a4a4a" strokeWidth="0.5" opacity="0.5" />

      {/* Hub node */}
      <circle cx="210" cy="195" r="14" fill="none" stroke="#00e5cc" strokeWidth="1.5" opacity="0.8" />
      <circle cx="210" cy="195" r="6" fill="#00e5cc" opacity="0.4" />
      <line x1="85" y1="170" x2="200" y2="190" stroke="#00e5cc" strokeWidth="0.8" opacity="0.4" />
      <line x1="340" y1="170" x2="220" y2="190" stroke="#00e5cc" strokeWidth="0.8" opacity="0.4" />

      {/* Labels */}
      <text x="50" y="225" fill="#7aadad" fontSize="9" fontFamily="JetBrains Mono, monospace">ENROLLED: 88</text>
      <text x="280" y="225" fill="#7aadad" fontSize="9" fontFamily="JetBrains Mono, monospace">POLICY: ACTIVE</text>
    </svg>
  );
}
