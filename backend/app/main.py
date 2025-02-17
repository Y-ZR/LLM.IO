from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.routes import router as conversation_router
from app.db import init_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(conversation_router)


@app.on_event("startup")
async def on_startup():
    await init_db()


@app.get("/")
async def read_root():
    return {"message": "Greetings from /"}