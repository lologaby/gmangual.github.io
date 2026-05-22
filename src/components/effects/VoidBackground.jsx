import { useEffect, useRef } from "react";

export default function VoidBackground() {
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

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      t += 1;
      const W = canvas.width;
      const H = canvas.height;

      // Deep void base - slightly lighter
      ctx.fillStyle = "#060e0e";
      ctx.fillRect(0, 0, W, H);

      // Subtle radial glow from center-bottom
      const grad = ctx.createRadialGradient(W * 0.5, H * 0.7, 0, W * 0.5, H * 0.7, W * 0.8);
      grad.addColorStop(0, "rgba(8, 20, 20, 1)");
      grad.addColorStop(0.5, "rgba(5, 14, 14, 1)");
      grad.addColorStop(1, "rgba(3, 6, 6, 1)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Perspective grid lines (retro CRT floor)
      ctx.save();
      ctx.globalAlpha = 0.22;
      const horizonY = H * 0.38;
      const gridColor = "#00e5cc";
      const magentaColor = "#ff2a6d";

      // Horizontal floor lines
      for (let i = 0; i < 18; i++) {
        const y = horizonY + (H - horizonY) * (1 - Math.pow(0.88, i));
        const alpha = (i / 18) * 0.6;
        ctx.strokeStyle = i % 3 === 0 ? magentaColor : gridColor;
        ctx.globalAlpha = alpha * 0.25;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Vertical perspective lines radiating from center
      const centerX = W * 0.5;
      for (let i = -12; i <= 12; i++) {
        const angle = (i / 12) * 0.35;
        ctx.strokeStyle = Math.abs(i) % 4 === 0 ? magentaColor : gridColor;
        ctx.globalAlpha = 0.14;
        ctx.beginPath();
        ctx.moveTo(centerX + angle * (H - horizonY) * 0.3, horizonY);
        ctx.lineTo(centerX + angle * (H - horizonY) * 2.5, H);
        ctx.stroke();
      }
      ctx.restore();

      // Floating stars / noise particles
      stars.forEach((star) => {
        const sx = star.x * W;
        const sy = star.y * H;
        const twinkle = Math.sin(t * star.speed + star.twinkle);
        const alpha = 0.35 + twinkle * 0.3;

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = star.size > 1.2 ? "#ff2a6d" : "#00e5cc";
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Crosshair glow for bigger stars
        if (star.size > 1.0) {
          ctx.strokeStyle = ctx.fillStyle;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = alpha * 0.5;
          ctx.beginPath();
          ctx.moveTo(sx - 4, sy);
          ctx.lineTo(sx + 4, sy);
          ctx.moveTo(sx, sy - 4);
          ctx.lineTo(sx, sy + 4);
          ctx.stroke();
        }
        ctx.restore();
      });

      // Occasional chromatic flicker lines
      if (Math.random() > 0.97) {
        const fy = Math.random() * H;
        ctx.save();
        ctx.globalAlpha = 0.06;
        ctx.fillStyle = "#ff2a6d";
        ctx.fillRect(0, fy, W, 2);
        ctx.fillStyle = "#00e5cc";
        ctx.fillRect(0, fy + 2, W, 1);
        ctx.restore();
      }

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
        position: "fixed",
        inset: 0,
        zIndex: -10,
        pointerEvents: "none",
      }}
    />
  );
}
