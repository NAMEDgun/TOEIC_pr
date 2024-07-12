from pydantic import BaseModel, Field

class TaskBase(BaseModel):
    day: int
    eng: str
    kor: str
    
class TaskCreate(TaskBase):
    pass

class TaskCreateResponse(TaskCreate):
    id: int
    
    class Config:
        orm_mode = True