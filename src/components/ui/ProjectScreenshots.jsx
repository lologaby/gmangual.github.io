/*
 * Hand-coded SVG "screenshots" that look like real app interfaces.
 * Each visual represents what the actual project tool/dashboard might look like.
 */

export function ProcurementScreenshot() {
  return (
    <svg viewBox="0 0 420 250" className="project-image-svg" aria-hidden="true">
      <defs>
        <linearGradient id="psGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#120820" />
          <stop offset="100%" stopColor="#071515" />
        </linearGradient>
      </defs>
      {/* App chrome */}
      <rect width="420" height="250" fill="url(#psGrad)" />
      {/* Title bar */}
      <rect x="0" y="0" width="420" height="28" fill="#0f0a1a" />
      <circle cx="18" cy="14" r="4" fill="#ff0055" opacity="0.6" />
      <circle cx="32" cy="14" r="4" fill="#ffcc00" opacity="0.6" />
      <circle cx="46" cy="14" r="4" fill="#00f0ff" opacity="0.6" />
      <text x="210" y="18" fill="#c0a8d8" fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="middle">SAP Procurement Automation</text>
      {/* Sidebar */}
      <rect x="0" y="28" width="110" height="222" fill="#0a0a14" />
      <rect x="14" y="46" width="82" height="10" rx="2" fill="#3a1a3a" opacity="0.5" />
      <rect x="14" y="66" width="62" height="8" rx="2" fill="#3a1a3a" opacity="0.3" />
      <rect x="14" y="80" width="72" height="8" rx="2" fill="#3a1a3a" opacity="0.3" />
      <rect x="14" y="94" width="52" height="8" rx="2" fill="#3a1a3a" opacity="0.3" />
      {/* Main table header */}
      <rect x="126" y="42" width="280" height="24" fill="#120824" />
      {["REQ-ID", "VENDOR", "STATUS", "AUTO"].map((h, i) => (
        <text key={h} x={`${140 + i * 68}`} y="58" fill="#c0a8d8" fontSize="9" fontFamily="JetBrains Mono, monospace">{h}</text>
      ))}
      {/* Table rows */}
      {[0, 1, 2, 3, 4].map((row) => (
        <g key={row}>
          <rect x="126" y={`${72 + row * 28}`} width="280" height="26" fill={row % 2 === 0 ? "#0d0a1a" : "#0a0a14"} />
          <text x="140" y={`${88 + row * 28}`} fill="#d8c0e8" fontSize="9" fontFamily="JetBrains Mono, monospace">PR-{202400 + row}</text>
          <text x="208" y={`${88 + row * 28}`} fill="#c0a8d8" fontSize="9" fontFamily="JetBrains Mono, monospace">Vendor {String.fromCharCode(65 + row)}</text>
          <rect x="280" y={`${80 + row * 28}`} width="44" height="12" rx="2" fill={row === 2 ? "#ffcc00" : "#00f0ff"} opacity="0.2" />
          <text x="284" y={`${89 + row * 28}`} fill={row === 2 ? "#ffcc00" : "#00f0ff"} fontSize="8" fontFamily="JetBrains Mono, monospace">{row === 2 ? "PEND" : "OK"}</text>
          <text x="356" y={`${88 + row * 28}`} fill="#ff00a0" fontSize="9" fontFamily="JetBrains Mono, monospace">{row === 2 ? "--" : "✓"}</text>
        </g>
      ))}
      {/* Status bar */}
      <rect x="126" y="222" width="280" height="20" fill="#0f0a1a" />
      <text x="136" y="235" fill="#00f0ff" fontSize="8" fontFamily="JetBrains Mono, monospace">● 5 jobs queued</text>
      <text x="340" y="235" fill="#c0a8d8" fontSize="8" fontFamily="JetBrains Mono, monospace">last run: 2m ago</text>
      {/* Scanlines */}
      <line x1="0" y1="50" x2="420" y2="50" stroke="#00f0ff" strokeWidth="0.5" opacity="0.04" />
      <line x1="0" y1="100" x2="420" y2="100" stroke="#00f0ff" strokeWidth="0.5" opacity="0.04" />
      <line x1="0" y1="150" x2="420" y2="150" stroke="#00f0ff" strokeWidth="0.5" opacity="0.04" />
      <line x1="0" y1="200" x2="420" y2="200" stroke="#00f0ff" strokeWidth="0.5" opacity="0.04" />
    </svg>
  );
}

