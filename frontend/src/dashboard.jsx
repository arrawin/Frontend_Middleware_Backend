import { approveLeave, rejectLeave } from "./services/api";

function Dashboard({ leaves, setMessage, loadLeaves, showAll = false }) {

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      setMessage({ type: "success", text: "Leave approved successfully" });
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

  const visibleLeaves = showAll
    ? leaves
    : leaves.filter((l) => l.status !== "Rejected");

  return (
    <div className="card">
      <div className="card-header">
        <h2>{showAll ? "All Leave Requests" : "Leave Requests"}</h2>
        <span className="card-count">{visibleLeaves.length} records</span>
      </div>

      {visibleLeaves.length === 0 ? (
        <div className="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <line x1="9" y1="12" x2="15" y2="12" />
            <line x1="9" y1="16" x2="13" y2="16" />
          </svg>
          <p>No leave requests found</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleLeaves.map((leave) => (
                <tr key={leave.id}>
                  <td className="id-cell">{leave.id}</td>
                  <td className="employee-name">{leave.employee_name}</td>
                  <td>{leave.leave_type}</td>
                  <td>{leave.start_date}</td>
                  <td>{leave.end_date}</td>
                  <td>
                    <span className={`badge badge-${leave.status.toLowerCase()}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    {leave.status === "Pending" && (
                      <div className="actions-cell">
                        <button
                          className="btn btn-sm btn-approve"
                          onClick={() => handleApprove(leave.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-reject"
                          onClick={() => handleReject(leave.id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {leave.status === "Approved" && (
                      <span style={{ color: "#059669", fontWeight: 600, fontSize: "0.8rem" }}>
                        Approved
                      </span>
                    )}
                    {leave.status === "Rejected" && (
                      <span style={{ color: "#dc2626", fontWeight: 600, fontSize: "0.8rem" }}>
                        Rejected
                      </span>
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
