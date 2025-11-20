from mercapi import Mercapi
from mercapi.models import SearchResults
from models import SearchResult
from typing import List
import asyncio

async def search_mercari(query: str) -> List[SearchResult]:
    m = Mercapi()
    
    # mercapi.search() is synchronous, so we run it in a thread pool to avoid blocking
    def sync_search():
        return m.search(query)
    
    # Run the synchronous search in a thread pool
    results = await asyncio.to_thread(sync_search)
    
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
