from pydantic import BaseModel
from typing import List

class TaskBase(BaseModel):
    day: int = None
    eng: str = None
    kor: str = None
    
class TaskCreate(TaskBase):
    pass

class TaskCreateResponse(TaskCreate):
    id: int
    
    class Config:
        orm_mode = True
        
class AnswerItem(TaskBase):
    id: int
    pass