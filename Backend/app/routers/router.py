from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.schema import LeaveCreate, LeaveResponse
from app.services import leave_service
from datetime import datetime
from fastapi import HTTPException


router = APIRouter(prefix="/leaves", tags=["Leaves"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=LeaveResponse)
def create_leave(leave: LeaveCreate, db: Session = Depends(get_db)):
    try:
        start = datetime.strptime(leave.start_date, "%Y-%m-%d")
        end = datetime.strptime(leave.end_date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format")

    if end < start:
        raise HTTPException(
            status_code=400,
            detail="End date cannot be before start date"
        )

    return leave_service.create_leave(db, leave)

@router.get("/", response_model=list[LeaveResponse])
def get_leaves(db: Session = Depends(get_db)):
    return leave_service.get_all_leaves(db)

@router.get("/{leave_id}", response_model=LeaveResponse)
def get_leave(leave_id: int, db: Session = Depends(get_db)):
    leave = leave_service.get_leave_by_id(db, leave_id)
    if not leave:
        raise HTTPException(status_code=404, detail="Leave not found")
    return leave

@router.put("/{leave_id}/approve", response_model=LeaveResponse)
def approve_leave(leave_id: int, db: Session = Depends(get_db)):
    leave = leave_service.update_leave_status(db, leave_id, "Approved")
    if not leave:
        raise HTTPException(status_code=404, detail="Leave not found")
    return leave

@router.put("/{leave_id}/reject", response_model=LeaveResponse)
def reject_leave(leave_id: int, db: Session = Depends(get_db)):
    leave = leave_service.update_leave_status(db, leave_id, "Rejected")
    if not leave:
        raise HTTPException(status_code=404, detail="Leave not found")
    return leave

@router.delete("/{leave_id}", response_model=LeaveResponse)
def delete_leave(leave_id: int, db: Session = Depends(get_db)):
    leave = leave_service.delete_leave(db, leave_id)
    if not leave:
        raise HTTPException(status_code=404, detail="Leave not found")
    return leave

