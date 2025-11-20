import re
import json
import os

# Configuration
INPUT_FILES = [
    {
        "path": "ski-snowboard-gear-guide.md",
        "output": "frontend/src/data/gearGuideData.js",
        "variable": "gearCategories"
    },
    {
        "path": "ski-snowboard-gear-guide-japan.md",
        "output": "frontend/src/data/gearGuideDataJapan.js",
        "variable": "gearCategoriesJapan"
    }
]

# Metadata mapping for categories
CATEGORY_METADATA = {
    "Helmets": {
        "id": "helmets",
        "sportCompatibility": ["Skiing", "Snowboarding"],
        "essentialFor": "Safety and head protection",
        "essentialRating": 10
    },
    "Goggles": {
        "id": "goggles",
        "sportCompatibility": ["Skiing", "Snowboarding"],
        "essentialFor": "Vision protection and clarity",
        "essentialRating": 10
    },
    "Ski Jackets": {
        "id": "ski-jackets",
        "sportCompatibility": ["Skiing"],
        "essentialFor": "Weather protection while skiing",
        "essentialRating": 9
    },
    "Snowboard Jackets": {
        "id": "snowboard-jackets",
        "sportCompatibility": ["Snowboarding"],
        "essentialFor": "Weather protection while snowboarding",
        "essentialRating": 9
    },
    "Ski Pants": {
        "id": "ski-pants",
        "sportCompatibility": ["Skiing"],
        "essentialFor": "Lower body weather protection",
        "essentialRating": 9
    },
    "Snowboard Pants": {
        "id": "snowboard-pants",
        "sportCompatibility": ["Snowboarding"],
        "essentialFor": "Lower body weather protection",
        "essentialRating": 9
    },
    "Skis": {
        "id": "skis",
        "sportCompatibility": ["Skiing"],
        "essentialFor": "Primary skiing equipment",
        "essentialRating": 10
    },
    "Snowboards": {
        "id": "snowboards",
        "sportCompatibility": ["Snowboarding"],
        "essentialFor": "Primary snowboarding equipment",
        "essentialRating": 10
    },
    "Ski Boots": {
        "id": "ski-boots",
        "sportCompatibility": ["Skiing"],
        "essentialFor": "Control and power transfer",
        "essentialRating": 10
    },
    "Snowboard Boots": {
        "id": "snowboard-boots",
        "sportCompatibility": ["Snowboarding"],
        "essentialFor": "Control and comfort",
        "essentialRating": 10
    },
    "Ski Bindings": {
        "id": "ski-bindings",
        "sportCompatibility": ["Skiing"],
        "essentialFor": "Boot-to-ski connection",
        "essentialRating": 10
    },
    "Snowboard Bindings": {
        "id": "snowboard-bindings",
        "sportCompatibility": ["Snowboarding"],
        "essentialFor": "Boot-to-board connection",
        "essentialRating": 10
    },
    "Gloves/Mittens": {
        "id": "gloves",
        "sportCompatibility": ["Skiing", "Snowboarding"],
        "essentialFor": "Hand warmth and protection",
        "essentialRating": 9
    },
    "Base Layers": {
        "id": "base-layers",
        "sportCompatibility": ["Skiing", "Snowboarding"],
        "essentialFor": "Moisture wicking and warmth",
        "essentialRating": 8
    },
    "Ski Poles": {
        "id": "ski-poles",
        "sportCompatibility": ["Skiing"],
        "essentialFor": "Balance and propulsion",
        "essentialRating": 8
    },
    "Neck Gaiters/Balaclavas": {
        "id": "neck-gaiter",
        "sportCompatibility": ["Skiing", "Snowboarding"],
        "essentialFor": "Face and neck protection",
        "essentialRating": 7
    },
    "Neck Gaiter/Balaclava": { # Handle variation in title
        "id": "neck-gaiter",
        "sportCompatibility": ["Skiing", "Snowboarding"],
        "essentialFor": "Face and neck protection",
        "essentialRating": 7
    },
    "Backpacks": {
        "id": "backpacks",
        "sportCompatibility": ["Skiing", "Snowboarding"],
        "essentialFor": "Carrying gear on the mountain",
        "essentialRating": 6
    },
    "Wrist Guards": {
        "id": "wrist-guards",
        "sportCompatibility": ["Snowboarding"],
        "essentialFor": "Wrist protection from falls",
        "essentialRating": 7
    },
    "Impact Shorts": {
        "id": "impact-shorts",
        "sportCompatibility": ["Snowboarding"],
        "essentialFor": "Hip and tailbone protection",
        "essentialRating": 6
    },
    "Avalanche Beacons": {
        "id": "avalanche-beacons",
        "sportCompatibility": ["Skiing", "Snowboarding"],
        "essentialFor": "Backcountry safety",
        "essentialRating": 10
    },
    "Mid Layers": {
        "id": "mid-layers",
        "sportCompatibility": ["Skiing", "Snowboarding"],
        "essentialFor": "Insulation and warmth",
        "essentialRating": 7
    }
}

