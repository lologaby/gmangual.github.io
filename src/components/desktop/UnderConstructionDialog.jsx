export default function UnderConstructionDialog({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="uc-overlay" onMouseDown={onClose}>
      <div className="uc-dialog" onMouseDown={(e) => e.stopPropagation()}>
        <div className="uc-titlebar">
          <span className="uc-title-text">under_construction.txt</span>
          <button className="uc-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="uc-body">
          <div className="uc-icon">🚧</div>
          <div className="uc-text">
            <p className="uc-heading">Under Construction</p>
            <p className="uc-sub">More projects & features are on the way.</p>
            <p className="uc-sub">Check back soon for updates.</p>
          </div>
        </div>
        <div className="uc-actions">
          <button className="uc-ok" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}
