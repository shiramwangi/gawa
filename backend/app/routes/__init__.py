from fastapi import APIRouter
from . import auth, meals, orders

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["Auth"])
router.include_router(meals.router, prefix="/meals", tags=["Meals"])
router.include_router(orders.router, prefix="/orders", tags=["Orders"])
