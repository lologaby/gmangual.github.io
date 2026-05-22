export const navItems = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "proof", href: "#certifications" },
  { label: "timeline", href: "#timeline" },
  { label: "creative", href: "#creative" },
  { label: "contact", href: "#contact" },
];

export const heroCopy = {
  name: "Alex Berrios Mangual",
  title: "IT Systems Specialist | Commercial Operations & Automation",
  subtitle:
    "I build the boring parts that keep work moving: automation that survives the weekend, support paths that do not require a Slack hunt, device fleets that stay enrolled, and documentation people can actually use.",
  email: "support@alexberrios.com",
};

export const timeline = [
  {
    period: "Aug 2025 - Present",
    role: "IT Specialist",
    company: "Novus Inc.",
    detail:
      "Commercial operations and systems support across procurement, inventory, and logistics workflows. Built Python automation for SAP PO tracking and vendor reconciliation. Manage Intune + Android Enterprise fleet of 80+ Zebra devices across warehouse and retail floors. Maintain internal documentation in BookStack, support tickets through osTicket, and homelab mirrors of production tools for safe testing.",
  },
  {
    period: "Sep 2021 - Aug 2025",
    role: "NOC Tier 1 / Operations Support",
    company: "WorldNet Telecommunications",
    detail:
      "Monitored carrier-grade MPLS and fiber infrastructure across Puerto Rico and USVI. Responded to SLA-bound outages, performed circuit diagnostics, coordinated field dispatches, and maintained customer communication during events. Built a Tkinter-based shift reporting tool with Firebase backend to replace scattered spreadsheets. Learned Zabbix, MikroTik, and FortiGate fundamentals hands-on in a 24/7 production environment.",
  },
  {
    period: "2017 - 2022",
    role: "BS Network Technology & Applications Development",
    company: "NUC University, Bayamon, PR",
    detail:
      "Studied network infrastructure, systems administration, and application development. Coursework covered Cisco routing/switching, Windows Server administration, SQL databases, and software engineering. Capstone involved designing a campus network with VLAN segmentation, DHCP failover, and monitoring. Graduated with practical skills that transferred directly into NOC and systems roles.",
  },
];

export const skills = [
  { label: "Python", group: "automation", weight: 1 },
  { label: "PostgreSQL", group: "data", weight: 0.9 },
  { label: "SAP workflows", group: "operations", weight: 0.95 },
  { label: "Proxmox", group: "homelab", weight: 1 },
  { label: "Docker", group: "homelab", weight: 0.88 },
  { label: "Linux", group: "homelab", weight: 0.92 },
  { label: "Bash", group: "automation", weight: 0.85 },
  { label: "BookStack", group: "documentation", weight: 0.8 },
  { label: "osTicket", group: "support", weight: 0.85 },
  { label: "Intune", group: "endpoint", weight: 0.95 },
  { label: "Android Enterprise", group: "endpoint", weight: 0.9 },
  { label: "Fortinet", group: "network", weight: 0.9 },
  { label: "MikroTik", group: "network", weight: 0.82 },
  { label: "Zabbix", group: "monitoring", weight: 0.85 },
  { label: "VMware", group: "virtualization", weight: 0.78 },
  { label: "Windows Server", group: "infrastructure", weight: 0.88 },
  { label: "Home Assistant", group: "homelab", weight: 0.8 },
  { label: "Tkinter", group: "tools", weight: 0.7 },
  { label: "Firebase", group: "data", weight: 0.75 },
];

export const skillQueries = {
  proxmox:
    "Proxmox VE cluster with 3 nodes, Ceph storage, automated backups to TrueNAS, LXC containers for services, and VM templates for fast provisioning. Homelab-tested, production-minded.",
  python:
    "Automation scripts for SAP data extraction, PO reconciliation reports, CSV transformers, Zabbix API integrations, and a Tkinter shift handoff tool that writes to Firebase Realtime DB. Not a developer. A builder.",
  intune:
    "Android Enterprise device owner enrollment for Zebra TC-series scanners, app configuration policies, compliance rules, device wipe procedures, and inventory sync. 80+ devices under management.",
  fortinet:
    "FortiGate 40F/60F operations: firewall policies, SSL-VPN, SD-WAN basics, traffic shaping, and threat logging. Certified Associate + Fundamentals. Learned in production at WorldNet.",
  documentation:
    "BookStack knowledge base with 40+ articles: SOPs, troubleshooting runbooks, onboarding guides, and vendor contact matrices. Integrated with osTicket so tickets reference living docs, not dead PDFs.",
  docker:
    "Compose stacks for homelab services: BookStack, osTicket, Zabbix, Nextcloud, Home Assistant. Image builds with healthchecks, volume backups, and network isolation. No Kubernetes yet.",
  linux:
    "Daily driver on laptops and servers. Debian/Ubuntu administration, systemd services, cron jobs, log rotation, ufw, nginx reverse proxy, and bash scripting for maintenance tasks.",
  zabbix:
    "Template customization, trigger tuning, LLD discovery for network interfaces, and API-based reporting. Migrated from manual ping lists to automated host discovery in the NOC.",
};

