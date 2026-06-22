from fastapi import FastAPI
from sqlalchemy import text
from db import engine
from routes import router

app = FastAPI()

app.include_router(router)

@app.get('/')
def root():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        return {"db_connected": result.scalar() == 1}