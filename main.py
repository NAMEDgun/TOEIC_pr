from fastapi import FastAPI
from api.routers import task
import uvicorn

app = FastAPI()
app.include_router(task.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)