from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

LOCAL_MYSQL_USER = "root"  # or your MySQL user
LOCAL_MYSQL_PASSWORD = "tiger"  # change to your MySQL root password
LOCAL_MYSQL_DB = "recipe"

DATABASE_URL = f"mysql+pymysql://{LOCAL_MYSQL_USER}:{LOCAL_MYSQL_PASSWORD}@localhost:3306/{LOCAL_MYSQL_DB}"
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()