import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const modules = [
    ["Employees", "40+", "Staff profiles, credentials & availability"],
    ["Clients", "70+", "Care plans, services & documentation"],
    ["EVV", "Ready", "Clock in/out, tasks & shift summaries"],
    ["Scheduling", "Active", "Open shifts, coverage & staff matching"],
    ["Incidents", "Secure", "Incident reports, MUIs & record keeping"],
    ["Integrations", "Planned", "Sandata, Xoomia & ADP"],
  ];

  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="brand">
            <div className="logo">C</div>
            <div>
              <h1>CareOS</h1>
              <p>Home Care Operations Platform</p>
            </div>
          </div>
        </div>

        <button className="primary-button">+ Quick Action</button>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <span className="badge">PRIVATE USE • v0.1</span>
            <h2>Good morning 👋</h2>
            <p>
              Manage your agency operations from one secure dashboard.
            </p>
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Employees</span>
            <strong>40+</strong>
            <small>Active workforce</small>
          </div>

          <div className="stat-card">
            <span>Clients</span>
            <strong>70+</strong>
            <small>Active clients</small>
          </div>

          <div className="stat-card">
            <span>Open Shifts</span>
            <strong>0</strong>
            <small>Needs coverage</small>
          </div>

          <div className="stat-card">
            <span>Alerts</span>
            <strong>0</strong>
            <small>Needs attention</small>
          </div>
        </section>

        <div className="section-heading">
          <div>
            <h3>Agency Operations</h3>
            <p>Your CareOS modules</p>
          </div>
        </div>

        <section className="module-grid">
          {modules.map(([title, status, description]) => (
            <article className="module-card" key={title}>
              <div className="module-top">
                <div className="module-icon">
                  {title.charAt(0)}
                </div>
                <span className="status-success">{status}</span>
              </div>

              <h4>{title}</h4>
              <p>{description}</p>
              <button>Open {title} →</button>
            </article>
          ))}
        </section>

        <section className="activity">
          <div>
            <h3>System Status</h3>
            <p>CareOS private-use environment</p>
          </div>

          <div className="status-row">
            <span>Core application</span>
            <strong>● Operational</strong>
          </div>

          <div className="status-row">
            <span>EVV integrations</span>
            <strong>○ Not connected</strong>
          </div>

          <div className="status-row">
            <span>Payroll integration</span>
            <strong>○ Not connected</strong>
          </div>
        </section>
      </main>

      <footer>
        CareOS • Private Agency Platform • v0.1
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);