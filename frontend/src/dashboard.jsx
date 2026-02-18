import { useEffect, useState } from "react";
import { getLeaves, approveLeave, rejectLeave } from "./services/api";

function Dashboard() {
  const [leaves, setLeaves] = useState([]);

  const loadLeaves = async () => {
    const data = await getLeaves();
    setLeaves(data);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  return (
    <div>
      <h2>Leave Requests</h2>
      {leaves.map((leave) => (
        <div key={leave.id}>
          <p>{leave.employee_name} - {leave.status}</p>
          <button onClick={() => approveLeave(leave.id).then(loadLeaves)}>
            Approve
          </button>
          <button onClick={() => rejectLeave(leave.id).then(loadLeaves)}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
