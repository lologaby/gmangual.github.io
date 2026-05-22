export const navItems = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "certs", href: "#certifications" },
  { label: "timeline", href: "#timeline" },
  { label: "creative", href: "#creative" },
  { label: "contact", href: "#contact" },
];

export const heroCopy = {
  name: "Alex Berrios Mangual",
  title: "IT Systems Specialist | Commercial Operations & Automation",
  subtitle:
    "I build systems that don't break, automate what shouldn't be manual, and document everything in between.",
  email: "support@alexberrios.com",
};

export const timeline = [
  {
    period: "Aug 2025 - Present",
    role: "IT Specialist",
    company: "Novus Inc.",
    detail:
      "Commercial operations support, automation, endpoint/device management, documentation, and systems work across business-critical workflows.",
  },
  {
    period: "Sep 2021 - Aug 2025",
    role: "NOC Tier 1",
    company: "WorldNet",
    detail:
      "Network monitoring, SLA response, outage communication, customer support, and troubleshooting across production telecom environments.",
  },
  {
    period: "2017 - 2022",
    role: "Network Technology & Applications Development",
    company: "NUC University, Bayamon, PR",
    detail:
      "Technical foundation across networking, software support, infrastructure, and application operations.",
  },
];

export const skills = [
  { label: "Python", group: "automation", weight: 1 },
  { label: "PostgreSQL", group: "data", weight: 0.9 },
  { label: "SAP workflows", group: "operations", weight: 0.95 },
  { label: "Proxmox", group: "homelab", weight: 1 },
  { label: "BookStack", group: "documentation", weight: 0.8 },
  { label: "osTicket", group: "support", weight: 0.85 },
  { label: "Intune", group: "endpoint", weight: 0.95 },
  { label: "Android Enterprise", group: "endpoint", weight: 0.9 },
  { label: "Fortinet", group: "network", weight: 0.9 },
  { label: "Zabbix", group: "monitoring", weight: 0.85 },
  { label: "Tkinter", group: "tools", weight: 0.7 },
  { label: "Firebase", group: "data", weight: 0.75 },
];

export const skillQueries = {
  proxmox: "Virtualization, Linux services, backups, monitoring, and self-hosted systems.",
  python: "Automation scripts, reporting tools, SAP workflow helpers, and Tkinter interfaces.",
  intune: "Android Enterprise enrollment, fleet controls, app policy, and device lifecycle tracking.",
  fortinet: "Certified fundamentals and associate cybersecurity knowledge with FortiGate operations.",
  documentation: "BookStack knowledge base design, SOP structure, and support handoff workflows.",
};

export const projects = [
  {
    title: "SAP Procurement Automation",
    stack: "Python / PostgreSQL",
    metric: "Manual steps reduced",
    summary:
      "Automation layer for procurement workflows: structured records, repeatable checks, and cleaner operational visibility.",
    visual: "procurement",
  },
  {
    title: "NOC Reporting Tool",
    stack: "Python / Tkinter / Firebase",
    metric: "Faster shift reporting",
    summary:
      "Desktop reporting tool for NOC workflows, built around quick entry, consistent output, and cloud-backed records.",
    visual: "noc",
  },
  {
    title: "BookStack + osTicket Platform",
    stack: "Documentation / Support Ops",
    metric: "Knowledge loop closed",
    summary:
      "Support platform combining ticket intake with searchable documentation so fixes become reusable knowledge.",
    visual: "support",
  },
  {
    title: "Zebra Device Fleet",
    stack: "88 devices / Intune / Android Enterprise",
    metric: "Fleet under control",
    summary:
      "Managed Zebra endpoint fleet with enrollment structure, policy consistency, inventory visibility, and mobile-first support.",
    visual: "fleet",
  },
];

export const certifications = [
  {
    title: "Fortinet Certified Associate Cybersecurity",
    issuer: "Fortinet",
    image: "/assets/certs/fortinet-associate-cybersecurity.png",
    url: "https://www.credly.com/badges/ca81d713-0fa7-4109-96ce-a8c189ac0037",
    description:
      "Validates high-level operations on FortiGate devices and common FortiGate features.",
  },
  {
    title: "Fortinet Certified Fundamentals Cybersecurity",
    issuer: "Fortinet",
    image: "/assets/certs/fortinet-fundamentals-cybersecurity.png",
    url: "https://www.credly.com/badges/b139c1b3-29bb-4e49-a0ef-aee14d7d8507",
    description:
      "Validates foundational cybersecurity knowledge and today's threat landscape.",
  },
];

export const terminalCommands = {
  help: [
    "commands:",
    "whoami",
    "search --skill proxmox",
    "cat mindset.txt",
    "photo --where",
    "sudo hire alex",
  ],
  whoami: [
    "Alex Berrios Mangual",
    "IT Systems Specialist. DevOps-minded automation builder. Puerto Rico.",
  ],
  "search --skill proxmox": [
    "match: Proxmox VE, Linux guests, backup routines, monitoring, service maps",
    "depth: homelab tested, production-minded",
  ],
  "cat mindset.txt": [
    "Automate the repeatable.",
    "Document the critical.",
    "Keep the system boring so the work can get interesting.",
  ],
  "photo --where": ["creative signal: @AlexGabrielPh", "status: chasing light after deployments"],
  "sudo hire alex": ["permission granted", "email: support@alexberrios.com"],
  sudo: ["usage: sudo hire alex"],
};
