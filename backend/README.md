# Gawa Food Delivery Backend API

A FastAPI-based backend for the Gawa Food Delivery platform.

## Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── database.py            # Database configuration and session management
├── requirements.txt       # Python dependencies
├── models/               # SQLAlchemy database models
│   ├── user.py
│   ├── restaurant.py
│   ├── meal.py
│   ├── order.py
│   ├── payment.py
│   └── delivery.py
├── schemas/              # Pydantic models for request/response validation
│   ├── user.py
│   ├── restaurant.py
│   ├── meal.py
│   ├── order.py
│   ├── payment.py
│   └── delivery.py
├── services/             # Business logic layer
│   ├── auth_service.py
│   ├── order_service.py
│   ├── payment_service.py
│   └── delivery_service.py
├── routes/               # API route handlers
│   ├── auth.py
│   ├── users.py
│   ├── restaurants.py
│   ├── meals.py
│   ├── orders.py
│   ├── payments.py
│   └── delivery.py
└── utils/                # Utility functions
    └── security.py
```

## Features

- **User Management**: Registration, authentication, and profile management
- **Restaurant Management**: Restaurant owners can manage their restaurants and meals
- **Order Management**: Complete order lifecycle from creation to delivery
- **Payment Integration**: M-Pesa STK push integration (ready for implementation)
- **Delivery Tracking**: Delivery person assignment and status tracking
- **JWT Authentication**: Secure API access with JWT tokens

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Variables**:
   Create a `.env` file with:
   ```
   DATABASE_URL=sqlite:///./gawa.db
   SECRET_KEY=your-super-secret-key-change-this-in-production
   ```

3. **Run the Application**:
   ```bash
   python main.py
   ```
   
   Or with uvicorn:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **API Documentation**:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/` - Get all users (admin)
- `GET /api/users/{user_id}` - Get user by ID
- `PUT /api/users/{user_id}` - Update user
- `DELETE /api/users/{user_id}` - Delete user (admin)

### Restaurants
- `GET /api/restaurants/` - Get all restaurants
- `GET /api/restaurants/{restaurant_id}` - Get restaurant by ID
- `POST /api/restaurants/` - Create restaurant (restaurant owner)
- `PUT /api/restaurants/{restaurant_id}` - Update restaurant
- `DELETE /api/restaurants/{restaurant_id}` - Delete restaurant

### Meals
- `GET /api/meals/` - Get all meals
- `GET /api/meals/{meal_id}` - Get meal by ID
- `POST /api/meals/` - Create meal (restaurant owner)
- `PUT /api/meals/{meal_id}` - Update meal
- `DELETE /api/meals/{meal_id}` - Delete meal

### Orders
- `POST /api/orders/` - Create new order
- `GET /api/orders/` - Get user's orders
- `GET /api/orders/{order_id}` - Get order by ID
- `PUT /api/orders/{order_id}` - Update order status
- `DELETE /api/orders/{order_id}` - Cancel order

### Payments
- `POST /api/payments/` - Create payment
- `GET /api/payments/{payment_id}` - Get payment by ID
- `POST /api/payments/stkpush` - Initiate M-Pesa STK push
- `POST /api/payments/callback` - M-Pesa callback handler
- `PUT /api/payments/{payment_id}` - Update payment

### Delivery
- `POST /api/delivery/` - Create delivery
- `GET /api/delivery/` - Get deliveries
- `GET /api/delivery/{delivery_id}` - Get delivery by ID
- `PUT /api/delivery/{delivery_id}/assign` - Assign delivery person
- `PUT /api/delivery/{delivery_id}/status` - Update delivery status

## Database Models

### User
- Customer, Restaurant Owner, or Delivery Person
- Authentication and profile information

### Restaurant
- Restaurant details, owner relationship
- Delivery fees and minimum orders

### Meal
- Menu items with pricing and availability
- Restaurant relationship

### Order
- Order details with items and status tracking
- Customer and restaurant relationships

### Payment
- Payment processing with M-Pesa integration
- Order relationship

### Delivery
- Delivery tracking and assignment
- Delivery person and order relationships

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS configuration for frontend integration

## Development

This backend is designed to work with Ismahan's frontend. The API follows RESTful conventions and includes comprehensive error handling and validation.
