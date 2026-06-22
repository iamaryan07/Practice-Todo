from fastapi import APIRouter, HTTPException
from datetime import datetime
from pydantic import BaseModel
from db import SessionLocal
from models import Todo

router = APIRouter()

class CreateTask(BaseModel):
    title: str
    deadline: datetime


class UpdateTask(BaseModel):
    title: str | None = None
    deadline: str | None = None
    completed: bool | None = None


@router.post('/')
def create_task(task: CreateTask):
    db = SessionLocal()

    try:
        todo = Todo(
            title= task.title,
            deadline= task.deadline
        )

        db.add(todo)
        db.commit()
        db.refresh(todo)

        return {
            "id": todo.id,
            "title": todo.title,
            "deadline": todo.deadline,
            "completed": todo.completed
        }
    
    finally:
        db.close()


@router.get('/')
def get_tasks():
    db = SessionLocal()

    try:
        todos = db.query(Todo).all()
        return todos
    
    finally:
        db.close()


@router.get('/{id}')
def get_task(id: int):
    db = SessionLocal()

    try:
        todo = db.query(Todo).filter(Todo.id == id).first()
        # todo = db.get(Todo, id)

        if not todo:
            raise HTTPException(status_code= 404, detail= "TASK NOT FOUND!")

        return todo
    
    finally:
        db.close()


@router.patch('/{id}')
def patch_task(id: int, task: UpdateTask):
    db = SessionLocal()

    try:
        todo = db.query(Todo).filter(Todo.id == id).first()
        # todo = db.get(Todo, id)

        if not todo:
            raise HTTPException(status_code= 404, detail= "TASK NOT FOUND!")
        
        if task.title is not None:
            todo.title = task.title

        if task.deadline is not None:
            todo.deadline = task.deadline

        if task.completed is not None:
            todo.completed = task.completed

        db.add(todo)
        db.commit()
        db.refresh(todo)     

        return todo
    
    finally:
        db.close()


@router.delete('/{id}')
def delete_task(id: int):
    db = SessionLocal()

    try:
        todo = db.get(Todo, id)

        if not todo:
            raise HTTPException(status_code= 404, detail= "TASK NOT FOUND!")
        
        db.delete(todo)

        db.commit()

        return {"message": "Task deleted successfully"}

    finally:
        db.close()