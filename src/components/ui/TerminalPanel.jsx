import { useMemo, useRef, useState } from "react";
import { terminalCommands } from "../../data/site.js";

const defaultLines = [
  "interactive shell ready",
  "type help, whoami, or search --skill proxmox",
];

export default function TerminalPanel() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([{ command: "boot", output: defaultLines }]);
  const inputRef = useRef(null);

  const prompt = useMemo(() => "alex@portfolio:~$", []);

  const runCommand = (event) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;

    const output =
      terminalCommands[command] ??
      (command === "clear"
        ? null
        : [`command not found: ${command}`, "try help, then break something useful"]);

    if (command === "clear") {
      setHistory([]);
    } else {
      setHistory((current) => [...current.slice(-4), { command, output }]);
    }
    setInput("");
  };

  return (
    <div className="terminal-panel" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-chrome">
        <span />
        <span />
        <span />
        <strong>mindset.txt</strong>
      </div>
      <div className="terminal-screen">
        {history.map((entry, index) => (
          <div className="terminal-entry" key={`${entry.command}-${index}`}>
            <p>
              <span>{prompt}</span> {entry.command}
            </p>
            {entry.output?.map((line) => (
              <p className="terminal-output" key={line}>
                {line}
              </p>
            ))}
          </div>
        ))}
        <form onSubmit={runCommand} className="terminal-form">
          <label htmlFor="hero-terminal-input">{prompt}</label>
          <input
            ref={inputRef}
            id="hero-terminal-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            autoComplete="off"
            spellCheck="false"
            aria-label="Interactive hero terminal"
          />
          <span className="terminal-caret" aria-hidden="true" />
        </form>
      </div>
    </div>
  );
}
