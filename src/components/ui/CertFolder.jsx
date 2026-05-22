import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
 * Win98-style folder that opens to reveal certification badges.
 * Each folder is a closed filing cabinet that opens on click.
 */

export default function CertFolder({ cert }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`cert-folder ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="cert-folder-tab"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <svg viewBox="0 0 48 40" className="cert-folder-icon" aria-hidden="true">
          {/* Closed folder back */}
          <rect x="2" y="10" width="44" height="28" rx="2" fill="#b8b8a0" stroke="#4a4a3a" strokeWidth="1" />
          {/* Folder tab */}
          <path d="M2 14 L2 10 Q2 6, 6 6 L18 6 L22 10 L46 10 Q46 6, 42 6 L30 6 L26 2 L10 2 Q2 2, 2 10 Z" fill="#c8c8a8" stroke="#4a4a3a" strokeWidth="1" />
          {/* Folder front (only visible when closed) */}
          {!open && (
            <>
              <rect x="2" y="14" width="44" height="24" rx="1" fill="#d8d8b8" stroke="#4a4a3a" strokeWidth="1" />
              <text x="24" y="28" fill="#3a3a2a" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                {cert.issuer}
              </text>
            </>
          )}
        </svg>
        <span className="cert-folder-label">{cert.title}</span>
        <span className="cert-folder-hint">{open ? "[close]" : "[open]"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="cert-folder-contents"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="cert-folder-inner">
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="cert-badge-link"
              >
                <img src={cert.image} alt={`${cert.title} badge`} />
              </a>
              <div className="cert-folder-meta">
                <span>{cert.issuer}</span>
                <h4>{cert.title}</h4>
                <p>{cert.description}</p>
                <a href={cert.url} target="_blank" rel="noreferrer" className="cert-verify-link">
                  &gt;_ verify on Credly
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
