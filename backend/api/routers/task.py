from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
import api.schemas.task as task_schema
import api.cruds.task as task_crud
import api.model.task as task_model
from api.db import get_database

router = APIRouter()

@router.get("/")
async def select_days(db: AsyncSession = Depends(get_database)):
    days = await task_crud.get_all_days(db)
    return {"days": days}

@router.post("/create", response_model=task_schema.TaskCreateResponse)
async def create_task(
    task_body: task_schema.TaskCreate, db: AsyncSession = Depends(get_database) # 의존성 함수. 함수를 실행시키고 반환된 값을 가져옴.
):
    return await task_crud.create_task(db, task_body)

@router.get("/test")
async def test_day(day: int, filter: str, db: AsyncSession = Depends(get_database)):
    words = await task_crud.get_words(day, db)
    return words

@router.get("/answer")
async def compare_route(user_answer: List[task_schema.AnswerItem], db: AsyncSession = Depends(get_database)):
    task_crud.compare_databases(user_answer, db)
