import { useState } from "react";

export default function IEFrame({ children }) {
  const [url, setUrl] = useState("http://alexberrios.com/desktop");

  return (
    <div className="ie-frame">
      {/* Title bar */}
      <div className="ie-titlebar">
        <div className="ie-titlebar-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="#f0c000" stroke="#c09000" strokeWidth="1"/>
            <path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="#00a0e0"/>
            <path d="M8 2a6 6 0 0 0-6 6 6 6 0 0 0 6 6" fill="#e03030"/>
            <path d="M8 3v10M3 8h10" stroke="#fff" strokeWidth="0.8"/>
          </svg>
        </div>
        <span className="ie-titlebar-text">Alex Archive OS - Microsoft Internet Explorer</span>
        <div className="ie-titlebar-buttons">
          <button type="button" aria-label="Minimize">_</button>
          <button type="button" aria-label="Maximize">□</button>
          <button type="button" aria-label="Close">×</button>
        </div>
      </div>

      {/* Menu bar */}
      <div className="ie-menubar">
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((item) => (
          <button key={item} type="button" className="ie-menu-item">
            <u>{item[0]}</u>{item.slice(1)}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="ie-toolbar">
        <div className="ie-toolbar-group">
          <button type="button" className="ie-tool-btn" title="Back">
            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M12 4L6 10l6 6" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
            <span>Back</span>
          </button>
          <button type="button" className="ie-tool-btn" title="Forward">
            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M8 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
          </button>
          <button type="button" className="ie-tool-btn" title="Stop">
            <svg width="18" height="18" viewBox="0 0 18 18"><rect x="3" y="3" width="12" height="12" fill="#c00000"/></svg>
          </button>
          <button type="button" className="ie-tool-btn" title="Refresh">
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 2a7 7 0 1 1-6.3 4" fill="none" stroke="#008000" strokeWidth="2"/><path d="M2 3l1 4 4-1" fill="#008000"/></svg>
          </button>
          <div className="ie-toolbar-divider" />
          <button type="button" className="ie-tool-btn" title="Home">
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 2L2 8h2v7h4v-4h2v4h4V8h2z" fill="#0080c0"/></svg>
          </button>
          <button type="button" className="ie-tool-btn" title="Search">
            <svg width="18" height="18" viewBox="0 0 18 18"><circle cx="7" cy="7" r="5" fill="none" stroke="#c0a000" strokeWidth="2"/><path d="M11 11l5 5" stroke="#c0a000" strokeWidth="2"/></svg>
          </button>
          <button type="button" className="ie-tool-btn" title="Favorites">
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 2l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="#c0a000"/></svg>
          </button>
          <button type="button" className="ie-tool-btn" title="History">
            <svg width="18" height="18" viewBox="0 0 18 18"><circle cx="9" cy="9" r="7" fill="none" stroke="#0080c0" strokeWidth="2"/><path d="M9 5v4l3 2" stroke="#0080c0" strokeWidth="2" fill="none"/></svg>
          </button>
        </div>
      </div>

      {/* Address bar */}
      <div className="ie-addressbar">
        <span className="ie-address-label">Address</span>
        <div className="ie-address-input-wrap">
          <span className="ie-address-icon">🌐</span>
          <input
            type="text"
            className="ie-address-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            readOnly
          />
          <button type="button" className="ie-address-dropdown">▼</button>
        </div>
        <span className="ie-address-label">Links</span>
        <div className="ie-address-input-wrap ie-links-wrap">
          <span className="ie-address-icon">🔗</span>
          <span className="ie-links-text">Alex's Links</span>
          <button type="button" className="ie-address-dropdown">▼</button>
        </div>
      </div>

      {/* Content */}
      <div className="ie-content">
        {children}
      </div>

      {/* Status bar */}
      <div className="ie-statusbar">
        <div className="ie-status-panel">
          <span className="ie-status-icon">🌐</span>
          <span>Done</span>
        </div>
        <div className="ie-status-panel ie-status-separator" />
        <div className="ie-status-panel">
          <span>Internet</span>
        </div>
        <div className="ie-status-panel ie-status-separator" />
        <div className="ie-status-panel ie-status-right">
          <span>My Computer</span>
        </div>
      </div>
    </div>
  );
}
