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

    try {
      const response = await createLeave(form);

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Leave submitted successfully!",
        });
        setForm(initialFormState);
        await loadLeaves();
      } else {
        setMessage({
          type: "error",
          text: response.data?.detail || "Request failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      setMessage({
        type: "error",
        text: "Could not connect to server. Please check your connection.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>New Leave Request</h2>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employee_name">Employee Name</label>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              id="employee_name"
              name="employee_name"
              value={form.employee_name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="leave_type">Leave Type</label>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
            </svg>
            <select
              id="leave_type"
              name="leave_type"
              value={form.leave_type}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              <option value="Sick">Sick Leave</option>
              <option value="Casual">Casual Leave</option>
              <option value="Annual">Annual Leave</option>
              <option value="Work From Home">Work From Home</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="start_date">Start Date</label>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <input
              id="start_date"
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="end_date">End Date</label>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <input
              id="end_date"
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="reason">Reason</label>
          <textarea
            id="reason"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Briefly describe the reason for leave..."
            required
          />
        </div>

        <div className="form-actions full-width">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setForm(initialFormState)}
            disabled={loading}
          >
            Clear
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateLeave;
