from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from dependencies.database import Base

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    phone = Column(String(15), unique=True, nullable=False)
    password = Column(String(255), nullable=False)

    favorite_recipes = relationship("FavoriteRecipe", back_populates="user")
    feedbacks = relationship("RecipeFeedback", back_populates="user")