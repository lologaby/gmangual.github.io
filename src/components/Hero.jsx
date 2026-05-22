import { motion } from "framer-motion";
import BackgroundBeams from "./effects/BackgroundBeams.jsx";
import HeroParticleNetwork from "./effects/HeroParticleNetwork.jsx";
import TerminalPanel from "./ui/TerminalPanel.jsx";
import { BlurText, SplitText } from "./ui/TextEffects.jsx";
import { heroCopy } from "../data/site.js";

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section className="hero-section" id="hero" data-cursor="terminal">
      <BackgroundBeams />
      <div className="hero-grid" aria-hidden="true" />
      <HeroParticleNetwork />

      <div className="hero-content">
        <motion.div className="hero-copy" variants={itemVariants}>
          <p className="hero-command">alex@puerto-rico:~$ ./build-reliable-systems</p>
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
        </motion.div>

        <motion.div className="hero-terminal-wrap" variants={itemVariants}>
          <TerminalPanel />
        </motion.div>
      </div>

      <motion.div className="hero-meta" variants={itemVariants}>
        <span>Novus Inc. IT Specialist</span>
        <span>DevOps-minded automation</span>
        <span>Puerto Rico</span>
      </motion.div>
    </section>
  );
}
