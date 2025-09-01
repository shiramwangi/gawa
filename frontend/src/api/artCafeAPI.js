// Art Cafe API Service
class ArtCafeAPI {
  constructor() {
    this.baseURL = 'https://api.sampleapis.com';
    this.themealdbURL = 'https://www.themealdb.com/api/json/v1/1';
  }

  // Get real coffee menu from Sample APIs
  async getRealCoffeeMenu() {
    try {
      console.log('☕ Fetching real coffee data from Sample APIs...');
      const response = await fetch(`${this.baseURL}/coffee/hot`);
      
      if (!response.ok) {
        throw new Error(`Coffee API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Coffee API response:', data);
      
      if (!data || !Array.isArray(data)) {
        console.warn('⚠️ Coffee API returned invalid data structure');
        return null;
      }

      // Transform coffee data to menu items
      const transformedCoffee = data.map((coffee, index) => ({
        id: coffee.id || `coffee-${index}`,
        name: coffee.title,
        description: coffee.description,
        price: this.generateCoffeePrice(),
        category: 'Coffee',
        image: coffee.image,
        ingredients: coffee.ingredients || [],
        customization: this.getCoffeeCustomization(),
        isAvailable: true,
        preparationTime: '5-8 minutes',
        allergens: ['Milk', 'Nuts'],
        nutritionalInfo: {
          calories: Math.floor(Math.random() * 200) + 50,
          protein: Math.floor(Math.random() * 8) + 2,
          carbs: Math.floor(Math.random() * 30) + 10,
          fat: Math.floor(Math.random() * 15) + 5
        }
      }));

      return transformedCoffee;
    } catch (error) {
      console.error('❌ Error fetching real coffee data:', error);
      return null;
    }
  }

  // Get real dessert menu from TheMealDB
  async getRealDessertMenu() {
    try {
      console.log('🍰 Fetching real dessert data from TheMealDB...');
      const response = await fetch(`${this.themealdbURL}/filter.php?c=Dessert`);
      
      if (!response.ok) {
        throw new Error(`Dessert API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Dessert API response:', data);
      
      if (!data || !data.meals || !Array.isArray(data.meals)) {
        console.warn('⚠️ Dessert API returned invalid data structure');
        return null;
      }

      // Transform dessert data to menu items
      const transformedDesserts = data.meals.map((dessert, index) => ({
        id: dessert.idMeal || `dessert-${index}`,
        name: dessert.strMeal,
        description: `Delicious ${dessert.strMeal} - a perfect sweet treat to complement your coffee`,
        price: this.generateDessertPrice(),
        category: 'Desserts',
        image: dessert.strMealThumb,
        ingredients: [],
        customization: this.getDessertCustomization(),
        isAvailable: true,
        preparationTime: '10-15 minutes',
        allergens: ['Gluten', 'Dairy', 'Eggs'],
        nutritionalInfo: {
          calories: Math.floor(Math.random() * 300) + 150,
          protein: Math.floor(Math.random() * 10) + 3,
          carbs: Math.floor(Math.random() * 50) + 20,
          fat: Math.floor(Math.random() * 20) + 8
        }
      }));

      return transformedDesserts;
    } catch (error) {
      console.error('❌ Error fetching real dessert data:', error);
      return null;
    }
  }

  // Test API endpoints to verify they're working
  async testAPIEndpoints() {
    console.log('🧪 Testing Art Cafe API endpoints...');
    
    try {
      // Test coffee API
      const coffeeResponse = await fetch(`${this.baseURL}/coffee/hot`);
      console.log('☕ Coffee API status:', coffeeResponse.status);
      if (coffeeResponse.ok) {
        const coffeeData = await coffeeResponse.json();
        console.log('☕ Coffee API data sample:', coffeeData?.[0]);
      }
      
      // Test dessert API
      const dessertResponse = await fetch(`${this.themealdbURL}/filter.php?c=Dessert`);
      console.log('🍰 Dessert API status:', dessertResponse.status);
      if (dessertResponse.ok) {
        const dessertData = await dessertResponse.json();
        console.log('🍰 Dessert API data sample:', dessertData?.meals?.[0]);
      }
    } catch (error) {
      console.error('❌ API testing failed:', error);
    }
  }

  // Get full menu combining real APIs with mock data for other categories
  async getFullMenu() {
    try {
      console.log('🏪 Fetching Art Cafe full menu...');
      
      // Test APIs first
      await this.testAPIEndpoints();
      
      // Fetch real data from APIs
      const [coffeeData, dessertData] = await Promise.all([
        this.getRealCoffeeMenu(),
        this.getRealDessertMenu()
      ]);

      console.log('☕ Coffee data received:', coffeeData);
      console.log('🍰 Dessert data received:', dessertData);

      // Get mock data for other categories
      const mockSides = this.getMockSides();
      const mockBeverages = this.getMockBeverages();
      const mockBreakfast = this.getMockBreakfast();
      const mockLunch = this.getMockLunch();

      // Combine all data with validation
      const allMenuItems = [
        ...(coffeeData || []),
        ...(dessertData || []),
        ...mockSides,
        ...mockBeverages,
        ...mockBreakfast,
        ...mockLunch
      ];

      // Validate each menu item
      const validatedMenuItems = allMenuItems.filter(item => {
        if (!item || !item.name || !item.description) {
          console.warn('⚠️ Invalid menu item found:', item);
          return false;
        }
        return true;
      });

      console.log('✅ Validated menu items:', validatedMenuItems.length);
      console.log('✅ Sample validated item:', validatedMenuItems[0]);

      const menuData = {
        restaurant: {
          name: 'Art Cafe',
          location: 'Westlands, Nairobi',
          phone: '+254 20 123 4568',
          website: 'https://artcafe.co.ke',
          rating: 4.5,
          priceRange: '$$',
          cuisine: 'Coffee & International',
          hours: '7:00 AM - 10:00 PM',
          delivery: true,
          pickup: true,
          dineIn: true
        },
        menu: validatedMenuItems,
        categories: this.getCategories(validatedMenuItems),
        promotions: this.getPromotions(),
        deals: this.getDeals(),
        rewards: this.getRewards(),
        customization: this.getCustomization(),
        locations: this.getLocations()
      };

      console.log('✅ Art Cafe menu data prepared:', menuData);
      
      // Ensure we have at least some valid data
      if (validatedMenuItems.length === 0) {
        console.warn('⚠️ No valid menu items found, using mock data fallback');
        return this.getMockMenu();
      }
      
      return menuData;
    } catch (error) {
      console.error('❌ Error preparing Art Cafe menu:', error);
      // Return mock data as fallback
      return this.getMockMenu();
    }
  }

  // Helper methods for pricing
  generateCoffeePrice() {
    const basePrice = 180;
    const variation = Math.floor(Math.random() * 60) - 30;
    return Math.max(150, basePrice + variation);
  }

  generateDessertPrice() {
    const basePrice = 250;
    const variation = Math.floor(Math.random() * 80) - 40;
    return Math.max(200, basePrice + variation);
  }

  // Helper methods for customization
  getCoffeeCustomization() {
    return {
      available: true,
      options: {
        size: ['Small', 'Medium', 'Large'],
        milk: ['Full Cream', 'Skim', 'Almond', 'Soy', 'Oat'],
        sugar: ['None', 'Less', 'Normal', 'Extra'],
        extras: ['Extra Shot', 'Whipped Cream', 'Caramel', 'Vanilla']
      }
    };
  }

  getDessertCustomization() {
    return {
      available: true,
      options: {
        size: ['Regular', 'Large'],
        extras: ['Ice Cream', 'Whipped Cream', 'Nuts', 'Chocolate Sauce'],
        dietary: ['Gluten-Free', 'Dairy-Free', 'Vegan']
      }
    };
  }

  // Mock data for other categories
  getMockSides() {
    return [
      {
        id: 'side-1',
        name: 'Croissant',
        description: 'Buttery, flaky French croissant served warm',
        price: 120,
        category: 'Sides',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038802a?w=400',
        customization: { available: false },
        isAvailable: true,
        preparationTime: '2-3 minutes',
        allergens: ['Gluten', 'Dairy'],
        nutritionalInfo: { calories: 180, protein: 4, carbs: 20, fat: 10 }
      },
      {
        id: 'side-2',
        name: 'Muffin',
        description: 'Freshly baked muffin with your choice of flavor',
        price: 100,
        category: 'Sides',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
        customization: { available: false },
        isAvailable: true,
        preparationTime: '2-3 minutes',
        allergens: ['Gluten', 'Dairy', 'Eggs'],
        nutritionalInfo: { calories: 220, protein: 5, carbs: 28, fat: 12 }
      }
    ];
  }

  getMockBeverages() {
    return [
      {
        id: 'beverage-1',
        name: 'Fresh Orange Juice',
        description: '100% natural orange juice, freshly squeezed',
        price: 150,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
        customization: { available: false },
        isAvailable: true,
        preparationTime: '3-5 minutes',
        allergens: [],
        nutritionalInfo: { calories: 110, protein: 2, carbs: 26, fat: 0 }
      },
      {
        id: 'beverage-2',
        name: 'Iced Tea',
        description: 'Refreshing iced tea with lemon',
        price: 120,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
        customization: { available: false },
        isAvailable: true,
        preparationTime: '2-3 minutes',
        allergens: [],
        nutritionalInfo: { calories: 80, protein: 0, carbs: 20, fat: 0 }
      }
    ];
  }

  getMockBreakfast() {
    return [
      {
        id: 'breakfast-1',
        name: 'Full English Breakfast',
        description: 'Eggs, bacon, sausage, beans, mushrooms, and toast',
        price: 450,
        category: 'Breakfast',
        image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400',
        customization: { available: false },
        isAvailable: true,
        preparationTime: '15-20 minutes',
        allergens: ['Gluten', 'Dairy', 'Eggs'],
        nutritionalInfo: { calories: 650, protein: 25, carbs: 35, fat: 45 }
      }
    ];
  }

  getMockLunch() {
    return [
      {
        id: 'lunch-1',
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce, parmesan cheese, croutons with caesar dressing',
        price: 380,
        category: 'Lunch',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
        customization: { available: false },
        isAvailable: true,
        preparationTime: '8-12 minutes',
        allergens: ['Gluten', 'Dairy', 'Eggs'],
        nutritionalInfo: { calories: 320, protein: 18, carbs: 15, fat: 25 }
      }
    ];
  }

  // Helper methods for other data
  getCategories(allMenuItems) {
    const categories = ['all'];
    allMenuItems.forEach(item => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    });
    return categories;
  }

  getPromotions() {
    return [
      'Buy 2 coffees, get 1 free',
      '20% off all desserts after 8 PM',
      'Student discount: 15% off with valid ID'
    ];
  }

  getDeals() {
    return [
      'Happy Hour: 2-for-1 on all beverages (3-5 PM)',
      'Weekend Special: Free pastry with any coffee purchase',
      'Lunch Combo: Coffee + Sandwich + Dessert for KES 650'
    ];
  }

  getRewards() {
    return {
      program: 'Art Cafe Rewards',
      available: true,
      benefits: [
        'Earn 1 point per KES 10 spent',
        'Free coffee after 10 points',
        'Birthday month: 50% off any item',
        'Exclusive member-only promotions'
      ]
    };
  }

  getCustomization() {
    return {
      available: true,
      options: {
        coffee: ['Size', 'Milk type', 'Sugar level', 'Extra shots'],
        food: ['Portion size', 'Cooking preference', 'Sauce options'],
        dietary: ['Gluten-free', 'Dairy-free', 'Vegan', 'Halal']
      }
    };
  }

  getLocations() {
    return [
      'Westlands, Nairobi',
      'Kilimani, Nairobi',
      'Lavington, Nairobi',
      'Karen, Nairobi',
      'Mombasa Road, Nairobi'
    ];
  }

  // Fallback mock menu
  getMockMenu() {
    return {
      restaurant: {
        name: 'Art Cafe',
        location: 'Westlands, Nairobi',
        phone: '+254 20 123 4568',
        website: 'https://artcafe.co.ke',
        rating: 4.5,
        priceRange: '$$',
        cuisine: 'Coffee & International',
        hours: '7:00 AM - 10:00 PM',
        delivery: true,
        pickup: true,
        dineIn: true
      },
      menu: [
        {
          id: 'mock-1',
          name: 'Cappuccino',
          description: 'Classic Italian coffee with steamed milk foam',
          price: 180,
          category: 'Coffee',
          image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
          customization: { available: true },
          isAvailable: true,
          preparationTime: '5-8 minutes',
          allergens: ['Milk'],
          nutritionalInfo: { calories: 120, protein: 6, carbs: 12, fat: 6 }
        }
      ],
      categories: ['all', 'Coffee'],
      promotions: ['Buy 2 coffees, get 1 free'],
      deals: ['Happy Hour: 2-for-1 on all beverages (3-5 PM)'],
      rewards: { program: 'Art Cafe Rewards', available: true, benefits: ['Earn points on every purchase'] },
      customization: { available: true, options: { coffee: ['Size', 'Milk type'] } },
      locations: ['Westlands, Nairobi']
    };
  }
}

const artCafeAPI = new ArtCafeAPI();
export default artCafeAPI;
