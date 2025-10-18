from pymongo import MongoClient
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient("mongodb://localhost:27017/")
db = client["adatbazis"]
collection = db["gyujtemeny"]

conn = psycopg2.connect(
    f"dbname={os.getenv("DB_NAME")} user={os.getenv("DB_USERNAME")} password={os.getenv("DB_PASSWORD")} host={os.getenv("DB_HOST")}"
)
cur = conn.cursor()


fields = [
    "code",
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

batch_size = 1000
batch = []

# Elindítani mindig elsőnek a servicest a mongodbnek: brew services start mongodb/brew/mongodb-community@7.0
for doc in collection.find({}, {f: 1 for f in fields}):
    doc["saturated_fat_100g"] = doc.pop("saturated-fat_100g", None)
    values = [doc.get(f.replace("-", "_")) for f in fields]
    batch.append(values)

    if len(batch) >= batch_size:
        cur.executemany(
            """
            INSERT INTO products (
                code, product_name, brands, quantity, categories,
                serving_size, energy_kcal_100g, fat_100g, saturated_fat_100g,
                carbohydrates_100g, sugars_100g, fiber_100g, proteins_100g,
                salt_100g, image_url, ingredients_text
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
            batch,
        )
        conn.commit()
        batch = []

if batch:
    cur.executemany(
        """
        INSERT INTO products (
            code, product_name, brands, quantity, categories,
            serving_size, energy_kcal_100g, fat_100g, saturated_fat_100g,
            carbohydrates_100g, sugars_100g, fiber_100g, proteins_100g,
            salt_100g, image_url, ingredients_text
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """,
        batch,
    )
    conn.commit()

cur.close()
conn.close()
print("Feltöltés kész!")
# Leállítani a servicest a mongodbnek: brew services stop mongodb/brew/mongodb-community@7.0