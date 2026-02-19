import { approveLeave, rejectLeave } from "./services/api";

function Dashboard({ leaves, setMessage, loadLeaves }) {

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      setMessage({ type: "success", text: "Leave approved" });
      await loadLeaves();
    } catch (error) {
      setMessage({ type: "error", text: "Error approving leave" });
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);
      setMessage({ type: "error", text: "Leave rejected" });
      await loadLeaves();
    } catch (error) {
      setMessage({ type: "error", text: "Error rejecting leave" });
    }
  };

  const visibleLeaves = leaves.filter((l) => l.status !== "Rejected");

  return (
    <div className="card">
      <h2>Leave Requests</h2>

      {visibleLeaves.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p>No leave requests to display yet.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Employee</th>
                <th>Type</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleLeaves.map((leave) => (
                <tr key={leave.id}>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{leave.id}</td>
                  <td style={{ fontWeight: 500 }}>{leave.employee_name}</td>
                  <td>{leave.leave_type}</td>
                  <td>{leave.start_date}</td>
                  <td>{leave.end_date}</td>
                  <td>
                    <span className={`status ${leave.status.toLowerCase()}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    {leave.status === "Pending" && (
                      <>
                        <button onClick={() => handleApprove(leave.id)}>✓ Approve</button>
                        <button onClick={() => handleReject(leave.id)}>✕ Reject</button>
                      </>
                    )}
                    {leave.status === "Approved" && (
                      <span className="approved-label">✓ Approved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