export const projects = [
  {
    title: "SAP Procurement Automation",
    stack: "Python / PostgreSQL / SAP GUI Scripting",
    metric: "Reduced manual entry by ~70%",
    summary:
      " Procurement team was copy-pasting vendor data between SAP and email threads, creating duplicate POs and reconciliation nightmares every month-end. Built a Python layer that extracts open PO data via SAP GUI scripting, validates against vendor master records in PostgreSQL, flags discrepancies before they reach AP, and generates a clean reconciliation report. Cut the monthly close cycle from 3 days of hunting to a 20-minute run.",
    visual: "procurement",
    imagePosition: "0% 0%",
  },
  {
    title: "NOC Shift Reporting Tool",
    stack: "Python / Tkinter / Firebase Realtime DB",
    metric: "Shift handoff time: 45 min → 8 min",
    summary:
      "NOC shift handoffs were happening in scattered WhatsApp messages and half-filled spreadsheets. Built a desktop Tkinter app that lives on the monitoring station: technicians log events, tag severity, attach circuit IDs, and add resolution notes. All data syncs to Firebase in real time, so the next shift sees a clean timeline instead of archaeology. Includes export to PDF for management review.",
    visual: "noc",
    imagePosition: "100% 0%",
  },
  {
    title: "BookStack + osTicket Knowledge Platform",
    stack: "Documentation / Support Ops / Docker",
    metric: "Repeat ticket rate dropped ~40%",
    summary:
      "Support team was solving the same problems weekly because fixes lived in individual Slack DMs and buried email threads. Deployed BookStack as the living knowledge base and osTicket for intake. Wrote 40+ articles: common Zebra scanner resets, SAP error codes, Intune enrollment failures, vendor escalation paths. Linked tickets to articles so technicians self-serve before opening new requests.",
    visual: "support",
    imagePosition: "0% 100%",
  },
  {
    title: "Zebra Device Fleet Management",
    stack: "88 devices / Intune / Android Enterprise",
    metric: "Enrollment success: 62% → 94%",
    summary:
      "Warehouse and retail floors depend on Zebra TC-series scanners. Enrollment was inconsistent, apps were missing, and devices were drifting out of compliance. Rebuilt the Intune profile structure: device owner enrollment, staged rollout rings, app configuration policies for the WMS client, and compliance rules that flag offline devices. Added QR-code provisioning so new devices are production-ready in under 10 minutes.",
    visual: "fleet",
    imagePosition: "100% 100%",
  },
];

export const certifications = [
  {
    title: "Fortinet Certified Associate Cybersecurity",
    issuer: "Fortinet",
    image: "/assets/certs/fortinet-associate-cybersecurity.png",
    url: "https://www.credly.com/badges/ca81d713-0fa7-4109-96ce-a8c189ac0037",
    description:
      "Hands-on FortiGate operations: policy configuration, SSL inspection, VPN tunnels, and threat management. Earned while supporting production firewall infrastructure at WorldNet.",
  },
  {
    title: "Fortinet Certified Fundamentals Cybersecurity",
    issuer: "Fortinet",
    image: "/assets/certs/fortinet-fundamentals-cybersecurity.png",
    url: "https://www.credly.com/badges/b139c1b3-29bb-4e49-a0ef-aee14d7d8507",
    description:
      "Core cybersecurity concepts: threat landscape, network security fundamentals, and SOC operations. Foundation for the associate-level work that followed.",
  },
];

