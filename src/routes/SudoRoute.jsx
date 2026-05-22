import TerminalPanel from "../components/ui/TerminalPanel.jsx";
import "../styles.css";

export default function SudoRoute() {
  return (
    <main className="sudo-route">
      <a className="button button-secondary" href="/">
        &gt;_ return home
      </a>
      <section>
        <h1>sudo access requested</h1>
        <p>Curiosity gets logged. Good engineers check the hidden routes.</p>
        <TerminalPanel />
      </section>
    </main>
  );
}
