import WindowFrame from "../ui/WindowFrame.jsx";
import {
  AboutSection,
  SkillsSection,
  ProjectsSection,
  CertificationsSection,
  TimelineSection,
  CreativeSection,
  ContactSection,
} from "../PortfolioSections.jsx";

const APP_CONFIG = {
  about: {
    id: "app-about",
    title: "about.txt",
    defaultX: 160,
    defaultY: 80,
    defaultWidth: 620,
    defaultHeight: 480,
    Component: AboutSection,
  },
  skills: {
    id: "app-skills",
    title: "skills.exe",
    defaultX: 200,
    defaultY: 110,
    defaultWidth: 720,
    defaultHeight: 520,
    Component: SkillsSection,
  },
  projects: {
    id: "app-projects",
    title: "projects.exe",
    defaultX: 120,
    defaultY: 60,
    defaultWidth: 860,
    defaultHeight: 600,
    Component: ProjectsSection,
  },
  certifications: {
    id: "app-proof",
    title: "proof.exe",
    defaultX: 240,
    defaultY: 130,
    defaultWidth: 580,
    defaultHeight: 420,
    Component: CertificationsSection,
  },
  timeline: {
    id: "app-timeline",
    title: "timeline.txt",
    defaultX: 180,
    defaultY: 90,
    defaultWidth: 660,
    defaultHeight: 480,
    Component: TimelineSection,
  },
  creative: {
    id: "app-creative",
    title: "polaroids.exe",
    defaultX: 140,
    defaultY: 70,
    defaultWidth: 740,
    defaultHeight: 540,
    Component: CreativeSection,
  },
  contact: {
    id: "app-contact",
    title: "contact.txt",
    defaultX: 260,
    defaultY: 140,
    defaultWidth: 540,
    defaultHeight: 380,
    Component: ContactSection,
  },
};

export function openDesktopApp(mgr, appKey) {
  const config = APP_CONFIG[appKey];
  if (!config) return;
  // Minimize hero windows to make room for the app
  mgr.toggleMinimize("hero-main");
  mgr.toggleMinimize("hero-terminal");
  mgr.toggleMinimize("hero-broadcast");
  mgr.openWindow(config.id);
}

export function DesktopAppWindows() {
  return (
    <>
      {Object.values(APP_CONFIG).map(({ id, title, defaultX, defaultY, defaultWidth, defaultHeight, Component }) => (
        <WindowFrame
          key={id}
          id={id}
          title={title}
          defaultX={defaultX}
          defaultY={defaultY}
          defaultWidth={defaultWidth}
          defaultHeight={defaultHeight}
          style={{ maxWidth: "95vw", maxHeight: "calc(100vh - 40px)" }}
          options={{ closed: true }}
        >
          <div className="window-scroll-body">
            <Component inWindow />
          </div>
        </WindowFrame>
      ))}
    </>
  );
}
