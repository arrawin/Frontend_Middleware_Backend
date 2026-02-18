import { useEffect, useState } from "react";
import { getLeaves, approveLeave, rejectLeave } from "./services/api";

function Dashboard({ setMessage, refreshFlag }) {
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
  }, [refreshFlag]); // 🔥 reload when flag changes

  const handleApprove = async (id) => {
    try {
      const response = await approveLeave(id);

      setMessage({
        type: "success",
        text: `Leave approved (Status ${response.httpStatus})`,
      });

      loadLeaves();
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error approving leave",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await rejectLeave(id);

      setMessage({
        type: "error",
        text: `Leave rejected (Status ${response.httpStatus})`,
      });

      loadLeaves();
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error rejecting leave",
      });
    }
  };

  return (
    <div className="card">
      <h2>Leave History</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves
            .filter((leave) => leave.status !== "Rejected") // hide rejected
            .map((leave) => (
              <tr key={leave.id}>
                <td>{leave.id}</td>
                <td>{leave.employee_name}</td>
                <td>{leave.leave_type}</td>
                <td>{leave.start_date}</td>
                <td>{leave.end_date}</td>

                <td>
                  <span
                    className={`status ${leave.status.toLowerCase()}`}
                  >
                    {leave.status}
                  </span>
                </td>

                <td>
                  {leave.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(leave.id)}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(leave.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {leave.status === "Approved" && (
                    <span style={{ color: "green", fontWeight: "600" }}>
                      Approved
                    </span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
