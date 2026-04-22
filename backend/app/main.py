from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import chat, health, widget

app = FastAPI(title="ChatBot Transport API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api/v1", tags=["health"])
app.include_router(widget.router, prefix="/api/v1", tags=["widget"])
app.include_router(chat.router, prefix="/api/v1", tags=["chat"])
