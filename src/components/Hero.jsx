import { useEffect } from "react";
import BackgroundBeams from "./effects/BackgroundBeams.jsx";
import HeroParticleNetwork from "./effects/HeroParticleNetwork.jsx";
import TerminalPanel from "./ui/TerminalPanel.jsx";
import WindowFrame from "./ui/WindowFrame.jsx";
import DesktopIcons from "./desktop/DesktopIcons.jsx";
import { BlurText, SplitText } from "./ui/TextEffects.jsx";
import { heroCopy } from "../data/site.js";
import { useWindowManager } from "../hooks/useWindowManager.jsx";

export default function Hero() {
  const mgr = useWindowManager();

  useEffect(() => {
    mgr.registerWindow("hero-main", "ALEX_ARCHIVE.EXE", { showInTaskbar: true });
    mgr.registerWindow("hero-terminal", "mindset.txt", { showInTaskbar: true });
    mgr.registerWindow("hero-broadcast", "late_night_signal.txt", { showInTaskbar: true });
    return () => {
      mgr.unregisterWindow("hero-main");
      mgr.unregisterWindow("hero-terminal");
      mgr.unregisterWindow("hero-broadcast");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="hero-section" id="hero" data-cursor="terminal">
      <BackgroundBeams />
      <div className="hero-grid" aria-hidden="true" />
      <HeroParticleNetwork />

      <DesktopIcons />

      <WindowFrame
        id="hero-main"
        title="ALEX_ARCHIVE.EXE"
        defaultX={240}
        defaultY={46}
        defaultWidth={680}
        style={{ maxWidth: "min(720px, 90vw)" }}
      >
        <div className="hero-window-body">
          <p className="hero-command">C:\ALEX_ARCHIVE&gt; run reliable-systems.bat</p>
          <h1 aria-label={heroCopy.name}>
            <SplitText text={heroCopy.name} />
          </h1>
          <p className="hero-title">{heroCopy.title}</p>
          <BlurText className="hero-subtitle" text={heroCopy.subtitle} />
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              &gt;_ inspect work
            </a>
            <a className="button button-secondary" href="#contact">
              &gt;_ open channel
            </a>
          </div>
        </div>
      </WindowFrame>

      <WindowFrame
        id="hero-terminal"
        title="mindset.txt"
        defaultX={940}
        defaultY={46}
        defaultWidth={380}
        style={{ maxWidth: "min(400px, 90vw)" }}
      >
        <TerminalPanel />
      </WindowFrame>

      <WindowFrame
        id="hero-broadcast"
        title="late_night_signal.txt"
        defaultX={940}
        defaultY={396}
        defaultWidth={340}
        style={{ maxWidth: "min(360px, 90vw)" }}
      >
        <div
          style={{
            margin: 0,
            padding: "14px 16px",
            background: "#030303",
            color: "#d4c8d8",
            fontFamily: '"Space Mono", monospace',
            fontSize: "0.9rem",
            lineHeight: 1.55,
          }}
        >
          systems should be boring. the website does not have to be.
        </div>
      </WindowFrame>
    </section>
  );
}
