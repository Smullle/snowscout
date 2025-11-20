from mercapi import Mercapi
from mercapi.models import SearchResults
from models import SearchResult
from typing import List

async def search_mercari(query: str) -> List[SearchResult]:
    m = Mercapi()
    # Note: mercapi might be synchronous, if so we might need to run it in a threadpool or just use it directly if fast enough.
    # For now assuming we can just call it.
    
    # Basic search
    results = await m.search(query) 
    # Check if results is a list or an object with items
    # Adjust based on actual library usage. 
    # Based on docs, m.search returns a SearchResults object which is iterable or has items.
    
    output = []
    for item in results.items:
        output.append(SearchResult(
            id=str(item.id_),
            title=item.name,
            price=item.price,
            image_url=item.thumbnails[0] if item.thumbnails else "",
            item_url=f"https://jp.mercari.com/item/{item.id_}",
            source="Mercari",
            status=item.status
        ))
    return output
