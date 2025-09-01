# backend/delivery.py

from typing import Dict

class DeliveryService:
    def __init__(self, provider: str = "mock"):
        self.provider = provider

    def schedule_delivery(self, order_id: int, address: str) -> Dict:
        """
        Schedule a delivery for an order.
        Replace with a real delivery API (e.g., Sendy, Glovo).
        """
        return {
            "status": "scheduled",
            "order_id": order_id,
            "address": address,
            "tracking_id": "track_123456"
        }

    def track_delivery(self, tracking_id: str) -> Dict:
        """
        Track delivery status.
        """
        return {
            "status": "in_transit",
            "tracking_id": tracking_id,
            "eta": "2 hours"
        }

    def complete_delivery(self, tracking_id: str) -> Dict:
        """
        Mark a delivery as completed.
        """
        return {
            "status": "delivered",
            "tracking_id": tracking_id
        }
