import { useState } from "react";
import { useWindowManager } from "../../hooks/useWindowManager.jsx";
import { openDesktopApp } from "./DesktopApps.jsx";
import UnderConstructionDialog from "./UnderConstructionDialog.jsx";

const DESKTOP_ITEMS = [
  { label: "about.txt", app: "about", emoji: "📄" },
  { label: "projects", app: "projects", emoji: "📁" },
  { label: "polaroids", app: "creative", emoji: "🖼️" },
  { label: "contact", app: "contact", emoji: "📧" },
  { label: "coming_soon.txt", app: null, emoji: "🚧" },
];

export default function DesktopIcons() {
  const mgr = useWindowManager();
  const [ucOpen, setUcOpen] = useState(false);

  const handleClick = (item) => {
    if (item.app) {
      openDesktopApp(mgr, item.app);
    } else if (item.label === "coming_soon.txt") {
      setUcOpen(true);
    }
  };

  return (
    <>
      <div className="desktop-icons">
        {DESKTOP_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleClick(item)}
          >
            <span className="desktop-icon-emoji">{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <UnderConstructionDialog open={ucOpen} onClose={() => setUcOpen(false)} />
    </>
  );
}
