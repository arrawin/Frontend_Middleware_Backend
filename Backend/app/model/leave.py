from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

class Leave(Base):
    __tablename__ = 'leaves'
    id = Column(Integer, primary_key=True, index=True)
    employee_name = Column(String, nullable=False)
    leave_type = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=False)
    reason = Column(String, nullable=False)
    status = Column(String, default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)