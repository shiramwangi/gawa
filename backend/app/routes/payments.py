# backend/payment.py

from typing import Dict

class PaymentService:
    def __init__(self, provider: str = "mock"):
        self.provider = provider

    def initialize_payment(self, user_id: int, amount: float, currency: str = "KES") -> Dict:
        """
        Start a new payment.
        Replace with real payment gateway API (e.g., Stripe, Mpesa).
        """
        return {
            "status": "success",
            "message": f"Payment initialized for user {user_id}",
            "amount": amount,
            "currency": currency,
            "transaction_id": "txn_123456"
        }

    def verify_payment(self, transaction_id: str) -> Dict:
        """
        Verify the status of a payment.
        """
        return {
            "status": "verified",
            "transaction_id": transaction_id
        }

    def handle_callback(self, data: Dict) -> Dict:
        """
        Handle asynchronous callbacks from the payment provider.
        """
        return {
            "status": "callback_received",
            "data": data
        }
