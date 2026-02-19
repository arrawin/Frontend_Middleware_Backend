import { useEffect, useState } from "react";
import CreateLeave from "./CreateLeave";
import Dashboard from "./dashboard";
import { getLeaves } from "./services/api";
import "./App.css";

function App() {
  const [message, setMessage] = useState(null);
  const [leaves, setLeaves] = useState([]);

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

  // Auto-dismiss banner after 4 s
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <div className="page">
      {/* ── Header ── */}
      <header className="header">
        <div className="header-icon">🗓️</div>
        <div>
          <div className="header-title">Leave Management System</div>
        </div>
        <span className="header-sub">HR Portal</span>
      </header>

      {/* ── Status banner ── */}
      {message && (
        <div className={`status-banner ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* ── Main content ── */}
      <div className="content">
        <CreateLeave setMessage={setMessage} loadLeaves={loadLeaves} />
        <Dashboard leaves={leaves} setMessage={setMessage} loadLeaves={loadLeaves} />
      </div>
    </div>
  );
}

export default App;
