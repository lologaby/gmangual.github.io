import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  { text: "AGBM_ARCHIVE_OS v2.0.17 [RELEASE]", delay: 100 },
  { text: "Copyright (c) 1998-2026 Alex Berrios Mangual", delay: 180 },
  { text: "", delay: 60 },
  { text: "BIOS DATE 05/22/26 02:17:00", delay: 120 },
  { text: "CPU: OPS_BRAIN x64 @ 3.40GHz", delay: 140 },
  { text: "640K RAM... OK", delay: 200 },
  { text: "Extended Memory: 16,384K... OK", delay: 160 },
  { text: "Video Adapter: CRT_VOID_98... OK", delay: 180 },
  { text: "", delay: 80 },
  { text: "Loading kernel...", delay: 300 },
  { text: "mount -t ops /dev/sda1 /sys/automation", delay: 220 },
  { text: "mount -t creative /dev/sda2 /sys/archive", delay: 200 },
  { text: "", delay: 100 },
  { text: "Starting services:", delay: 120 },
  { text: "  [ OK ]  proxmox-homelab-daemon", delay: 180 },
  { text: "  [ OK ]  python-automation-engine", delay: 160 },
  { text: "  [ OK ]  documentation-bus", delay: 140 },
  { text: "  [ OK ]  support-ticket-pipeline", delay: 150 },
  { text: "  [ OK ]  polaroid-archive-sync", delay: 170 },
  { text: "", delay: 120 },
  { text: "san juan signal: STRONG", delay: 250 },
  { text: "", delay: 100 },
  { text: "INIT COMPLETE.", delay: 400 },
  { text: "Booting GUI...", delay: 600 },
];

export default function BootSequence({ onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let current = 0;
    let timeouts = [];

    const scheduleNext = () => {
      if (current >= BOOT_LINES.length) {
        const t = setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 800);
        }, 600);
        timeouts.push(t);
        return;
      }

      const t = setTimeout(() => {
        setVisibleCount((c) => c + 1);
        current++;
        scheduleNext();
      }, BOOT_LINES[current].delay);
      timeouts.push(t);
    };

    scheduleNext();

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "grid",
        placeItems: "center",
        background: "#020202",
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: "clamp(0.72rem, 1.4vw, 0.9rem)",
        lineHeight: 1.7,
        color: "#39ff14",
        opacity: done ? 0 : 1,
        transition: "opacity 600ms ease",
        pointerEvents: done ? "none" : "all",
      }}
    >
      <div
        style={{
          width: "min(720px, 90vw)",
          maxHeight: "80vh",
          overflow: "hidden",
          padding: "24px",
          border: "1px solid #1a3a1a",
          background: "rgba(2, 8, 2, 0.96)",
          boxShadow: "inset 0 0 40px rgba(57, 255, 20, 0.04)",
        }}
      >
        {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
          <div key={i} style={{ whiteSpace: "pre-wrap" }}>
            {line.text}
            {i === visibleCount - 1 && !done && (
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "1.1em",
                  background: "#39ff14",
                  marginLeft: "4px",
                  verticalAlign: "text-bottom",
                  animation: "caretBlink 1s steps(2) infinite",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
