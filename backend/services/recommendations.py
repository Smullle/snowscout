from ddgs import DDGS
from ..models import Recommendation, UserInventory
from typing import List
import re

def _extract_rating(text: str) -> str:
    # Simple heuristic to find ratings like "4.5/5", "9/10", "5 stars"
    # Look for patterns like "X/Y" or "X stars"
    match = re.search(r"(\d+(\.\d+)?\s*/\s*10|\d+(\.\d+)?\s*/\s*5)", text)
    if match:
        return match.group(1)
    match = re.search(r"(\d+(\.\d+)?)\s+stars", text, re.IGNORECASE)
    if match:
        return f"{match.group(1)} stars"
    return "See review"

def get_recommendations(inventory: UserInventory) -> List[Recommendation]:
    recommendations = []
    try:
        ddgs = DDGS()
        
        # 1. General Recommendations based on Activity
        activities = []
        if inventory.activity == "Both":
            activities = ["Snowboarding", "Skiing"]
        else:
            activities = [inventory.activity]

        for activity in activities:
            # Search for top rated gear for the activity and skill level
            # We'll search for a general "best of" list
            price_term = ""
            if inventory.price_range and inventory.price_range != "Any":
                price_term = f" {inventory.price_range} budget"
            
            query = f"best {activity} gear 2025 for {inventory.skill_level}{price_term} reddit"
            try:
                results = list(ddgs.text(query, max_results=2))
                for r in results:
                    recommendations.append(Recommendation(
                        item_name=f"Top {activity} Gear ({inventory.skill_level})",
                        reason=f"Community recommendation for {inventory.skill_level} {activity}{' with ' + inventory.price_range + ' budget' if price_term else ''}.",
                        rating=None,
                        source_url=r['href'],
                        suggested_upgrade="Check this list for specific models"
                    ))
            except Exception as e:
                print(f"Error searching for {activity}: {e}")
                # Continue to next activity or item

        # 2. Analyze Existing Inventory
        for item in inventory.items:
            if not item.brand or not item.model:
                continue

            # Search for reviews of the specific item
            query = f"{item.brand} {item.model} {item.category} review rating"
            try:
                results = list(ddgs.text(query, max_results=1))
                
                if results:
                    r = results[0]
                    rating = _extract_rating(r['body'])
                    
                    # Search for a potential upgrade
                    upgrade_query = f"best {item.category} 2025 upgrade from {item.brand} {item.model}"
                    upgrade_results = list(ddgs.text(upgrade_query, max_results=1))
                    
                    suggested_upgrade = None
                    if upgrade_results:
                        suggested_upgrade = upgrade_results[0]['title']

                    recommendations.append(Recommendation(
                        item_name=f"{item.brand} {item.model}",
                        reason=f"Review found: {r['title']}",
                        rating=rating,
                        source_url=r['href'],
                        suggested_upgrade=suggested_upgrade
                    ))
            except Exception as e:
                print(f"Error analyzing item {item.name}: {e}")
                
    except Exception as e:
        print(f"Critical error in get_recommendations: {e}")
        import traceback
        traceback.print_exc()
        # Return a user-friendly error recommendation
        recommendations.append(Recommendation(
            item_name="Error fetching recommendations",
            reason=f"Something went wrong: {str(e)}",
            rating=None,
            source_url=None,
            suggested_upgrade="Please try again later."
        ))

    return recommendations
