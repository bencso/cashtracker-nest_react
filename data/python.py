import json
import pandas as pd
from sqlalchemy import create_engine
from tqdm import tqdm

JSONL_FILE = "Open Food Facts Products.jsonl"
POSTGRES_URI = "postgresql://root:inu87IUB8nuinr9RO4@localhost:3307/fridzsi"
TABLE_NAME = "pantry"
BATCH_SIZE = 10000 

engine = create_engine(POSTGRES_URI)

FIELDS = [
    "product_name",
    "brands",
    "quantity",
    "categories",
    "serving_size",
    "energy_kcal_100g",
    "fat_100g",
    "saturated-fat_100g",
    "carbohydrates_100g",
    "sugars_100g",
    "fiber_100g",
    "proteins_100g",
    "salt_100g",
    "image_url",
    "ingredients_text",
]

batch = []
with open(JSONL_FILE, "r", encoding="utf-8") as f:
    for line in tqdm(f, desc="Importing JSONL"):
        doc = json.loads(line)
        if doc.get("product_name"):
            row = {
                "product_name": doc.get("product_name"),
                "brands": doc.get("brands"),
                "quantity": doc.get("quantity"),
                "categories": doc.get("categories"),
                "serving_size": doc.get("serving_size"),
                "energy_kcal_100g": doc.get("nutriments", {}).get("energy-kcal_100g"),
                "fat_100g": doc.get("nutriments", {}).get("fat_100g"),
                "saturated_fat_100g": doc.get("nutriments", {}).get(
                    "saturated-fat_100g"
                ),
                "carbohydrates_100g": doc.get("nutriments", {}).get(
                    "carbohydrates_100g"
                ),
                "sugars_100g": doc.get("nutriments", {}).get("sugars_100g"),
                "fiber_100g": doc.get("nutriments", {}).get("fiber_100g"),
                "proteins_100g": doc.get("nutriments", {}).get("proteins_100g"),
                "salt_100g": doc.get("nutriments", {}).get("salt_100g"),
                "image_url": doc.get("image_url"),
                "ingredients_text": doc.get("ingredients_text"),
            }
        for k, v in row.items():
            if v in ["", "unknown", None]:
                row[k] = None

        batch.append(row)

        if len(batch) >= BATCH_SIZE:
            pd.DataFrame(batch).to_sql(
                TABLE_NAME, engine, if_exists="append", index=False
            )
            batch = []

if batch:
    pd.DataFrame(batch).to_sql(TABLE_NAME, engine, if_exists="append", index=False)

print("Import complete!")
