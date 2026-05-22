import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "./components/Hero.jsx";
import Navigation from "./components/Navigation.jsx";
import CustomCursor from "./components/effects/CustomCursor.jsx";
import SudoRoute from "./routes/SudoRoute.jsx";
import { useKonamiCode } from "./hooks/useKonamiCode.js";

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

export default function App() {
  const [isKonamiActive, setIsKonamiActive] = useState(false);
  const isSudoRoute = window.location.pathname.replace(/\/$/, "") === "/sudo";

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

  if (isSudoRoute) {
    return <SudoRoute />;
  }

  return (
    <div className="site-shell">
      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="konami-layer" data-active={isKonamiActive} aria-hidden="true">
        <span>Boricua ops mode unlocked</span>
      </div>
      <Navigation />
      <motion.main variants={sectionVariants} initial="hidden" animate="show">
        <Hero />
      </motion.main>
    </div>
  );
}
