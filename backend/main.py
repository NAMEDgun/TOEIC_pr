# main.py (FastAPI 애플리케이션)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import task

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(task.router)
