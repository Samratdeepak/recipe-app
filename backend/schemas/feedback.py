from pydantic import BaseModel, conint

class RecipeFeedbackRequest(BaseModel):
    user_id: int
    recipe_id: int
    rating: conint(ge=1, le=5)  # Rating between 1 and 5
    comment: str

class FeedbackResponse(BaseModel):
    username: str
    recipe_name: str
    recipe_image: str
    rating: int
    comment: str