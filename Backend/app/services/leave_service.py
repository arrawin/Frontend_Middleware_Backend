from sqlalchemy.orm import Session
from app.model.leave import Leave

def create_leave(db: Session, leave_data):
    new_leave = Leave(**leave_data.dict())
    db.add(new_leave)
    db.commit()
    db.refresh(new_leave)
    return new_leave

def get_all_leaves(db: Session):
    return db.query(Leave).all()

def get_leave_by_id(db: Session, leave_id: int):
    return db.query(Leave).filter(Leave.id == leave_id).first()

def update_leave_status(db: Session, leave_id: int, status: str):
    leave = get_leave_by_id(db, leave_id)
    if not leave:
        return None
    leave.status = status
    db.commit()
    db.refresh(leave)
    return leave

def delete_leave(db: Session, leave_id: int):
    leave = get_leave_by_id(db, leave_id)
    if not leave:
        return None

    db.delete(leave)
    db.commit()
    return leave

