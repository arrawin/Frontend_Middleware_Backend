import { useEffect, useState } from "react";
import CreateLeave from "./CreateLeave";
import Dashboard from "./dashboard";
import { getLeaves } from "./services/api";
import "./App.css";

function App() {
  const [message, setMessage] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [activeView, setActiveView] = useState("dashboard");

  const loadLeaves = async () => {
    try {
      const data = await getLeaves();
      setLeaves(data);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to load leave records",
      });
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(t);
  }, [message]);

  const totalLeaves = leaves.length;
  const pendingCount = leaves.filter((l) => l.status === "Pending").length;
  const approvedCount = leaves.filter((l) => l.status === "Approved").length;
  const rejectedCount = leaves.filter((l) => l.status === "Rejected").length;

  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h1>LeaveDesk</h1>
          <p>Employee Management</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-link ${activeView === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveView("dashboard")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
            Dashboard
          </button>
          <button
            className={`sidebar-link ${activeView === "apply" ? "active" : ""}`}
            onClick={() => setActiveView("apply")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
            Apply Leave
          </button>
          <button
            className={`sidebar-link ${activeView === "all" ? "active" : ""}`}
            onClick={() => setActiveView("all")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /></svg>
            All Requests
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">HR</div>
            <div className="sidebar-user-info">
              <strong>HR Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div className="main-content">
        <div className="topbar">
          <span className="topbar-title">
            {activeView === "dashboard" && "Dashboard"}
            {activeView === "apply" && "Apply for Leave"}
            {activeView === "all" && "All Leave Requests"}
          </span>
          <div className="topbar-actions">
            {pendingCount > 0 && (
              <span className="topbar-badge">{pendingCount} Pending</span>
            )}
          </div>
        </div>

        <div className="page-body">
          {message && (
            <div className={`status-banner ${message.type}`}>
              {message.text}
            </div>
          )}

          {/* Stats row — visible on dashboard */}
          {activeView === "dashboard" && (
            <>
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-icon blue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  </div>
                  <div className="stat-info">
                    <strong>{totalLeaves}</strong>
                    <span>Total Requests</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon amber">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </div>
                  <div className="stat-info">
                    <strong>{pendingCount}</strong>
                    <span>Pending</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon green">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  </div>
                  <div className="stat-info">
                    <strong>{approvedCount}</strong>
                    <span>Approved</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon red">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                  </div>
                  <div className="stat-info">
                    <strong>{rejectedCount}</strong>
                    <span>Rejected</span>
                  </div>
                </div>
              </div>

              <Dashboard
                leaves={leaves}
                setMessage={setMessage}
                loadLeaves={loadLeaves}
              />
            </>
          )}

          {activeView === "apply" && (
            <CreateLeave setMessage={setMessage} loadLeaves={loadLeaves} />
          )}

          {activeView === "all" && (
            <Dashboard
              leaves={leaves}
              setMessage={setMessage}
              loadLeaves={loadLeaves}
              showAll
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
