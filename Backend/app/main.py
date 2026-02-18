from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import router
from app.logging.logging import logging_middleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.middleware("http")(logging_middleware)

# CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router.router)

@app.get("/")
def root():
    return {"message": "Leave Management API Running"}
