from sqlalchemy import select
from fastapi import Depends
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession
import pandas as pd

import api.model.task as task_model
import api.schemas.task as task_schema
from api.db import get_database


async def create_task(
    db: AsyncSession, task_create: task_schema.TaskCreate) -> task_model.Task:
    task = task_model.Task(**task_create.dict())
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task

async def get_words(filter: int):
    db: AsyncSession = Depends(get_database)
    result = await db.execute(select(task_model.Task).filter(task_model.Task.day == filter))
    items = result.scalars().all()
    return items

async def compare_databases(input_db: pd.DataFrame, original_db: pd.DataFrame):
    non_matching_rows = []
    matching_count = 0

    for index, (input_row, original_row) in enumerate(zip(input_db['eng'], original_db['eng'])):
        if input_row == original_row:
            matching_count += 1
        else:
            non_matching_rows.append((index, original_row))

    return non_matching_rows, matching_count