export const terminalCommands = {
  help: [
    "available commands:",
    "  whoami          — who is this person",
    "  search --skill  — deep dive on a skill",
    "  cat mindset.txt — operating principles",
    "  cat archivo.txt — notes from the archive",
    "  photo --where   — creative signal",
    "  play signal     — late night broadcast",
    "  sudo hire alex  — initiate contact",
    "",
    "try: search --skill python",
  ],
  whoami: [
    "Alex Berrios Mangual",
    "IT Systems Specialist based in Puerto Rico",
    "",
    "Current: Novus Inc. — automation, endpoint management, documentation",
    "Past: WorldNet — NOC operations, 24/7 infrastructure monitoring",
    "Education: NUC University — Network Technology & Applications Development",
    "",
    "Not a software engineer. A systems person who writes code when it",
    "solves a real operations problem. Prefers boring infrastructure that",
    "works over exciting infrastructure that breaks.",
  ],
  "search --skill proxmox": [
    "match: Proxmox VE, LXC, QEMU, Ceph, TrueNAS backups",
    "depth: homelab-tested, production-minded",
    "",
    "  • 3-node cluster with Ceph shared storage",
    "  • Automated daily backups to TrueNAS Scale via PBS",
    "  • LXC containers: BookStack, osTicket, Zabbix, Home Assistant",
    "  • VM templates for rapid Windows/Linux provisioning",
    "  • VLAN-segregated networking with MikroTik upstream",
  ],
  "search --skill python": [
    "match: Python 3, pandas, psycopg2, pyautogui, tkinter",
    "depth: automation-first, not application-first",
    "",
    "  • SAP GUI scripting for PO extraction and reconciliation",
    "  • CSV/Excel transformers for vendor data normalization",
    "  • Zabbix API scripts for host discovery and trigger reporting",
    "  • Tkinter desktop app for NOC shift handoff logging",
    "  • Firebase Realtime DB integration for cloud-backed local tools",
  ],
  "search --skill intune": [
    "match: Microsoft Intune, Android Enterprise, Zebra OEMConfig",
    "depth: 80+ devices under active management",
    "",
    "  • Device Owner enrollment via QR code provisioning",
    "  • App configuration policies for WMS and scanner clients",
    "  • Compliance rules: encryption, OS version, offline timeout",
    "  • Staged rollout rings for policy updates",
    "  • Remote wipe and device retirement procedures",
  ],
  "search --skill fortinet": [
    "match: FortiGate 40F/60F, FortiOS, SSL-VPN, SD-WAN",
    "depth: certified associate + fundamentals",
    "",
    "  • Firewall policy design and traffic logging",
    "  • SSL-VPN configuration for remote NOC access",
    "  • SD-WAN overlay for redundant ISP paths",
    "  • Threat detection tuning and FortiGuard integration",
    "  • Certificate management and SSL inspection policies",
  ],
  "search --skill documentation": [
    "match: BookStack, SOPs, runbooks, knowledge architecture",
    "depth: 40+ articles, integrated with osTicket",
    "",
    "  • BookStack knowledge base with shelf/chapter structure",
    "  • SOPs: Zebra scanner resets, SAP error resolution, vendor escalation",
    "  • Onboarding guides for new technicians",
    "  • osTicket integration: tickets auto-suggest relevant articles",
    "  • Monthly doc audits to keep information current",
  ],
  "cat mindset.txt": [
    "--- operating principles ---",
    "",
    "1. Automate the repeatable.",
    "   If you do it twice, write it down. If you do it three times,",
    "   script it. If you do it five times, automate it properly.",
    "",
    "2. Document the critical path.",
    "   Not everything needs a wiki. But the 5 AM outage fixes do.",
    "",
    "3. Design for support handoff.",
    "   Build systems that the next person can run without calling you.",
    "",
    "4. Make mobile useful first.",
    "   The warehouse floor does not have a desktop. Design for that.",
    "",
    "5. Keep production boring.",
    "   Excitement belongs in the homelab. Production should be predictable.",
  ],
  "cat archivo.txt": [
    "C:\\ALEX_ARCHIVE\\notes",
    "",
    "> last deployment: friday 11pm",
    "> next coffee: imminent",
    "> homelab uptime: proud of it",
    "> san juan signal: strong",
    "",
    "professional enough for uptime.",
    "weird enough to remember.",
  ],
  "photo --where": [
    "creative signal: @AlexGabrielPh",
    "platform: Instagram",
    "status: chasing light after deployments",
    "",
    "Subjects: San Juan street scenes, coastline textures,",
    "         automotive details, late-night urban geometry.",
    "",
    "The camera is part of the stack.",
  ],
  "play signal": [
    "╔══════════════════════════════════════╗",
    "║   LATE NIGHT SIGNAL — channel 0217   ║",
    "╠══════════════════════════════════════╣",
    "║  02:17 AM                            ║",
    "║  low volume. high texture.           ║",
    "║  ship the fix. sleep later.          ║",
    "╚══════════════════════════════════════╝",
  ],
  "sudo hire alex": [
    "[sudo] password for recruiter: ********",
    "",
    "Permission granted.",
    "",
    "Email: support@alexberrios.com",
    "Location: Puerto Rico (open to remote / hybrid)",
    "Resume: /resume/resume.pdf",
    "",
    "Available for:",
    "  • IT Systems & Operations roles",
    "  • Automation & scripting work",
    "  • Endpoint management & fleet ops",
    "  • NOC / infrastructure support",
    "",
    "Response time: usually within 24 hours.",
    "Unless it is Friday at 11pm. Then Monday.",
  ],
  sudo: ["usage: sudo hire alex"],
};
