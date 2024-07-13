from sqlalchemy import select, distinct, and_
from sqlalchemy.ext.asyncio import AsyncSession
import pandas as pd
import api.model.task as task_model
import api.schemas.task as task_schema


async def create_task(
    db: AsyncSession, task_create: task_schema.TaskCreate) -> task_model.Task:
    task = task_model.Task(**task_create.dict())
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task

async def get_all_days(db: AsyncSession):
    result = await db.execute(select(distinct(task_model.Task.day)))
    days = result.scalars().all()
    return days

async def get_words(day: int, db: AsyncSession):
    words = await db.execute(select(task_model.Task).filter(task_model.Task.day == day))
    items = words.scalars().all()
    return items

async def compare_databases(items_list: list, db: AsyncSession):
    results = []
    
    for item in items_list:
        if item.kor:
            query_filter = task_model.Task.kor
        elif item.eng:
            query_filter = task_model.Task.eng
        else:
            return {"error": "Invalid filter value"}
            
        query = select(task_model.Task).where(
            and_(
                task_model.Task.id == item.id,
                query_filter == item.kor if item.kor else item.eng
            )
        )
        
        answer = await db.execute(query)
        results.append(answer.scalars().all())

