import { useEffect, useRef } from "react";

export default function VaporwaveWallpaper() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.55,
      size: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.015 + 0.005,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      t += 1;
      const W = canvas.width;
      const H = canvas.height;

      // Sky gradient: deep purple → vivid magenta → hot orange → golden
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.68);
      skyGrad.addColorStop(0, "#120430");
      skyGrad.addColorStop(0.12, "#2a0860");
      skyGrad.addColorStop(0.28, "#5a1080");
      skyGrad.addColorStop(0.45, "#a02078");
      skyGrad.addColorStop(0.58, "#d84050");
      skyGrad.addColorStop(0.7, "#f06030");
      skyGrad.addColorStop(0.82, "#f8a040");
      skyGrad.addColorStop(0.92, "#f8c060");
      skyGrad.addColorStop(1, "#3a1860");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // Sun: large gradient circle near horizon
      const sunY = H * 0.62;
      const sunRadius = Math.min(W, H) * 0.22;
      const sunGrad = ctx.createLinearGradient(W * 0.5, sunY - sunRadius, W * 0.5, sunY + sunRadius);
      sunGrad.addColorStop(0, "#ffee88");
      sunGrad.addColorStop(0.3, "#ffaa33");
      sunGrad.addColorStop(0.55, "#ff5544");
      sunGrad.addColorStop(0.8, "#ff2288");
      sunGrad.addColorStop(1, "#ff00cc");
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.ellipse(W * 0.5, sunY, sunRadius, sunRadius * 0.9, 0, 0, Math.PI * 2);
      ctx.fill();
      // Sun glow
      const glowGrad = ctx.createRadialGradient(W * 0.5, sunY, sunRadius * 0.7, W * 0.5, sunY, sunRadius * 3);
      glowGrad.addColorStop(0, "rgba(255, 100, 200, 0.5)");
      glowGrad.addColorStop(0.4, "rgba(255, 50, 120, 0.3)");
      glowGrad.addColorStop(0.7, "rgba(200, 50, 150, 0.12)");
      glowGrad.addColorStop(1, "rgba(255, 0, 160, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.ellipse(W * 0.5, sunY, sunRadius * 3, sunRadius * 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Mountain silhouettes
      ctx.save();
      ctx.fillStyle = "#0a0830";
      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(0, H * 0.62);
      ctx.lineTo(W * 0.08, H * 0.58);
      ctx.lineTo(W * 0.15, H * 0.61);
      ctx.lineTo(W * 0.22, H * 0.55);
      ctx.lineTo(W * 0.28, H * 0.59);
      ctx.lineTo(W * 0.35, H * 0.54);
      ctx.lineTo(W * 0.42, H * 0.60);
      ctx.lineTo(W * 0.5, H * 0.52);
      ctx.lineTo(W * 0.58, H * 0.59);
      ctx.lineTo(W * 0.65, H * 0.55);
      ctx.lineTo(W * 0.72, H * 0.61);
      ctx.lineTo(W * 0.78, H * 0.57);
      ctx.lineTo(W * 0.85, H * 0.62);
      ctx.lineTo(W * 0.92, H * 0.58);
      ctx.lineTo(W, H * 0.63);
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Second mountain layer (closer, darker)
      ctx.save();
      ctx.fillStyle = "#0c0a35";
      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(0, H * 0.68);
      ctx.lineTo(W * 0.12, H * 0.65);
      ctx.lineTo(W * 0.25, H * 0.70);
      ctx.lineTo(W * 0.38, H * 0.64);
      ctx.lineTo(W * 0.52, H * 0.71);
      ctx.lineTo(W * 0.65, H * 0.66);
      ctx.lineTo(W * 0.78, H * 0.72);
      ctx.lineTo(W * 0.9, H * 0.67);
      ctx.lineTo(W, H * 0.70);
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Perspective grid floor
      ctx.save();
      const horizonY = H * 0.70;
      const floorColor = "#ff00a0";
      const cyanColor = "#00f0ff";

      // Horizontal floor lines
      for (let i = 0; i < 24; i++) {
        const y = horizonY + (H - horizonY) * (1 - Math.pow(0.88, i));
        const alpha = (i / 24) * 0.5;
        ctx.strokeStyle = i % 4 === 0 ? cyanColor : floorColor;
        ctx.globalAlpha = alpha * 0.35;
        ctx.lineWidth = i % 4 === 0 ? 1.5 : 0.8;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Vertical perspective lines
      const centerX = W * 0.5;
      for (let i = -16; i <= 16; i++) {
        const angle = (i / 16) * 0.4;
        ctx.strokeStyle = Math.abs(i) % 5 === 0 ? cyanColor : floorColor;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = Math.abs(i) % 5 === 0 ? 1.2 : 0.6;
        ctx.beginPath();
        ctx.moveTo(centerX + angle * (H - horizonY) * 0.2, horizonY);
        ctx.lineTo(centerX + angle * (H - horizonY) * 3, H);
        ctx.stroke();
      }
      ctx.restore();

      // Stars above horizon
      stars.forEach((star) => {
        const sx = star.x * W;
        const sy = star.y * H;
        const twinkle = Math.sin(t * star.speed + star.twinkle);
        const alpha = 0.3 + twinkle * 0.25;

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = star.size > 0.9 ? "#ffffff" : "#ffccff";
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Scanlines overlay
      ctx.save();
      ctx.globalAlpha = 0.03;
      ctx.fillStyle = "#000";
      for (let y = 0; y < H; y += 3) {
        ctx.fillRect(0, y, W, 1);
      }
      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