def parse_markdown(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Split by category headers (## Header)
    sections = re.split(r'^##\s+(.+)$', content, flags=re.MULTILINE)
    
    categories = []
    
    # Skip the first chunk (header/intro)
    for i in range(1, len(sections), 2):
        category_name = sections[i].strip()
        # Remove parenthetical info like "(Skiing & Snowboarding)"
        clean_name = re.sub(r'\s*\(.*\)', '', category_name).strip()
        
        # Handle "HELMETS" vs "Helmets"
        clean_name_title = clean_name.title()
        if clean_name_title == "Neck Gaiter/Balaclava": # Normalize
             clean_name_title = "Neck Gaiters/Balaclavas"
        
        # Map to metadata key
        meta_key = clean_name
        if meta_key not in CATEGORY_METADATA:
             # Try title case
             meta_key = clean_name.title()
             if meta_key == "Neck Gaiter/Balaclava": meta_key = "Neck Gaiters/Balaclavas"

        if meta_key not in CATEGORY_METADATA:
            print(f"Warning: No metadata found for category '{category_name}' (key: {meta_key})")
            continue
            
        metadata = CATEGORY_METADATA[meta_key]
        category_data = {
            "id": metadata["id"],
            "name": clean_name,
            "sportCompatibility": metadata["sportCompatibility"],
            "essentialFor": metadata["essentialFor"],
            "essentialRating": metadata["essentialRating"],
            "priceRanges": {}
        }

        section_content = sections[i+1]
        
        # Parse price ranges
        # Look for ### Budget ($X-$Y) or | Budget ($X-$Y) ... |
        
        # Check if it's a table format (Japan guide) or list format (Global guide)
        is_table = '|' in section_content and '---' in section_content
        
        if is_table:
            parse_table_format(section_content, category_data)
        else:
            parse_list_format(section_content, category_data)
            
        categories.append(category_data)
        
    return categories

def parse_table_format(content, category_data):
    # Extract headers to identify columns and price ranges
    lines = content.strip().split('\n')
    header_line = None
    for line in lines:
        if line.strip().startswith('|') and 'Budget' in line:
            header_line = line
            break
    
    if not header_line:
        return

    # Parse headers: | Budget ($60-$100) | Mid-Range ($100-$180) | High-End ($180-$450+) |
    headers = [h.strip() for h in header_line.split('|') if h.strip()]
    
    ranges = {}
    range_keys = ['budget', 'midRange', 'highEnd']
    
    for idx, header in enumerate(headers):
        if idx >= len(range_keys): break
        
        # Extract price range string
        match = re.search(r'\((.*?)\)', header)
        price_range = match.group(1) if match else "Unknown"
        
        ranges[range_keys[idx]] = {
            "range": price_range,
            "items": []
        }

    # Parse rows
    start_parsing = False
    for line in lines:
        if line.strip().startswith('|') and '---' in line:
            start_parsing = True
            continue
        
        if not start_parsing: continue
        if not line.strip().startswith('|'): continue
        
        cols = [c.strip() for c in line.split('|') if c.strip() or c == '']
        # Filter out empty strings from split at ends
        cols = [c.strip() for c in line.split('|')[1:-1]]
        
        for idx, col in enumerate(cols):
            if not col: continue
            if idx >= len(range_keys): break
            
            # Japan guide format: "Item Name" (Price is usually not in the cell, or implied)
            # But wait, the Japan guide cells are just names? 
            # Let's check the file content again.
            # | Giro Ledge MIPS | ...
            # It seems the Japan guide cells are just names. 
            # Wait, looking at the file content...
            # | Giro Ledge MIPS            | Giro Ratio MIPS             | Smith Vantage MIPS           |
            # It doesn't have prices in the cells?
            # Ah, the global guide has "1. Item - $Price".
            # The Japan guide seems to lack prices in the cells in the table view I saw?
            # Let me re-read the Japan guide content carefully.
            # "7: | Budget ($60-$100)           | Mid-Range ($100-$180)       | High-End ($180-$450+)         |"
            # "9: | Giro Ledge MIPS            | Giro Ratio MIPS             | Smith Vantage MIPS           |"
            # Yes, it seems the Japan guide just lists names in the table.
            # I should probably check if there are prices. 
            # If not, I'll just use the name.
            
            item_name = col
            item_price = "See range" # Default if not found
            
            ranges[range_keys[idx]]["items"].append({
                "name": item_name,
                "price": item_price
            })

    category_data["priceRanges"] = ranges

def parse_list_format(content, category_data):
    # ### Budget ($60-$100)
    # 1. Item - $Price
    
    subsections = re.split(r'^###\s+(.+)$', content, flags=re.MULTILINE)
    
    range_map = {
        "Budget": "budget",
        "Mid-Range": "midRange",
        "High-End": "highEnd"
    }
    
    for i in range(1, len(subsections), 2):
        header = subsections[i].strip()
        # Extract name and range: "Budget ($60-$100)"
        match = re.search(r'^(.*?)\s*\((.*?)\)', header)
        if not match: continue
        
        range_name = match.group(1).strip()
        price_range = match.group(2).strip()
        
        key = range_map.get(range_name)
        if not key: continue
        
        items = []
        lines = subsections[i+1].strip().split('\n')
        for line in lines:
            # 1. Giro Ledge MIPS - $73
            item_match = re.match(r'^\d+\.\s+(.*?)\s+-\s+(.*)$', line.strip())
            if item_match:
                items.append({
                    "name": item_match.group(1).strip(),
                    "price": item_match.group(2).strip()
                })
            else:
                # Try without price separator if needed, or just take the whole line
                clean_line = re.sub(r'^\d+\.\s+', '', line.strip())
                if clean_line:
                    items.append({
                        "name": clean_line,
                        "price": "See range"
                    })

        category_data["priceRanges"][key] = {
            "range": price_range,
            "items": items
        }

def generate_js_file(data, output_path, variable_name):
    js_content = f"""// Structured gear guide data parsed from markdown
// Generated by scripts/update_gear_data.py

export const {variable_name} = {json.dumps(data, indent=4)};

// Helper function to filter categories by sport
export const filterBySport = (categories, sport) => {{
    if (sport === 'Both') return categories;
    return categories.filter(cat => cat.sportCompatibility.includes(sport));
}};

// Helper function to get items by price range
export const getItemsByPriceRange = (category, priceRange) => {{
    const rangeMap = {{
        'Budget': 'budget',
        'Mid-Range': 'midRange',
        'High-End': 'highEnd'
    }};
    return category.priceRanges[rangeMap[priceRange]] || null;
}};
"""
    with open(output_path, 'w') as f:
        f.write(js_content)
    print(f"Generated {output_path}")

def main():
    for config in INPUT_FILES:
        print(f"Processing {config['path']}...")
        if not os.path.exists(config['path']):
            print(f"Error: File {config['path']} not found.")
            continue
            
        data = parse_markdown(config['path'])
        generate_js_file(data, config['output'], config['variable'])

if __name__ == "__main__":
    main()
