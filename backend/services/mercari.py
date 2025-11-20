from mercapi import Mercapi
from mercapi.models import SearchResults
from models import SearchResult
from typing import List
import traceback
import asyncio

async def search_mercari(query: str) -> List[SearchResult]:
    try:
        m = Mercapi()
        print(f"Searching Mercari for: {query}")
        
        # Add timeout to prevent hanging
        try:
            results = await asyncio.wait_for(m.search(query), timeout=10.0)
            print(f"Got results: {results}")
        except asyncio.TimeoutError:
            print("Mercari search timed out")
            raise Exception("Search timed out")
        
        output = []
        if hasattr(results, 'items'):
            for item in results.items:
                try:
                    output.append(SearchResult(
                        id=str(item.id_),
                        title=item.name,
                        price=item.price,
                        image_url=item.thumbnails[0] if item.thumbnails else "",
                        item_url=f"https://jp.mercari.com/item/{item.id_}",
                        source="Mercari",
                        status=item.status
                    ))
                except Exception as e:
                    print(f"Error parsing item {item.id_}: {e}")
                    continue
        else:
            print(f"Unexpected results format: {results}")
            
        return output
    except Exception as e:
        print(f"Error in search_mercari: {e}")
        traceback.print_exc()
        
        # Fallback mock data for debugging/reliability
        print("Returning mock data due to error")
        return [
            SearchResult(
                id="mock1",
                title=f"Mock Result: {query} (Backend Error)",
                price=10000,
                image_url="",
                item_url="https://jp.mercari.com",
                source="System",
                status="Error Fallback"
            )
        ]
