import os

from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DATABASE_NAME = "onceuponme"

client = AsyncIOMotorClient(MONGO_URL)
db = client[DATABASE_NAME]


def get_reviews_collection():
    return db["reviews"]
