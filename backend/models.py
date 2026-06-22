from sqlalchemy import Column, Integer, String, Boolean, DateTime
from db import Base

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key= True)
    title = Column(String(255), nullable= False)
    deadline = Column(DateTime, nullable= True)
    completed = Column(Boolean, default= False, nullable= False)