from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from dependencies.database import Base

class FavoriteRecipe(Base):
    __tablename__ = "favorite_recipes"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    recipe_id = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    image_url = Column(String(255), nullable=False)
    ingredients = Column(Text, nullable=False)
    nutrition = Column(Text, nullable=False)

    user = relationship("User", back_populates="favorite_recipes")