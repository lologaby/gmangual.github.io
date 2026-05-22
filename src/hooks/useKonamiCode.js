import { useEffect, useRef } from "react";

const sequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(callback) {
  const progress = useRef([]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const next = [...progress.current, event.key].slice(-sequence.length);
      progress.current = next;

      if (sequence.every((key, index) => key.toLowerCase() === next[index]?.toLowerCase())) {
        callback();
        progress.current = [];
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [callback]);
}