export function NocScreenshot() {
  return (
    <svg viewBox="0 0 420 250" className="project-image-svg" aria-hidden="true">
      <rect width="420" height="250" fill="#120820" />
      {/* Header */}
      <rect x="0" y="0" width="420" height="32" fill="#0f0a1a" />
      <text x="14" y="20" fill="#ff00a0" fontSize="11" fontFamily="JetBrains Mono, monospace">NOC Reporting Tool v1.4</text>
      <rect x="340" y="10" width="60" height="14" rx="2" fill="#00f0ff" opacity="0.15" />
      <text x="348" y="20" fill="#00f0ff" fontSize="8" fontFamily="JetBrains Mono, monospace">ONLINE</text>
      {/* Left: Input form */}
      <rect x="14" y="48" width="180" height="188" fill="#0a0a14" rx="2" />
      <text x="26" y="66" fill="#c0a8d8" fontSize="9" fontFamily="JetBrains Mono, monospace">Shift Report</text>
      <rect x="26" y="74" width="156" height="18" fill="#120820" stroke="#3a1a3a" strokeWidth="0.5" />
      <text x="30" y="86" fill="#c0a8d8" fontSize="8" fontFamily="JetBrains Mono, monospace">Ticket #</text>
      <rect x="26" y="100" width="156" height="18" fill="#120820" stroke="#3a1a3a" strokeWidth="0.5" />
      <text x="30" y="112" fill="#c0a8d8" fontSize="8" fontFamily="JetBrains Mono, monospace">Issue type</text>
      <rect x="26" y="126" width="156" height="48" fill="#120820" stroke="#3a1a3a" strokeWidth="0.5" />
      <text x="30" y="140" fill="#c0a8d8" fontSize="8" fontFamily="JetBrains Mono, monospace">Notes...</text>
      <rect x="26" y="184" width="72" height="20" rx="2" fill="#ff00a0" opacity="0.15" />
      <text x="34" y="197" fill="#ff00a0" fontSize="8" fontFamily="JetBrains Mono, monospace">Submit</text>
      {/* Right: Live feed */}
      <rect x="208" y="48" width="198" height="188" fill="#0a0a14" rx="2" />
      <text x="220" y="66" fill="#c0a8d8" fontSize="9" fontFamily="JetBrains Mono, monospace">Recent Reports</text>
      {[0, 1, 2, 3, 4].map((row) => (
        <g key={row}>
          <rect x="220" y={`${76 + row * 30}`} width="174" height="26" fill={row === 0 ? "#120824" : "#0a0a14"} rx="1" />
          <circle cx="232" cy={`${89 + row * 30}`} r="3" fill={row === 0 ? "#ffcc00" : row === 2 ? "#ff0055" : "#00f0ff"} opacity="0.7" />
          <text x="242" y={`${89 + row * 30}`} fill="#d8c0e8" fontSize="8" fontFamily="JetBrains Mono, monospace">#{1042 + row} {row === 2 ? "OUTAGE" : "OK"}</text>
          <text x="372" y={`${89 + row * 30}`} fill="#8a5a8a" fontSize="7" fontFamily="JetBrains Mono, monospace">{row}m</text>
        </g>
      ))}
      {/* Waveform at bottom */}
      <path d="M208 232 Q228 224, 248 232 T288 232 T328 228 T368 232 T406 232" fill="none" stroke="#ff00a0" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

export function SupportScreenshot() {
  return (
    <svg viewBox="0 0 420 250" className="project-image-svg" aria-hidden="true">
      <rect width="420" height="250" fill="#120820" />
      {/* Split view: BookStack left, osTicket right */}
      <rect x="0" y="0" width="210" height="250" fill="#0f0a1a" />
      <rect x="210" y="0" width="210" height="250" fill="#120820" />
      {/* BookStack chrome */}
      <rect x="0" y="0" width="210" height="28" fill="#071515" />
      <text x="10" y="18" fill="#ff00a0" fontSize="9" fontFamily="JetBrains Mono, monospace">📚 BookStack</text>
      <rect x="10" y="38" width="190" height="18" rx="2" fill="#120824" />
      <text x="18" y="50" fill="#8a5a8a" fontSize="8" fontFamily="JetBrains Mono, monospace">Search knowledge base...</text>
      {/* Book pages */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="10" y={`${68 + i * 36}`} width="190" height="30" fill={i === 1 ? "#120824" : "#0a0a14"} rx="1" />
          <rect x="18" y={`${74 + i * 36}`} width="80" height="6" rx="1" fill="#3a1a3a" opacity="0.5" />
          <rect x="18" y={`${84 + i * 36}`} width="120" height="4" rx="1" fill="#3a1a3a" opacity="0.3" />
          <rect x="18" y={`${90 + i * 36}`} width="100" height="4" rx="1" fill="#3a1a3a" opacity="0.3" />
        </g>
      ))}
      {/* osTicket chrome */}
      <rect x="210" y="0" width="210" height="28" fill="#0f0a1a" />
      <text x="222" y="18" fill="#ff0055" fontSize="9" fontFamily="JetBrains Mono, monospace">🎫 osTicket</text>
      {/* Ticket list */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="222" y={`${40 + i * 36}`} width="186" height="32" fill={i === 0 ? "#1a0a14" : "#0a0a14"} rx="1" />
          <rect x="230" y={`${48 + i * 36}`} width="50" height="6" rx="1" fill={i === 0 ? "#ff0055" : "#3a1a3a"} opacity="0.5" />
          <text x="288" y={`${54 + i * 36}`} fill="#c0a8d8" fontSize="8" fontFamily="JetBrains Mono, monospace">TKT-{8821 + i}</text>
          <rect x="230" y={`${60 + i * 36}`} width="100" height="4" rx="1" fill="#3a1a3a" opacity="0.3" />
          <text x="368" y={`${54 + i * 36}`} fill={i === 0 ? "#ff0055" : "#8a5a8a"} fontSize="7" fontFamily="JetBrains Mono, monospace">{i === 0 ? "OPEN" : "CLOSED"}</text>
        </g>
      ))}
      {/* Connection arrow */}
      <path d="M195 120 L215 120" stroke="#ffcc00" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
      <polygon points="210,117 215,120 210,123" fill="#ffcc00" opacity="0.5" />
      <rect x="170" y="114" width="70" height="12" fill="#0f0a1a" opacity="0.9" />
      <text x="175" y="123" fill="#ffcc00" fontSize="7" fontFamily="JetBrains Mono, monospace">sync</text>
    </svg>
  );
}

