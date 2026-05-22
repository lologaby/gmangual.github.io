import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

const WindowManagerContext = createContext(null);

let globalZ = 100;

export function WindowManagerProvider({ children }) {
  const [windows, setWindows] = useState({});
  const [activeId, setActiveId] = useState(null);
  const windowsRef = useRef({});

  const sync = useCallback((updater) => {
    setWindows((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      windowsRef.current = next;
      return next;
    });
  }, []);

  const registerWindow = useCallback((id, title, options = {}) => {
    sync((prev) => ({
      ...prev,
      [id]: {
        title,
        minimized: false,
        maximized: false,
        closed: false,
        zIndex: ++globalZ,
        ...options,
      },
    }));
    setActiveId(id);
  }, [sync]);

  const unregisterWindow = useCallback((id) => {
    sync((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, [sync]);

  const bringToFront = useCallback((id) => {
    const nextZ = ++globalZ;
    sync((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], zIndex: nextZ, minimized: false },
      };
    });
    setActiveId(id);
    return nextZ;
  }, [sync]);

  const toggleMinimize = useCallback((id) => {
    sync((prev) => {
      if (!prev[id]) return prev;
      const wasMin = prev[id].minimized;
      return {
        ...prev,
        [id]: { ...prev[id], minimized: !wasMin, zIndex: ++globalZ },
      };
    });
    if (!windowsRef.current[id]?.minimized) {
      setActiveId(id);
    }
  }, [sync]);

  const toggleMaximize = useCallback((id) => {
    sync((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], maximized: !prev[id].maximized, zIndex: ++globalZ },
      };
    });
    setActiveId(id);
  }, [sync]);

  const closeWindow = useCallback((id) => {
    sync((prev) => {
      if (!prev[id]) return prev;
      return { ...prev, [id]: { ...prev[id], closed: true } };
    });
  }, [sync]);

  const openWindow = useCallback((id) => {
    sync((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], closed: false, minimized: false, zIndex: ++globalZ },
      };
    });
    setActiveId(id);
  }, [sync]);

  const isWindowOpen = useCallback(
    (id) => !!windows[id] && !windows[id].closed,
    [windows]
  );

  const isWindowMinimized = useCallback(
    (id) => !!windows[id]?.minimized,
    [windows]
  );

  const getZIndex = useCallback(
    (id) => windows[id]?.zIndex ?? 10,
    [windows]
  );

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        activeId,
        registerWindow,
        unregisterWindow,
        bringToFront,
        toggleMinimize,
        toggleMaximize,
        closeWindow,
        openWindow,
        isWindowOpen,
        isWindowMinimized,
        getZIndex,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be inside WindowManagerProvider");
  return ctx;
}

export function useWindow(id, title, options) {
  const mgr = useWindowManager();

  useEffect(() => {
    mgr.registerWindow(id, title, options);
    return () => mgr.unregisterWindow(id);
  }, [id]);

  return {
    zIndex: mgr.getZIndex(id),
    isMinimized: mgr.isWindowMinimized(id),
    isOpen: mgr.isWindowOpen(id),
    bringToFront: () => mgr.bringToFront(id),
    minimize: () => mgr.toggleMinimize(id),
    maximize: () => mgr.toggleMaximize(id),
    close: () => mgr.closeWindow(id),
    open: () => mgr.openWindow(id),
  };
}
