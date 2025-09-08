from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from routes import auth, users, restaurants, meals, orders, payments, delivery
from database import Base, engine
from utils.settings import settings

app = FastAPI(title="Gawa API", version="1.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging (basic)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

# Register routes
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(restaurants.router, prefix="/restaurants", tags=["Restaurants"])
app.include_router(meals.router, prefix="/meals", tags=["Meals"])
app.include_router(orders.router, prefix="/orders", tags=["Orders"])
app.include_router(payments.router, prefix="/payments", tags=["Payments"])
app.include_router(delivery.router, prefix="/delivery", tags=["Delivery"])

@app.get("/")
def root():
    return {"message": "Welcome to Gawa API 🚀"}


# Tables are now managed via Alembic migrations.
