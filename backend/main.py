from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from typing import List, Optional
import os
from dotenv import load_dotenv
from models import UserInventory, SearchResult, Recommendation
from services.mercari import search_mercari
from services.recommendations import get_recommendations

# Load environment variables
load_dotenv()

app = FastAPI(title="Ski Gear Shopping API")

# Configure CORS
raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000")
allowed_origins = [origin.strip() for origin in raw_origins.split(",")]
print(f"Allowed Origins: {allowed_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def catch_exceptions_middleware(request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        print(f"Unhandled exception: {e}")
        import traceback
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})

@app.get("/")
def read_root():
    return {"message": "Welcome to Ski Gear Shopping API"}

@app.post("/recommendations", response_model=List[Recommendation])
def get_gear_recommendations(inventory: UserInventory):
    return get_recommendations(inventory)

@app.get("/search", response_model=List[SearchResult])
async def search_gear(query: str):
    return await search_mercari(query)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
