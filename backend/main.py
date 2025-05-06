from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import users, recipes, feedback

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this for production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router)
app.include_router(recipes.router)
app.include_router(feedback.router)