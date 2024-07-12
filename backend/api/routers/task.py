from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

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

@router.get("/test/{day}")
async def test_day(day: int, db: AsyncSession = Depends(get_database)):
    words = await task_crud.get_words(day, db)
    return words

# @router.get("/compare")
# async def compare_route(session: AsyncSession = Depends(get_session)):
#     # 두 테이블의 데이터를 가져옴
#     input_result = await session.execute(select(InputDB))
#     original_result = await session.execute(select(OriginalDB))
    
#     input_data = input_result.scalars().algitl()
#     original_data = original_result.scalars().all()

#     # 데이터프레임으로 변환
#     input_df = pd.DataFrame([{"eng": item.eng} for item in input_data])
#     original_df = pd.DataFrame([{"eng": item.eng} for item in original_data])

#     non_matching_rows, matching_count = await compare_databases(input_df, original_df)

#     return {
#         "non_matching_rows": non_matching_rows,
#         "matching_count": matching_count
#     }
