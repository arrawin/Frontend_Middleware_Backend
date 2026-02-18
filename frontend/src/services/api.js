const API_BASE = "https://leave-backend.onrender.com";

export const getLeaves = async () => {
  const res = await fetch(`${API_BASE}/leaves/`);
  return res.json();
};

export const createLeave = async (data) => {
  const res = await fetch(`${API_BASE}/leaves/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const approveLeave = async (id) => {
  const res = await fetch(`${API_BASE}/leaves/${id}/approve`, {
    method: "PUT",
  });
  return res.json();
};

export const rejectLeave = async (id) => {
  const res = await fetch(`${API_BASE}/leaves/${id}/reject`, {
    method: "PUT",
  });
  return res.json();
};
