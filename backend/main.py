from fastapi import FastAPI
from sqlalchemy import text
from db import engine
from routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get('/')
def root():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        return {"db_connected": result.scalar() == 1}