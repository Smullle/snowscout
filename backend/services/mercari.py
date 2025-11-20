from mercapi import Mercapi
from mercapi.models import SearchResults
from models import SearchResult
from typing import List
import traceback

async def search_mercari(query: str) -> List[SearchResult]:
    try:
        m = Mercapi()
        print(f"Searching Mercari for: {query}")
        
        # mercapi is async, await it directly
        results = await m.search(query)
        print(f"Got results: {results}")
        
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
        return []
