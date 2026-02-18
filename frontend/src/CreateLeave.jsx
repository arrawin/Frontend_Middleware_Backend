import { useState } from "react";
import { createLeave } from "./services/api";

function CreateLeave() {
  const [form, setForm] = useState({
    employee_name: "",
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLeave(form);
    alert("Leave submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="employee_name" placeholder="Name" onChange={handleChange} />
      <input name="leave_type" placeholder="Type" onChange={handleChange} />
      <input name="start_date" placeholder="Start Date" onChange={handleChange} />
      <input name="end_date" placeholder="End Date" onChange={handleChange} />
      <input name="reason" placeholder="Reason" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateLeave;
