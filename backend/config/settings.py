import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "38fbd608face41326ec160e316b0c8cb3b2cd42d4ad3b2852540c16cd7d493be")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
TOKEN_EXPIRE_HOURS = int(os.getenv("TOKEN_EXPIRE_HOURS", 1))
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY", "4ab74daf499747d6b74b515901e5ecfe")