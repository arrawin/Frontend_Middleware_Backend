import { useState } from "react";
import { createLeave } from "./services/api";

function CreateLeave({ setMessage, loadLeaves }) {
  const initialFormState = {
    employee_name: "",
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await createLeave(form);

    if (response.ok) {
      setMessage({
        type: "success",
        text: "Leave submitted successfully",
      });
      setForm(initialFormState);
      await loadLeaves();
    } else {
      setMessage({
        type: "error",
        text: response.data?.detail || "Request failed",
      });
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Apply for Leave</h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div>
          <label>Employee Name</label>
          <input
            name="employee_name"
            value={form.employee_name}
            onChange={handleChange}
            placeholder="e.g. Alex Johnson"
            required
          />
        </div>

        <div>
          <label>Leave Type</label>
          <select
            name="leave_type"
            value={form.leave_type}
            onChange={handleChange}
            required
          >
            <option value="">Select type…</option>
            <option value="Sick">🤒 Sick Leave</option>
            <option value="Casual">☀️ Casual Leave</option>
            <option value="Annual">🌴 Annual Leave</option>
            <option value="Work From Home">🏠 Work From Home</option>
          </select>
        </div>

        <div>
          <label>Start Date</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="full-width">
          <label>Reason</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Briefly describe the reason for your leave…"
            required
          />
        </div>

        <div className="button-row full-width">
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Submitting…" : "✦ Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateLeave;
