from fastapi import APIRouter
from . import auth, meals, orders, users, payments, delivery, reviews

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["Auth"])
router.include_router(meals.router, prefix="/meals", tags=["Meals"])
router.include_router(orders.router, prefix="/orders", tags=["Orders"])
router.include_router(users.router, prefix="/users", tags=["Users"])
router.include_router(payments.router, prefix="/payments", tags=["Payments"])
router.include_router(delivery.router, prefix="/delivery", tags=["Delivery"])
router.include_router(reviews.router, prefix="/reviews", tags=["Reviews"])
