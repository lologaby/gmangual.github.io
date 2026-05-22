import { useEffect, useState } from "react";
import { navItems } from "../data/site.js";

function BrandGlyph() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <rect width="38" height="38" fill="#071313" />
      {/* Monitor frame */}
      <rect x="5" y="6" width="28" height="20" rx="1" fill="none" stroke="#00e5cc" strokeWidth="1.5" />
      <rect x="7" y="8" width="24" height="16" fill="#0a1a1a" />
      {/* Prompt cursor */}
      <path d="M10 14L14 16L10 18V14Z" fill="#39ff14" />
      <rect x="15" y="15" width="10" height="2" fill="#00e5cc" opacity="0.6" />
      {/* Signal wave */}
      <path d="M22 22C24 18 26 18 28 22" stroke="#ff2a6d" strokeWidth="1.2" fill="none" />
      <path d="M25 22C27 19 29 19 31 22" stroke="#f7f709" strokeWidth="1" fill="none" />
      {/* Stand */}
      <rect x="16" y="26" width="6" height="3" fill="#1a3a3a" />
      <rect x="12" y="29" width="14" height="2" rx="1" fill="#1a3a3a" />
    </svg>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="nav-shell"
      data-scrolled={scrolled}
    >
      <a className="brand-lockup" href="/" aria-label="Alex Berrios Mangual home">
        <span className="brand-glyph">
          <BrandGlyph />
        </span>
        <span>
          <strong>AGBM</strong>
          <small>ops / automation / creative</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <a className="button button-secondary" href="/resume/resume.pdf" target="_blank" rel="noreferrer">
          &gt;_ resume
        </a>
        <a className="button button-primary" href="mailto:support@alexberrios.com">
          &gt;_ contact
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav className="mobile-nav" data-open={isOpen} aria-label="Mobile navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href="/resume/resume.pdf" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>
          resume
        </a>
        <a href="mailto:support@alexberrios.com" onClick={() => setIsOpen(false)}>
          contact
        </a>
      </nav>
    </header>
  );
}
