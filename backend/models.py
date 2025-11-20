from pydantic import BaseModel
from typing import List, Optional

class GearItem(BaseModel):
    name: str
    category: str  # e.g., "Snowboard", "Bindings", "Boots", "Helmet", "Goggles"
    brand: Optional[str] = None
    model: Optional[str] = None
    condition: Optional[str] = None # e.g., "New", "Used", "Good", "Fair"

class UserInventory(BaseModel):
    items: List[GearItem]
    skill_level: str # "Beginner", "Intermediate", "Advanced"
    activity: str # "Skiing", "Snowboarding", "Both"
    price_range: Optional[str] = "Any" # "Budget", "Mid-Range", "High-End", "Any"

class SearchResult(BaseModel):
    id: str
    title: str
    price: int
    image_url: str
    item_url: str
    source: str # "Mercari", "2ndStreet"
    status: str # "On Sale", "Sold Out"

class Recommendation(BaseModel):
    item_name: str
    reason: str
    rating: Optional[str] = None # Changed to string to accommodate "5/5", "90%", etc.
    source_url: Optional[str] = None
    suggested_upgrade: Optional[str] = None
