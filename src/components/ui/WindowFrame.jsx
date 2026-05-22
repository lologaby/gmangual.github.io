import { useRef, useEffect, useCallback, useState } from "react";
import { useWindowManager } from "../../hooks/useWindowManager.jsx";
import { useIsMobile } from "../../hooks/useIsMobile.js";

export default function WindowFrame({
  id,
  title,
  defaultX = 100,
  defaultY = 100,
  defaultWidth,
  defaultHeight,
  children,
  className = "",
  style = {},
  onClose,
  showInTaskbar = true,
  options = {},
}) {
  const mgr = useWindowManager();
  const winState = mgr.windows[id];
  const isMobile = useIsMobile();
  const nodeRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0, rectX: 0, rectY: 0 });
  const [pos, setPos] = useState({ x: defaultX, y: defaultY });
  const [size, setSize] = useState({
    width: defaultWidth ?? "auto",
    height: defaultHeight ?? "auto",
  });

  useEffect(() => {
    mgr.registerWindow(id, title, { showInTaskbar, ...options });
    return () => mgr.unregisterWindow(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handlePointerDown = useCallback(
    (e) => {
      if (isMobile) return;
      if (e.target.closest(".window-titlebar-controls")) return;
      mgr.bringToFront(id);
      const rect = nodeRef.current.getBoundingClientRect();
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        rectX: rect.left,
        rectY: rect.top,
      };
      nodeRef.current.setPointerCapture(e.pointerId);
    },
    [id, mgr, isMobile]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (isMobile) return;
      if (!nodeRef.current.hasPointerCapture(e.pointerId)) return;
      if (winState?.maximized) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPos({
        x: Math.max(0, dragStart.current.rectX + dx),
        y: Math.max(0, dragStart.current.rectY + dy),
      });
    },
    [winState?.maximized, isMobile]
  );

  const handlePointerUp = useCallback((e) => {
    if (nodeRef.current?.hasPointerCapture(e.pointerId)) {
      nodeRef.current.releasePointerCapture(e.pointerId);
    }
  }, []);

  if (!winState || winState.closed) return null;

  const isMax = winState.maximized;
  const isMin = winState.minimized;

  const computedStyle = isMobile
    ? {
        position: "relative",
        left: "auto",
        top: "auto",
        width: "100%",
        height: "auto",
        zIndex: winState.zIndex,
        marginBottom: "18px",
      }
    : isMax
      ? {
          position: "fixed",
          left: 0,
          top: 0,
          width: "100vw",
          height: "calc(100vh - 30px)",
          zIndex: winState.zIndex,
        }
      : {
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: size.width,
          height: size.height,
          zIndex: winState.zIndex,
        };

  return (
    <div
      ref={nodeRef}
      className={`window-frame ${className}`}
      style={{
        ...computedStyle,
        display: isMin ? "none" : "block",
        ...style,
      }}
      onPointerDown={() => mgr.bringToFront(id)}
    >
      <div
        className="window-titlebar"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ cursor: isMobile ? "default" : isMax ? "default" : "move" }}
      >
        <span>{title}</span>
        <div className="window-titlebar-controls" aria-hidden="true">
          <button
            type="button"
            onClick={() => mgr.toggleMinimize(id)}
            aria-label="Minimize"
          >
            <b>_</b>
          </button>
          <button
            type="button"
            onClick={() => mgr.toggleMaximize(id)}
            aria-label="Maximize"
          >
            <b>{isMax ? "❐" : "□"}</b>
          </button>
          <button
            type="button"
            onClick={() => {
              mgr.closeWindow(id);
              onClose?.();
            }}
            aria-label="Close"
          >
            <b>×</b>
          </button>
        </div>
      </div>
      <div className="window-body">{children}</div>
    </div>
  );
}