export function FleetScreenshot() {
  return (
    <svg viewBox="0 0 420 250" className="project-image-svg" aria-hidden="true">
      <rect width="420" height="250" fill="#120820" />
      {/* Header */}
      <rect x="0" y="0" width="420" height="32" fill="#0f0a1a" />
      <text x="14" y="20" fill="#ff00a0" fontSize="11" fontFamily="JetBrains Mono, monospace">Device Fleet Manager</text>
      <text x="340" y="20" fill="#00f0ff" fontSize="9" fontFamily="JetBrains Mono, monospace">88 enrolled</text>
      {/* Device grid */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 14 + col * 100;
        const y = 46 + row * 96;
        const status = i === 5 ? "warn" : i === 2 ? "sync" : "ok";
        return (
          <g key={i}>
            <rect x={x} y={y} width="86" height="82" rx="3" fill="#0a0a14" stroke="#3a1a3a" strokeWidth="0.5" />
            {/* Device icon */}
            <rect x={x + 29} y={y + 10} width="28" height="44" rx="3" fill="none" stroke="#3a1a5c" strokeWidth="1" />
            <rect x={x + 33} y={y + 14} width="20" height="32" rx="1" fill="#120820" />
            <rect x={x + 38} y={y + 50} width="10" height="2" rx="1" fill="#3a1a5c" />
            {/* Signal */}
            <rect x={x + 16} y={y + 62} width="4" height="6" rx="1" fill={status === "warn" ? "#ffcc00" : "#00f0ff"} opacity="0.7" />
            <rect x={x + 22} y={y + 58} width="4" height="10" rx="1" fill={status === "warn" ? "#ffcc00" : "#00f0ff"} opacity="0.7" />
            <rect x={x + 28} y={y + 54} width="4" height="14" rx="1" fill={status === "warn" ? "#ffcc00" : "#00f0ff"} opacity={status === "warn" ? 0.4 : 0.7} />
            <rect x={x + 34} y={y + 50} width="4" height="18" rx="1" fill="#00f0ff" opacity={status === "warn" ? 0.2 : 0.5} />
            {/* Status dot */}
            <circle cx={x + 70} cy={y + 18} r="4" fill={status === "warn" ? "#ffcc00" : status === "sync" ? "#ff00a0" : "#00f0ff"} opacity="0.6" />
            <text x={x + 10} y={y + 76} fill="#8a5a8a" fontSize="7" fontFamily="JetBrains Mono, monospace">ZEB-{4100 + i}</text>
          </g>
        );
      })}
      {/* Bottom status */}
      <rect x="0" y="228" width="420" height="22" fill="#0f0a1a" />
      <text x="14" y="242" fill="#c0a8d8" fontSize="8" fontFamily="JetBrains Mono, monospace">Policy: Intune AE  |  Compliance: 97.7%</text>
    </svg>
  );
}
