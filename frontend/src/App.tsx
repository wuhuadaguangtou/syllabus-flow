import { useState } from "react";

import { API_BASE_URL, fetchHealth } from "./api";
import type { ConnectionState } from "./types";

const nextMilestones = [
  "Upload and validate course PDFs",
  "Extract assessments and confirmed deadlines",
  "Turn confirmed dates into an actionable study plan",
];

function App() {
  const [connection, setConnection] = useState<ConnectionState>({ status: "idle" });

  async function checkApi() {
    setConnection({ status: "loading" });

    try {
      const data = await fetchHealth();
      setConnection({ status: "success", data });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown connection error";
      setConnection({ status: "error", message });
    }
  }

  return (
    <main className="page-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="SyllabusFlow home">
          <span className="brand-mark">S</span>
          <span>SyllabusFlow</span>
        </a>
        <span className="stage-badge">Foundation</span>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Course planning, without the busywork</p>
          <h1>Turn every syllabus into a plan you can trust.</h1>
          <p className="hero-description">
            SyllabusFlow will extract confirmed deadlines from course documents and turn them
            into clear, editable study tasks.
          </p>
          <div className="hero-actions">
            <button
              className="primary-button"
              type="button"
              onClick={checkApi}
              disabled={connection.status === "loading"}
            >
              {connection.status === "loading" ? "Checking…" : "Check API connection"}
            </button>
            <a className="secondary-link" href={`${API_BASE_URL}/docs`} target="_blank" rel="noreferrer">
              Open API docs
            </a>
          </div>
        </div>

        <aside className="status-card" aria-live="polite">
          <div className="status-card-header">
            <span>Backend status</span>
            <span className={`status-dot status-${connection.status}`} />
          </div>
          <code>{API_BASE_URL}/api/health</code>

          {connection.status === "idle" && (
            <p className="status-message">Run the connection check to verify the FastAPI service.</p>
          )}
          {connection.status === "loading" && (
            <p className="status-message">Contacting the API…</p>
          )}
          {connection.status === "success" && (
            <div className="status-result success-result">
              <strong>Connected</strong>
              <span>{connection.data.service}</span>
              <span>Version {connection.data.version}</span>
            </div>
          )}
          {connection.status === "error" && (
            <div className="status-result error-result">
              <strong>Connection failed</strong>
              <span>{connection.message}</span>
              <span>Make sure FastAPI is running on port 8000.</span>
            </div>
          )}
        </aside>
      </section>

      <section className="milestones" aria-labelledby="milestones-title">
        <div>
          <p className="eyebrow">Next milestone</p>
          <h2 id="milestones-title">Build the document pipeline</h2>
        </div>
        <ol>
          {nextMilestones.map((milestone, index) => (
            <li key={milestone}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{milestone}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

export default App;
