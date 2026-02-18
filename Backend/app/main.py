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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router.router)

@app.get("/")
def root():
    return {"message": "Leave Management API Running"}
