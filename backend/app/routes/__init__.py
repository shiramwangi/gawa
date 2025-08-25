from fastapi import APIRouter
from . import auth, users, meals, orders, payments

# Create main router
router = APIRouter()

# Include all route modules
router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
router.include_router(users.router, prefix="/users", tags=["Users"])
router.include_router(meals.router, prefix="/meals", tags=["Meals"])
router.include_router(orders.router, prefix="/orders", tags=["Orders"])
router.include_router(payments.router, prefix="/payments", tags=["Payments"])
