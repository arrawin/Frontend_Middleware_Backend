import { useEffect, useState } from "react";
import CreateLeave from "./CreateLeave";
import Dashboard from "./Dashboard";
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

  return (
    <div className="page">
      <div className="header">
        Leave Management System
      </div>

      {message && (
        <div className={`status-banner ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="content">
        <CreateLeave
          setMessage={setMessage}
          loadLeaves={loadLeaves}
        />
        <Dashboard
          leaves={leaves}
          setMessage={setMessage}
          loadLeaves={loadLeaves}
        />
      </div>
    </div>
  );
}

export default App;
