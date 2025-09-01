// Simple restaurant data service using mock data

// Get all restaurants in Nairobi
export const getRestaurantsInNairobi = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 1,
      name: "Carnivore Restaurant",
      location: "Langata Road, Nairobi",
      rating: 4.5,
      priceRange: "$$$",
      cuisine: "African, BBQ",
      image: "/images/restaurants/Tamarind-Restaurant.jpg", // Using available image
      openNow: true,
      userRatingsTotal: 1250,
      type: "local",
      deliveryAvailable: true,
      deliveryServices: ["Jumia Food", "Glovo"]
    },
    {
      id: 2,
      name: "Java House",
      location: "Westlands, Nairobi",
      rating: 4.3,
      priceRange: "$$",
      cuisine: "International, Coffee",
      image: "/images/restaurants/Subway-restaurant.jpg", // Using available image
      openNow: true,
      userRatingsTotal: 890,
      type: "local",
      deliveryAvailable: true,
      deliveryServices: ["Jumia Food", "Glovo"]
    },
    {
      id: 3,
      name: "Tamarind Restaurant",
      location: "Mombasa Road, Nairobi",
      rating: 4.7,
      priceRange: "$$$",
      cuisine: "Seafood, International",
      image: "/images/restaurants/Tamarind-Restaurant.jpg",
      openNow: true,
      userRatingsTotal: 567,
      type: "local",
      deliveryAvailable: true,
      deliveryServices: ["Jumia Food"]
    },
    {
      id: 4,
      name: "ArtCafe",
      location: "Multiple locations across Kenya",
      rating: 4.6,
      priceRange: "$$",
      cuisine: "International, Contemporary Dining",
      image: "/images/restaurants/Subway-restaurant.jpg", // Using available image
      openNow: true,
      userRatingsTotal: 1890,
      type: "local",
      deliveryAvailable: true,
      deliveryServices: ["Jumia Food", "Glovo", "Uber Eats"]
    },
    {
      id: 5,
      name: "Nyama Mama",
      location: "Kilimani, Nairobi",
      rating: 4.4,
      priceRange: "$$",
      cuisine: "African, Fusion",
      image: "/images/restaurants/Tamarind-Restaurant.jpg", // Using available image
      openNow: true,
      userRatingsTotal: 678,
      type: "local",
      deliveryAvailable: true,
      deliveryServices: ["Jumia Food", "Glovo"]
    },
    
    // International Chains in Nairobi - Using actual images
    {
      id: 6,
      name: "KFC",
      location: "Multiple locations in Nairobi",
      rating: 4.1,
      priceRange: "$$",
      cuisine: "Fast Food, Chicken",
      image: "/images/top-restaurants/KFC.jpeg",
      openNow: true,
      userRatingsTotal: 2340,
      type: "chain",
      deliveryAvailable: true,
      deliveryServices: ["Jumia Food", "Glovo"]
    },
    {
      id: 7,
      name: "Pizza Hut",
      location: "Westlands, CBD, Kilimani",
      rating: 4.3,
      priceRange: "$$",
      cuisine: "Pizza, Italian",
      image: "/images/top-restaurants/pizza-hut.jpg",
      openNow: true,
      userRatingsTotal: 1890,
      type: "chain",
      deliveryAvailable: true,
      deliveryServices: ["Jumia Food", "Glovo"]
    },
    {
      id: 8,
      name: "Burger King",
      location: "CBD, Westlands",
      rating: 4.0,
      priceRange: "$$",
      cuisine: "Fast Food, Burgers",
      image: "/images/top-restaurants/burger-king.jpeg",
      openNow: true,
      userRatingsTotal: 1560,
      type: "chain",
      deliveryAvailable: true,
      deliveryServices: ["Jumia Food"]
    },
    {
      id: 9,
      name: "Subway",
      location: "CBD, Westlands, Kilimani",
      rating: 4.2,
      priceRange: "$$",
      cuisine: "Sandwiches, Healthy",
      image: "/images/top-restaurants/subway.jpg",
      openNow: true,
      userRatingsTotal: 980,
      type: "chain",
      deliveryAvailable: true,
      deliveryServices: ["Jumia Food", "Glovo"]
    },
    {
      id: 10,
      name: "Domino's Pizza",
      location: "Westlands, CBD",
      rating: 4.4,
      priceRange: "$$",
      cuisine: "Pizza, Delivery",
      image: "/images/restaurants/Domino's Pizza restaurant.webp",
      openNow: true,
      userRatingsTotal: 2100,
      type: "chain",
      deliveryAvailable: true,
      deliveryServices: ["Own Delivery", "Jumia Food"]
    },
    {
      id: 11,
      name: "Pizza Inn",
      location: "Multiple locations in Nairobi",
      rating: 4.2,
      priceRange: "$$",
      cuisine: "Pizza, Fast Food",
      image: "/images/top-restaurants/pizza-inn.jpg",
      openNow: true,
      userRatingsTotal: 1650,
      type: "chain",
      deliveryAvailable: true,
      deliveryServices: ["Jumia Food", "Glovo"]
    },
    {
      id: 12,
      name: "Chicken Inn",
      location: "CBD, Westlands, Kilimani",
      rating: 4.1,
      priceRange: "$$",
      cuisine: "Fast Food, Chicken",
      image: "/images/top-restaurants/chicken-innn.jpg",
      openNow: true,
      userRatingsTotal: 1420,
      type: "chain",
      deliveryAvailable: true,
      deliveryServices: ["Jumia Food", "Glovo"]
    },
    {
      id: 13,
      name: "Papa John's",
      location: "Westlands, CBD",
      rating: 4.3,
      priceRange: "$$",
      cuisine: "Pizza, Italian",
      image: "/images/top-restaurants/papa-johns.jpeg",
      openNow: true,
      userRatingsTotal: 980,
      type: "chain",
      deliveryAvailable: true,
      deliveryServices: ["Jumia Food", "Glovo"]
    }
  ];
};

