import { useState } from "react";
import CreateLeave from "./CreateLeave";
import Dashboard from "./dashboard";
import "./App.css";

function App() {
  const [message, setMessage] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => {
    setRefreshFlag((prev) => !prev);
  };

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
          triggerRefresh={triggerRefresh}
        />
        <Dashboard
          setMessage={setMessage}
          refreshFlag={refreshFlag}
        />
      </div>
    </div>
  );
}

export default App;
