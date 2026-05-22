import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [state, setState] = useState({ x: -40, y: -40, mode: "default" });

  useEffect(() => {
    const onMove = (event) => {
      const target = event.target.closest?.("[data-cursor]");
      setState({
        x: event.clientX,
        y: event.clientY,
        mode: target?.dataset.cursor ?? "default",
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div className="custom-cursor" data-mode={state.mode} style={{ "--x": `${state.x}px`, "--y": `${state.y}px` }} />;
}
