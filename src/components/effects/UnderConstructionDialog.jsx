import { useState } from "react";

function PixelExclamationIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      style={{ imageRendering: "pixelated", flexShrink: 0 }}
    >
      {/* Yellow triangle fill */}
      <rect x="14" y="2" width="4" height="2" fill="#ffcc00" />
      <rect x="12" y="4" width="8" height="2" fill="#ffcc00" />
      <rect x="10" y="6" width="12" height="2" fill="#ffcc00" />
      <rect x="10" y="8" width="12" height="2" fill="#ffcc00" />
      <rect x="8" y="10" width="14" height="2" fill="#ffcc00" />
      <rect x="8" y="12" width="14" height="2" fill="#ffcc00" />
      <rect x="8" y="14" width="14" height="2" fill="#ffcc00" />
      <rect x="8" y="16" width="14" height="2" fill="#ffcc00" />
      <rect x="10" y="18" width="12" height="2" fill="#ffcc00" />
      <rect x="10" y="20" width="12" height="2" fill="#ffcc00" />
      <rect x="12" y="22" width="8" height="2" fill="#ffcc00" />
      <rect x="14" y="24" width="4" height="2" fill="#ffcc00" />

      {/* Exclamation dot */}
      <rect x="14" y="26" width="4" height="4" fill="#000" />

      {/* Exclamation stem */}
      <rect x="14" y="8" width="4" height="12" fill="#000" />
    </svg>
  );
}

export default function UnderConstructionDialog() {
  const [bypassed, setBypassed] = useState(() => {
    try {
      return import.meta.env.DEV && localStorage.getItem("devBypass") === "1";
    } catch {
      return false;
    }
  });

  if (bypassed) return null;

  return (
    <div className="win98-overlay">
      <div className="win98-dialog">
        <div className="win98-titlebar">
          <span className="win98-titlebar-text">System Message</span>
        </div>
        <div className="win98-dialog-body">
          <div className="win98-dialog-row">
            <PixelExclamationIcon />
            <p className="win98-dialog-text">
              This site is currently under construction.
              <br />
              Please check back later.
            </p>
          </div>
          <div className="win98-dialog-actions">
            <button
              type="button"
              className="win98-btn"
              onClick={() => {
                if (import.meta.env.DEV) {
                  try {
                    localStorage.setItem("devBypass", "1");
                  } catch {}
                  setBypassed(true);
                }
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
