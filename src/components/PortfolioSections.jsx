import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications, projects, skillQueries, skills, timeline } from "../data/site.js";
import { GlitchText, ScrollFloat } from "./ui/TextEffects.jsx";

const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PortfolioSections() {
  const projectRailRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".section-band").forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll(".stagger-in"),
          { y: 38, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          },
        );
      });

      if (window.matchMedia("(min-width: 980px)").matches && projectRailRef.current) {
        const rail = projectRailRef.current;
        gsap.to(rail, {
          x: () => Math.min(0, window.innerWidth - rail.scrollWidth - 140),
          ease: "none",
          scrollTrigger: {
            trigger: "#projects",
            start: "top top",
            end: () => `+=${Math.max(500, rail.scrollWidth - window.innerWidth + 300)}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <AboutSection />
      <SkillsSection />
      <ProjectsSection projectRailRef={projectRailRef} />
      <CertificationsSection />
      <TimelineSection />
      <CreativeSection />
      <ContactSection />
    </>
  );
}

function SectionHeader({ eyebrow, title, copy }) {
  return (
    <div className="section-header stagger-in">
      <span>{eyebrow}</span>
      <GlitchText as="h2" text={title} />
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function AboutSection() {
  return (
    <motion.section
      className="section-band about-section"
      id="about"
      data-cursor="terminal"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
    >
      <SectionHeader
        eyebrow="about"
        title="Systems brain, creative eye."
        copy="Puerto Rican IT specialist building the connective tissue between operations, automation, support, documentation, and the weird little details that keep systems human."
      />
      <motion.div className="about-grid stagger-in" variants={itemVariants}>
        <article className="about-manifesto">
          <p>
            I like systems that feel calm from the outside because the inside is handled:
            clean docs, predictable support paths, visible device state, and automation that
            removes the repetitive work without making the business fragile.
          </p>
          <p>
            The personality is still there: homelab experiments, photography, interfaces with
            motion, late-night troubleshooting, and a healthy respect for the fact that production
            work has to be boring in the best way.
          </p>
        </article>
        <div className="signal-stack" aria-label="Operating principles">
          {["Automate repeatable work", "Document the critical path", "Design for support handoff", "Make mobile useful first"].map(
            (item) => (
              <span key={item}>{item}</span>
            ),
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}

function SkillsSection() {
  const [query, setQuery] = useState("proxmox");
  const answer = skillQueries[query.toLowerCase()] ?? "No exact match yet. Try proxmox, python, intune, fortinet, or documentation.";

  const positionedSkills = useMemo(
    () =>
      skills.map((skill, index) => ({
        ...skill,
        x: 12 + ((index * 31) % 74),
        y: 12 + ((index * 47) % 66),
      })),
    [],
  );

  return (
    <section className="section-band skills-section" id="skills" data-cursor="crosshair">
      <SectionHeader
        eyebrow="skills"
        title="Not a tag cloud."
        copy="A small constellation of the tools and habits I keep reaching for."
      />
      <div className="skills-layout">
        <div className="skill-constellation stagger-in" aria-label="Skill constellation">
          <svg viewBox="0 0 100 80" aria-hidden="true">
            <path d="M12 22 41 18 72 31 51 58 18 62 12 22" />
            <path d="M29 44 41 18 51 58 86 66 72 31" />
          </svg>
          {positionedSkills.map((skill) => (
            <ScrollFloat
              key={skill.label}
              className="skill-node"
              style={{ left: `${skill.x}%`, top: `${skill.y}%`, "--weight": skill.weight }}
            >
              {skill.label}
            </ScrollFloat>
          ))}
        </div>
        <div className="skill-query stagger-in">
          <p className="query-label">alex@skills:~$ search --skill</p>
          <div className="query-row">
            <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search skills" />
            <button className="button button-primary" type="button" onClick={() => setQuery(query)}>
              &gt;_ run
            </button>
          </div>
          <output>{answer}</output>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ projectRailRef }) {
  return (
    <section className="section-band projects-section" id="projects" data-cursor="crosshair">
      <SectionHeader
        eyebrow="projects"
        title="Real work, wired weird."
        copy="The projects recruiters need to understand, presented with enough signal that developers keep scrolling."
      />
      <div className="project-rail" ref={projectRailRef}>
        {projects.map((project, index) => (
          <article className="project-card stagger-in card-spotlight" key={project.title}>
            <div className={`project-visual project-visual-${project.visual}`} aria-hidden="true">
              <img src="/assets/generated/operations-atlas.png" alt="" />
              <ProjectGlyph type={project.visual} />
            </div>
            <div className="project-body">
              <span>{project.stack}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <strong>{project.metric}</strong>
              <a href="#contact" className="project-link">
                &gt;_ talk through it
              </a>
            </div>
            <i>{String(index + 1).padStart(2, "0")}</i>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectGlyph({ type }) {
  const paths = {
    procurement: ["M12 44h40l8-25H19z", "M23 58a3 3 0 1 0 0 .1M51 58a3 3 0 1 0 0 .1", "M7 15h9l3 8"],
    noc: ["M8 48c10-22 20-22 30 0s20 22 30 0", "M8 28h60", "M18 18v40M38 18v40M58 18v40"],
    support: ["M12 18h44v34H22L12 62z", "M21 28h26M21 38h19", "M58 26h10v30H36"],
    fleet: ["M12 14h16v38H12z", "M34 10h18v46H34z", "M58 18h16v34H58z", "M18 58h50"],
  };

  return (
    <svg viewBox="0 0 82 72" className="project-glyph">
      {paths[type].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}

function CertificationsSection() {
  return (
    <section className="section-band certs-section" id="certifications" data-cursor="default">
      <SectionHeader
        eyebrow="certifications"
        title="Proof, not decoration."
        copy="Public badge evidence for the Fortinet certifications referenced across the site and resume."
      />
      <div className="cert-grid">
        {certifications.map((cert) => (
          <a className="cert-card stagger-in" href={cert.url} target="_blank" rel="noreferrer" key={cert.title}>
            <img src={cert.image} alt={`${cert.title} badge`} />
            <div>
              <span>{cert.issuer}</span>
              <h3>{cert.title}</h3>
              <p>{cert.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="section-band timeline-section" id="timeline" data-cursor="terminal">
      <SectionHeader
        eyebrow="timeline"
        title="Where the work happened."
        copy="Current role first, because the resume QR path should answer the obvious recruiter question immediately."
      />
      <div className="tracing-beam">
        {timeline.map((item) => (
          <article className="timeline-item stagger-in" key={`${item.company}-${item.period}`}>
            <time>{item.period}</time>
            <div>
              <h3>{item.role}</h3>
              <span>{item.company}</span>
              <p>{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CreativeSection() {
  return (
    <section className="section-band creative-section" id="creative" data-cursor="lens">
      <SectionHeader
        eyebrow="creative"
        title="The camera is part of the stack."
        copy="Photography, graphic cleanup, interface taste, and the visual side of systems thinking."
      />
      <div className="creative-grid stagger-in">
        <div className="lens-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div>
          <p>
            I like technology that works, but I also care how it feels. That is where the
            photography and design side comes in: composition, texture, light, rhythm, and enough
            weirdness to make the work memorable without turning it into noise.
          </p>
          <a className="button button-secondary" href="https://www.instagram.com/AlexGabrielPh" target="_blank" rel="noreferrer">
            &gt;_ @AlexGabrielPh
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section-band contact-section" id="contact" data-cursor="terminal">
      <div className="contact-panel stagger-in">
        <span>contact</span>
        <h2>Need someone who can support the business and still build the automation?</h2>
        <div className="contact-actions">
          <a className="button button-primary" href="mailto:support@alexberrios.com">
            &gt;_ support@alexberrios.com
          </a>
          <a className="button button-secondary" href="/resume/resume.pdf" target="_blank" rel="noreferrer">
            &gt;_ general resume
          </a>
        </div>
      </div>
    </section>
  );
}
