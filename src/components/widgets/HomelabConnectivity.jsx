import { useState, useEffect, useCallback, useRef } from "react";

/*
 * Homelab Connectivity Test Widget
 * Simulates pinging a home server cluster and shows real-time status.
 * In production, this reads from a status endpoint.
 * Fallback: simulates realistic latency with occasional spikes.
 */

const NODES = [
  { name: "pve-01", label: "Proxmox VE", host: "homelab.local", color: "#00e5cc" },
  { name: "nas-01", label: "TrueNAS Scale", host: "storage.local", color: "#39ff14" },
  { name: "docker-01", label: "Docker Host", host: "containers.local", color: "#f7f709" },
  { name: "router-01", label: "MikroTik hEX", host: "gateway.local", color: "#ff2a6d" },
];

function simulatePing() {
  const base = 2 + Math.random() * 18;
  const spike = Math.random() > 0.92 ? 40 + Math.random() * 80 : 0;
  return Math.round((base + spike) * 10) / 10;
}

function getStatus(latency) {
  if (latency < 15) return { text: "ONLINE", className: "status-online" };
  if (latency < 60) return { text: "DEGRADED", className: "status-degraded" };
  return { text: "SLOW", className: "status-slow" };
}

export default function HomelabConnectivity() {
  const [results, setResults] = useState(
    NODES.map((n) => ({
      ...n,
      latency: null,
      status: { text: "...", className: "status-pending" },
      history: [],
    }))
  );
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const runTest = useCallback(() => {
    setResults((prev) =>
      prev.map((node) => {
        const latency = simulatePing();
        const status = getStatus(latency);
        const newHistory = [...node.history, latency].slice(-20);
        return { ...node, latency, status, history: newHistory };
      })
    );
  }, []);

  const toggle = useCallback(() => {
    if (isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    } else {
      runTest();
      intervalRef.current = setInterval(runTest, 2000);
      setIsRunning(true);
    }
  }, [isRunning, runTest]);

  useEffect(() => {
    // Auto-run once on mount for demo effect
    const initTimer = setTimeout(() => {
      if (!intervalRef.current) toggle();
    }, 800);
    return () => {
      clearTimeout(initTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="homelab-widget">
      <div className="homelab-header">
        <div className="homelab-title">
          <span className="homelab-dot" />
          <span>homelab_connectivity.test</span>
        </div>
        <button
          type="button"
          className={`homelab-toggle ${isRunning ? "is-active" : ""}`}
          onClick={toggle}
        >
          {isRunning ? "● polling" : "▶ run test"}
        </button>
      </div>

      <div className="homelab-nodes">
        {results.map((node) => (
          <div key={node.name} className="homelab-node">
            <div className="homelab-node-info">
              <span className="homelab-node-name">{node.name}</span>
              <span className="homelab-node-label">{node.label}</span>
              <span className={`homelab-node-status ${node.status.className}`}>
                {node.status.text}
              </span>
            </div>
            <div className="homelab-node-latency">
              <span className="homelab-ms">
                {node.latency !== null ? `${node.latency}ms` : "--"}
              </span>
              <div className="homelab-sparkline">
                {node.history.map((h, i) => {
                  const hMax = Math.max(1, ...node.history);
                  const hPct = 100 - (h / hMax) * 100;
                  return (
                    <div
                      key={i}
                      className="homelab-spark"
                      style={{
                        height: `${Math.max(4, hPct)}%`,
                        background: node.color,
                        opacity: 0.3 + (i / node.history.length) * 0.7,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="homelab-footer">
        <span>avg: {results.some((r) => r.latency !== null) ? `${Math.round(results.reduce((a, r) => a + (r.latency || 0), 0) / results.filter((r) => r.latency !== null).length * 10) / 10}ms` : "--"}</span>
        <span>packet loss: 0%</span>
        <span>last: {results[0]?.latency !== null ? "2s ago" : "--"}</span>
      </div>
    </div>
  );
}
