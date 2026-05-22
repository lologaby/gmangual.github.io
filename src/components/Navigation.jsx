import { useEffect, useState } from "react";
import { navItems } from "../data/site.js";

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
        <span className="brand-glyph">A</span>
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
        <a className="button button-secondary" href="resume/resume.pdf" target="_blank" rel="noreferrer">
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
      </nav>
    </header>
  );
}
