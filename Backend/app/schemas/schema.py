from pydantic import BaseModel
from datetime import datetime

class LeaveCreate(BaseModel):
    employee_name: str
    leave_type: str
    start_date: str
    end_date: str
    reason: str

class LeaveResponse(BaseModel):
    id: int
    employee_name: str
    leave_type: str
    start_date: str
    end_date: str
    reason: str
    status: str
    created_at: datetime

    class Config:
        orm_mode = True
