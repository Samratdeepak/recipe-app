from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from dependencies.database import Base

class RecipeFeedback(Base):
    __tablename__ = "recipe_feedback"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    recipe_id = Column(Integer, nullable=False)
    rating = Column(Integer, nullable=False)  # 1 to 5 rating
    comment = Column(Text, nullable=False)

    user = relationship("User", back_populates="feedbacks")