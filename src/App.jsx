import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero.jsx";
import Navigation from "./components/Navigation.jsx";
import PortfolioSections from "./components/PortfolioSections.jsx";
import CustomCursor from "./components/effects/CustomCursor.jsx";
import VoidBackground from "./components/effects/VoidBackground.jsx";
import BootSequence from "./components/effects/BootSequence.jsx";
import UnderConstructionDialog from "./components/effects/UnderConstructionDialog.jsx";
import SudoRoute from "./routes/SudoRoute.jsx";
import { DesktopAppWindows } from "./components/desktop/DesktopApps.jsx";
import { openDesktopApp } from "./components/desktop/DesktopApps.jsx";
import { useKonamiCode } from "./hooks/useKonamiCode.js";
import { WindowManagerProvider, useWindowManager } from "./hooks/useWindowManager.jsx";

const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

function AppContent() {
  const [isKonamiActive, setIsKonamiActive] = useState(false);
  const [booted, setBooted] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const mgr = useWindowManager();

  const isSudoRoute = window.location.pathname.replace(/\/\$/, "") === "/sudo";

  useKonamiCode(() => {
    setIsKonamiActive(true);
    window.setTimeout(() => setIsKonamiActive(false), 4200);
  });

  useEffect(() => {
    console.log(
      "%cnice, you found this. hire me.",
      "color:#00e5cc;background:#050f0f;font:700 16px JetBrains Mono, monospace;padding:8px 10px;border:1px solid #1a4a4a;",
    );
    console.log("Try the Konami code, or visit /sudo.");
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (!e.target.closest(".start-menu") && !e.target.closest(".taskbar-start")) {
        setShowStartMenu(false);
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const openApp = (appKey) => {
    setShowStartMenu(false);
    openDesktopApp(mgr, appKey);
  };

  const openWindows = Object.entries(mgr.windows).filter(
    ([, w]) => !w.closed && w.showInTaskbar
  );

  if (isSudoRoute) {
    return <SudoRoute />;
  }

  return (
    <div className="site-shell">
      <AnimatePresence>
        {!booted && <BootSequence key="boot" onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      <CustomCursor />
      <VoidBackground />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="konami-layer" data-active={isKonamiActive} aria-hidden="true">
        <span>Boricua ops mode unlocked</span>
      </div>

      <Navigation />

      <motion.main
        variants={sectionVariants}
        initial="hidden"
        animate={booted ? "show" : "hidden"}
      >
        <Hero />
        <div className="portfolio-scroll-sections">
          <PortfolioSections />
        </div>
      </motion.main>

      <DesktopAppWindows />

      <footer className="taskbar" aria-label="Archive OS taskbar">
        <button
          className="taskbar-start"
          type="button"
          onClick={() => setShowStartMenu((s) => !s)}
        >
          Alex Archive OS
        </button>

        {showStartMenu && (
          <div className="start-menu">
            <div className="start-menu-header">
              <span className="start-menu-glyph">A</span>
              <span>Alex Berrios Mangual</span>
            </div>
            <div className="start-menu-divider" />
            <nav className="start-menu-nav">
              <button type="button" onClick={() => openApp("about")}>about</button>
              <button type="button" onClick={() => openApp("skills")}>skills</button>
              <button type="button" onClick={() => openApp("projects")}>projects</button>
              <button type="button" onClick={() => openApp("certifications")}>proof</button>
              <button type="button" onClick={() => openApp("timeline")}>timeline</button>
              <button type="button" onClick={() => openApp("creative")}>creative</button>
              <button type="button" onClick={() => openApp("homelab")}>homelab</button>
              <button type="button" onClick={() => openApp("contact")}>contact</button>
            </nav>
            <div className="start-menu-divider" />
            <div className="start-menu-footer">
              <span>AGBM_ARCHIVE_OS v2.0</span>
            </div>
          </div>
        )}

        <div className="taskbar-programs" aria-hidden="true">
          {openWindows.map(([wid, w]) => (
            <button
              key={wid}
              type="button"
              className={mgr.activeId === wid ? "active" : ""}
              onClick={() => {
                if (mgr.activeId === wid && !w.minimized) {
                  mgr.toggleMinimize(wid);
                } else {
                  mgr.openWindow(wid);
                }
              }}
            >
              {w.title}
            </button>
          ))}
        </div>

        <TaskbarClock />
      </footer>

      <UnderConstructionDialog />
    </div>
  );
}

function TaskbarClock() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <time>{time}</time>;
}

export default function App() {
  return (
    <WindowManagerProvider>
      <AppContent />
    </WindowManagerProvider>
  );
}
