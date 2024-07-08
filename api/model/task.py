from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from api.db import Base


class Task(Base):
    __tablename__ = "hackers"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(Integer)
    eng = Column(String)
    kor = Column(String)

