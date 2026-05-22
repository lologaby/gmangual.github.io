import { useState } from "react";

/*
 * Original hand-coded polaroid gallery.
 * No stock images, no AI-generated art.
 * Every "photo" is procedural SVG representing the user's actual interests.
 */

const PHOTOS = [
  {
    id: "nights",
    caption: "sanjuan_night_01",
    rotation: -6,
    left: "6%",
    top: "8%",
    color: "#0d1a2d",
    render: () => (
      <>
        {/* Night sky gradient */}
        <rect width="100%" height="100%" fill="#0a0828" />
        <circle cx="75%" cy="25%" r="18" fill="#ffcc00" opacity="0.15" />
        <circle cx="75%" cy="25%" r="8" fill="#ffcc00" opacity="0.7" />
        {/* Stars */}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle
            key={i}
            cx={`${12 + (i * 37) % 86}%`}
            cy={`${8 + (i * 23) % 62}%`}
            r={0.6 + (i % 3) * 0.4}
            fill="#e8f5f5"
            opacity={0.3 + (i % 4) * 0.15}
          />
        ))}
        {/* Building silhouettes */}
        <path d="M0 100 L0 62 L14 62 L14 48 L28 48 L28 68 L42 68 L42 38 L56 38 L56 72 L70 72 L70 52 L84 52 L84 100 Z" fill="#0f050f" opacity="0.9" />
        <path d="M0 100 L0 70 L10 70 L10 58 L22 58 L22 74 L36 74 L36 44 L50 44 L50 78 L64 78 L64 60 L78 60 L78 100 Z" fill="#0a0418" opacity="0.7" />
        {/* Street light glow */}
        <circle cx="22%" cy="78%" r="14" fill="#ff00a0" opacity="0.08" />
        <line x1="22%" y1="78%" x2="22%" y2="100%" stroke="#ff00a0" strokeWidth="0.5" opacity="0.3" />
        {/* Power lines */}
        <path d="M0 42 Q28 46, 56 40 T100 44" fill="none" stroke="#3a1a3a" strokeWidth="0.4" opacity="0.5" />
      </>
    ),
  },
  {
    id: "wheels",
    caption: "wheel_detail_03",
    rotation: 4,
    left: "42%",
    top: "4%",
    color: "#141414",
    render: () => (
      <>
        <rect width="100%" height="100%" fill="#0a0a0a" />
        {/* Wheel rim */}
        <circle cx="50%" cy="50%" r="38%" fill="none" stroke="#2a2a2a" strokeWidth="3" />
        <circle cx="50%" cy="50%" r="30%" fill="none" stroke="#1f1f1f" strokeWidth="1.5" />
        <circle cx="50%" cy="50%" r="12%" fill="#111" stroke="#333" strokeWidth="1" />
        {/* Spokes */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i * 72 * Math.PI) / 180;
          const x2 = 50 + 30 * Math.cos(angle);
          const y2 = 50 + 30 * Math.sin(angle);
          return (
            <line key={i} x1="50%" y1="50%" x2={`${x2}%`} y2={`${y2}%`} stroke="#222" strokeWidth="2.5" />
          );
        })}
        {/* Brake caliper hint */}
        <path d="M58 38 A14 14 0 0 1 58 62" fill="none" stroke="#ff0055" strokeWidth="2" opacity="0.5" />
        {/* Tire wall */}
        <circle cx="50%" cy="50%" r="44%" fill="none" stroke="#0d0d0d" strokeWidth="6" />
        {/* Light streak */}
        <path d="M10 20 L30 80" fill="none" stroke="#ff00a0" strokeWidth="0.5" opacity="0.15" />
      </>
    ),
  },
  {
    id: "homelab",
    caption: "rack_status_ok",
    rotation: -3,
    left: "22%",
    top: "46%",
    color: "#0a1410",
    render: () => (
      <>
        <rect width="100%" height="100%" fill="#0d060d" />
        {/* Server rack frame */}
        <rect x="18%" y="8%" width="64%" height="84%" fill="none" stroke="#3a1a3a" strokeWidth="1" />
        {/* Server units */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect x="22%" y={`${14 + i * 13}%`} width="56%" height="10%" fill="#120820" stroke="#3a1a5c" strokeWidth="0.5" />
            {/* Status LEDs */}
            <circle cx="28%" cy={`${19 + i * 13}%`} r="1.2%" fill={i === 2 ? "#ffcc00" : "#00f0ff"} opacity="0.8" />
            <circle cx="32%" cy={`${19 + i * 13}%`} r="1.2%" fill={i === 4 ? "#ff0055" : "#00f0ff"} opacity="0.6" />
            <circle cx="36%" cy={`${19 + i * 13}%`} r="1.2%" fill="#ff00a0" opacity="0.4" />
            {/* Vent lines */}
            <line x1="44%" y1={`${16 + i * 13}%`} x2="72%" y2={`${16 + i * 13}%`} stroke="#3a1a3a" strokeWidth="0.5" />
            <line x1="44%" y1={`${19 + i * 13}%`} x2="72%" y2={`${19 + i * 13}%`} stroke="#3a1a3a" strokeWidth="0.5" />
            <line x1="44%" y1={`${22 + i * 13}%`} x2="72%" y2={`${22 + i * 13}%`} stroke="#3a1a3a" strokeWidth="0.5" />
          </g>
        ))}
        {/* Cable hint */}
        <path d="M82 28 C92 28, 92 52, 82 52" fill="none" stroke="#ff00a0" strokeWidth="0.6" opacity="0.3" />
        <path d="M82 56 C92 56, 92 78, 82 78" fill="none" stroke="#ff0055" strokeWidth="0.6" opacity="0.2" />
      </>
    ),
  },
  {
    id: "coast",
    caption: "isabela_shore_07",
    rotation: 7,
    left: "56%",
    top: "38%",
    color: "#0d082d",
    render: () => (
      <>
        <rect width="100%" height="100%" fill="#0a0828" />
        {/* Horizon */}
        <path d="M0 52 Q25 48, 50 52 T100 50 L100 100 L0 100 Z" fill="#051015" opacity="0.8" />
        {/* Water reflections */}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x={`${10 + i * 12}%`}
            y={`${56 + (i % 3) * 8}%`}
            width={`${4 + (i % 3) * 3}%`}
            height="0.8%"
            fill="#ff00a0"
            opacity={0.1 + (i % 3) * 0.06}
          />
        ))}
        {/* Moon */}
        <circle cx="68%" cy="22%" r="10" fill="#e8f5f5" opacity="0.12" />
        <circle cx="68%" cy="22%" r="5" fill="#e8f5f5" opacity="0.5" />
        {/* Palm silhouette hint */}
        <path d="M82 58 Q78 42, 84 32 Q88 38, 86 46 Q90 40, 92 34 Q88 48, 88 58" fill="none" stroke="#0f050f" strokeWidth="1.5" />
        <path d="M18 62 Q14 48, 20 38 Q24 44, 22 52 Q26 46, 28 40 Q24 54, 24 62" fill="none" stroke="#0f050f" strokeWidth="1.2" />
        {/* Stars */}
        {Array.from({ length: 10 }).map((_, i) => (
          <circle
            key={i}
            cx={`${15 + (i * 41) % 70}%`}
            cy={`${6 + (i * 17) % 36}%`}
            r={0.5 + (i % 2) * 0.4}
            fill="#e8f5f5"
            opacity={0.25 + (i % 3) * 0.12}
          />
        ))}
      </>
    ),
  },
];

export default function PolaroidGallery() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="polaroid-gallery" aria-label="Scattered polaroid gallery">
      {PHOTOS.map((photo) => (
        <figure
          key={photo.id}
          className={`polaroid-frame ${hovered === photo.id ? "is-hovered" : ""} ${hovered && hovered !== photo.id ? "is-dimmed" : ""}`}
          style={{
            left: photo.left,
            top: photo.top,
            transform: `rotate(${photo.rotation}deg) ${hovered === photo.id ? 'scale(1.08) translateY(-8px)' : ''}`,
            zIndex: hovered === photo.id ? 10 : 1,
          }}
          onMouseEnter={() => setHovered(photo.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="polaroid-photo" style={{ background: photo.color }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              {photo.render()}
            </svg>
          </div>
          <figcaption>{photo.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
