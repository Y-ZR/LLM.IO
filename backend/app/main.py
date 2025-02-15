from fastapi import FastAPI
from app.routes.routes import router as conversation_router
from app.db import init_db

app = FastAPI()

app.include_router(conversation_router)


@app.on_event("startup")
async def on_startup():
    await init_db()


@app.get("/")
async def read_root():
    return {"message": "Greetings from /"}
