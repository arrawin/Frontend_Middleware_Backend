import { useState } from "react";
import { createLeave } from "./services/api";

function CreateLeave({ setMessage, triggerRefresh }) {
  const initialFormState = {
    employee_name: "",
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  };

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createLeave(form);

      if (response.httpStatus === 200 || response.httpStatus === 201) {
        setMessage({
          type: "success",
          text: `Leave submitted successfully (Status ${response.httpStatus})`,
        });

        setForm(initialFormState);

        triggerRefresh(); // 🔥 refresh dashboard
      } else {
        setMessage({
          type: "error",
          text: response.data?.detail || "Request failed",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Server error occurred",
      });
    }
  };

  return (
    <div className="card">
      <h2>Mark Leave</h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div>
          <label>Employee Name</label>
          <input
            name="employee_name"
            value={form.employee_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Leave Type</label>
          <input
            name="leave_type"
            value={form.leave_type}
            onChange={handleChange}
            required
          />
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
            required
          />
        </div>

        <div className="button-row full-width">
          <button type="submit" className="primary-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateLeave;