// Get restaurant menu and food items
export const getRestaurantMenu = async (restaurantId, restaurantName) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const mockMenus = {
    'Carnivore Restaurant': [
      { name: "Nyama Choma", price: "KES 2,500", description: "Grilled goat meat with ugali", category: "Main Course" },
      { name: "Beef Ribs", price: "KES 3,200", description: "Slow-cooked beef ribs", category: "Main Course" },
      { name: "Chicken Wings", price: "KES 1,800", description: "Spicy grilled wings", category: "Appetizer" },
      { name: "Ugali", price: "KES 300", description: "Traditional maize meal", category: "Side Dish" },
      { name: "Sukuma Wiki", price: "KES 250", description: "Collard greens", category: "Side Dish" }
    ],
    'Java House': [
      { name: "Chicken Burger", price: "KES 850", description: "Grilled chicken with fries", category: "Main Course" },
      { name: "Cappuccino", price: "KES 250", description: "Freshly brewed coffee", category: "Beverage" },
      { name: "Caesar Salad", price: "KES 650", description: "Fresh greens with dressing", category: "Salad" },
      { name: "Flat White", price: "KES 280", description: "Smooth coffee with milk", category: "Beverage" },
      { name: "Chicken Pasta", price: "KES 750", description: "Creamy pasta with chicken", category: "Main Course" }
    ],
    'Tamarind Restaurant': [
      { name: "Grilled Lobster", price: "KES 4,500", description: "Fresh lobster with garlic butter", category: "Seafood" },
      { name: "Fish Curry", price: "KES 2,800", description: "Spicy fish curry with rice", category: "Main Course" },
      { name: "Prawn Biryani", price: "KES 3,200", description: "Aromatic rice with prawns", category: "Main Course" },
      { name: "Coconut Rice", price: "KES 450", description: "Fragrant coconut rice", category: "Side Dish" },
      { name: "Mango Lassi", price: "KES 350", description: "Sweet mango yogurt drink", category: "Beverage" }
    ],
    'KFC': [
      { name: "Original Recipe Chicken", price: "KES 450", description: "2 pieces of fried chicken", category: "Main Course" },
      { name: "Zinger Burger", price: "KES 380", description: "Spicy chicken burger with fries", category: "Main Course" },
      { name: "Chicken Wings", price: "KES 320", description: "6 pieces of spicy wings", category: "Appetizer" },
      { name: "French Fries", price: "KES 180", description: "Crispy golden fries", category: "Side Dish" },
      { name: "Coca Cola", price: "KES 120", description: "500ml soft drink", category: "Beverage" }
    ],
    'Pizza Hut': [
      { name: "Margherita Pizza", price: "KES 850", description: "Classic tomato and mozzarella", category: "Pizza" },
      { name: "Pepperoni Pizza", price: "KES 950", description: "Spicy pepperoni with cheese", category: "Pizza" },
      { name: "Chicken Supreme", price: "KES 1100", description: "Chicken, mushrooms, peppers", category: "Pizza" },
      { name: "Garlic Bread", price: "KES 200", description: "Fresh baked garlic bread", category: "Side Dish" },
      { name: "Chocolate Fudge Cake", price: "KES 350", description: "Rich chocolate dessert", category: "Dessert" }
    ],
    'Pizza Inn': [
      { name: "Classic Margherita", price: "KES 750", description: "Traditional tomato and cheese pizza", category: "Pizza" },
      { name: "BBQ Chicken Pizza", price: "KES 950", description: "BBQ sauce with grilled chicken", category: "Pizza" },
      { name: "Veggie Supreme", price: "KES 800", description: "Fresh vegetables on pizza", category: "Pizza" },
      { name: "Chicken Wings", price: "KES 450", description: "Spicy fried chicken wings", category: "Appetizer" },
      { name: "French Fries", price: "KES 200", description: "Crispy golden fries", category: "Side Dish" }
    ],
    'Chicken Inn': [
      { name: "Fried Chicken Bucket", price: "KES 1,200", description: "8 pieces of crispy fried chicken", category: "Main Course" },
      { name: "Chicken Burger", price: "KES 350", description: "Grilled chicken burger with fries", category: "Main Course" },
      { name: "Chicken Wings", price: "KES 400", description: "6 pieces of spicy wings", category: "Appetizer" },
      { name: "Coleslaw", price: "KES 150", description: "Fresh cabbage salad", category: "Side Dish" },
      { name: "Soft Drink", price: "KES 120", description: "Choice of soft drinks", category: "Beverage" }
    ],
    'Subway': [
      { name: "Chicken Teriyaki Sub", price: "KES 450", description: "Grilled chicken with teriyaki sauce", category: "Sandwich" },
      { name: "Veggie Delite", price: "KES 380", description: "Fresh vegetables on whole wheat bread", category: "Sandwich" },
      { name: "Turkey Breast Sub", price: "KES 420", description: "Sliced turkey with your choice of toppings", category: "Sandwich" },
      { name: "Cookies", price: "KES 80", description: "Fresh baked cookies", category: "Dessert" },
      { name: "Chips", price: "KES 120", description: "Assorted potato chips", category: "Side Dish" }
    ],
    'Burger King': [
      { name: "Whopper Burger", price: "KES 550", description: "Flame-grilled beef burger with fresh vegetables", category: "Main Course" },
      { name: "Chicken Royale", price: "KES 480", description: "Crispy chicken burger with lettuce and mayo", category: "Main Course" },
      { name: "French Fries", price: "KES 200", description: "Golden crispy fries", category: "Side Dish" },
      { name: "Onion Rings", price: "KES 250", description: "Crispy battered onion rings", category: "Side Dish" },
      { name: "Soft Drink", price: "KES 150", description: "Choice of soft drinks", category: "Beverage" }
    ],
    'Domino\'s Pizza': [
      { name: "Margherita Pizza", price: "KES 800", description: "Classic tomato and mozzarella", category: "Pizza" },
      { name: "Pepperoni Pizza", price: "KES 900", description: "Spicy pepperoni with cheese", category: "Pizza" },
      { name: "Chicken Tikka Pizza", price: "KES 950", description: "Spicy chicken with onions and peppers", category: "Pizza" },
      { name: "Garlic Bread", price: "KES 180", description: "Fresh baked garlic bread", category: "Side Dish" },
      { name: "Chocolate Lava Cake", price: "KES 300", description: "Warm chocolate cake with molten center", category: "Dessert" }
    ],
    'Papa John\'s': [
      { name: "Original Crust Pizza", price: "KES 850", description: "Traditional hand-tossed pizza", category: "Pizza" },
      { name: "Thin Crust Pizza", price: "KES 800", description: "Crispy thin crust pizza", category: "Pizza" },
      { name: "BBQ Chicken Pizza", price: "KES 950", description: "BBQ sauce with grilled chicken", category: "Pizza" },
      { name: "Breadsticks", price: "KES 250", description: "Soft breadsticks with dipping sauce", category: "Side Dish" },
      { name: "Chocolate Chip Cookie", price: "KES 200", description: "Fresh baked chocolate chip cookie", category: "Dessert" }
    ]
  };
  
  // Return mock menu if available, otherwise generic menu
  if (mockMenus[restaurantName]) {
    return mockMenus[restaurantName];
  }
  
  // Generic menu for unknown restaurants
  return [
    { name: "Signature Dish", price: "KES 1,500", description: "Chef's special creation", category: "Main Course" },
    { name: "Local Special", price: "KES 1,200", description: "Traditional local cuisine", category: "Main Course" },
    { name: "Fresh Juice", price: "KES 300", description: "Seasonal fruit juice", category: "Beverage" }
  ];
};

// Export the API functions
const restaurantAPI = {
  getRestaurantsInNairobi,
  getRestaurantMenu
};

export default restaurantAPI;
