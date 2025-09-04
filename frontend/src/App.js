import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import CompleteProfilePage from './components/CompleteProfilePage';
import RestaurantsPage from './components/RestaurantsPage';
import FoodSharingPage from './components/FoodSharingPage';
import CarnivoreMenuPage from './components/CarnivoreMenuPage';
import JavaHouseMenuPage from './components/JavaHouseMenuPage';
import TamarindMenuPage from './components/TamarindMenuPage';
import ArtCafeMenuPage from './components/ArtCafeMenuPage';
import NyamaMamaMenuPage from './components/NyamaMamaMenuPage';
import KFCMenuPage from './components/KFCMenuPage';
import PizzaHutMenuPage from './components/PizzaHutMenuPage';
import BurgerKingMenuPage from './components/BurgerKingMenuPage';
import SubwayMenuPage from './components/SubwayMenuPage';
import DominosMenuPage from './components/DominosMenuPage';
import PizzaInnMenuPage from './components/PizzaInnMenuPage';
import ChickenInnMenuPage from './components/ChickenInnMenuPage';
import PapaJohnsMenuPage from './components/PapaJohnsMenuPage';

// Check if user is logged in
const isLoggedIn = () => {
  return localStorage.getItem('access_token') !== null;
};

// Navigation Component
const Navigation = ({ setCurrentPage }) => (
  <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-orange-600">Gawa</h1>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-semibold">
            Home
          </a>
          <a href="#explore" className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-semibold">
            Explore Foods
          </a>
          <button 
            onClick={() => setCurrentPage('restaurants')}
            className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-semibold"
          >
            Restaurants
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-orange-600 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="text-gray-700 hover:text-orange-600 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </button>
          <button 
            onClick={() => setCurrentPage('login')}
            className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300"
          >
            Log In
          </button>
          <button 
            onClick={() => setCurrentPage('signup')}
            className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-all duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </nav>
);

// Hero Section Component
const HeroSection = ({ setCurrentPage }) => (
  <section id="home" className="pt-20 pb-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          >
            Love Food? Share It with{' '}
            <span className="text-orange-600">Gawa!</span>
        </motion.h1>
        
          <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            Share your favorite meals from the best restaurants with friends and family. 
            Join Gawa's food sharing community and discover amazing dishes together!
          </motion.p>

          {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for food, restaurants to share..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-orange-500 focus:outline-none transition-all duration-300"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* Popular Searches */}
            <div className="flex flex-wrap gap-3 mt-4">
              {['Pizza', 'Burger', 'Chicken', 'Pasta', 'Salad', 'More'].map((item, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-all duration-300"
                >
                  {item}
                </button>
            ))}
          </div>
        </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative"
        >
          <img 
            src="/images/hero-section-image.jpg" 
            alt="Food sharing community" 
            className="w-full h-96 object-cover rounded-3xl shadow-2xl"
          />
          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Share & Connect</p>
                <p className="font-semibold text-gray-900">Join the community</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Special Offers Section
const SpecialOffersSection = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Share Amazing Food Deals with Friends on Gawa!
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Found a great deal at your favorite restaurant? Share it with the Gawa community! 
          Discover and share limited-time offers, discounts, and exclusive deals from restaurants near you.
        </p>
        <button className="mt-8 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-orange-500 hover:text-orange-600 transition-all duration-300">
          Share Deals
        </button>
              </div>
            </div>
  </section>
);

// Popular Foods Section
const PopularFoodsSection = () => (
  <section id="explore" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Foods to Share</h2>
        <p className="text-xl text-gray-600">Discover the most loved dishes that people love to share from top restaurants</p>
        </div>
        
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: 'Delicious Pizza', image: '/images/pizza.jpg', price: '$12.99' },
          { name: 'Juicy Burger', image: '/images/burger.jpg', price: '$8.99' },
          { name: 'Crispy Chicken', image: '/images/fried-chickenn.jpg', price: '$10.99' }
        ].map((food, index) => (
      <motion.div 
            key={index}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{food.name}</h3>
              <p className="text-gray-600 mb-4">Perfect for sharing with friends and family</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-orange-600">{food.price}</span>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300">
                  Share This
                </button>
          </div>
        </div>
      </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Top Restaurants Section
const TopRestaurantsSection = () => (
  <section id="restaurants" className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Restaurants to Share From</h2>
        <p className="text-xl text-gray-600">Share your favorite meals from the best restaurants in your area</p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { name: 'Pizza Hut', image: '/images/top-restaurants/pizza-hut.jpg', rating: '4.8' },
          { name: 'KFC', image: '/images/top-restaurants/KFC.jpeg', rating: '4.6' },
          { name: 'Burger King', image: '/images/top-restaurants/burger-king.jpeg', rating: '4.7' },
          { name: 'Subway', image: '/images/top-restaurants/subway.jpg', rating: '4.5' }
        ].map((restaurant, index) => (
      <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <img src={restaurant.image} alt={restaurant.name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{restaurant.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-gray-600">{restaurant.rating}</span>
                </div>
                <button className="text-orange-600 hover:text-orange-700 font-semibold">
                  Share Menu
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// 24/7 Service Section
const ServiceSection = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            Share Your Food Adventures 24/7 with Gawa!
        </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Whether it's breakfast, lunch, dinner, or late-night cravings, share your food discoveries 
            anytime with the Gawa community. Connect with food lovers and discover new favorites together!
          </p>
          <div className="flex space-x-4">
            <button className="px-8 py-4 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors duration-300">
              Start Sharing
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-orange-500 hover:text-orange-600 transition-all duration-300">
              Explore Community
            </button>
          </div>
      </div>
      
        <div className="relative">
          <div className="bg-orange-100 rounded-3xl p-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community First</h3>
              <p className="text-gray-600">Share, connect, and discover with food lovers!</p>
              </div>
            </div>
              </div>
            </div>
    </div>
  </section>
);

// CTA Section
const CTASection = ({ setCurrentPage }) => (
  <section className="py-16 bg-orange-600">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold text-white mb-6">
        Ready to Share Your Food Journey with Gawa?
      </h2>
      <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
        Join thousands of food lovers who share amazing meals and discover new restaurants together. 
        Sign up now and start sharing your favorite food experiences!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => setCurrentPage('signup')}
          className="px-8 py-4 bg-white text-orange-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
        >
          Join Community
        </button>
        <button 
          onClick={() => setCurrentPage('login')}
          className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300"
        >
          Sign In
        </button>
      </div>
    </div>
  </section>
);

// Landing Page Component
const LandingPage = ({ setCurrentPage }) => (
  <div className="min-h-screen bg-white">
    <Navigation setCurrentPage={setCurrentPage} />
    <HeroSection setCurrentPage={setCurrentPage} />
    <SpecialOffersSection />
    <PopularFoodsSection />
    <TopRestaurantsSection />
    <ServiceSection />
    <CTASection setCurrentPage={setCurrentPage} />
    </div>
);

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'signup':
        return <SignupPage setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'logout':
        return <LogoutPage setCurrentPage={setCurrentPage} />;
      case 'complete-profile':
        return <CompleteProfilePage setCurrentPage={setCurrentPage} />;
      case 'restaurants':
        return <RestaurantsPage 
          setCurrentPage={setCurrentPage} 
          setSelectedFood={setSelectedFood}
          setSelectedRestaurant={setSelectedRestaurant}
        />;
      case 'carnivore-menu':
        return <CarnivoreMenuPage 
          setCurrentPage={setCurrentPage} 
          setSelectedFood={setSelectedFood}
          setSelectedRestaurant={setSelectedRestaurant}
        />;
      case 'java-house-menu':
        return <JavaHouseMenuPage 
          setCurrentPage={setCurrentPage} 
          setSelectedFood={setSelectedFood}
          setSelectedRestaurant={setSelectedRestaurant}
        />;
      case 'tamarind-menu':
        return <TamarindMenuPage 
          setCurrentPage={setCurrentPage} 
          setSelectedFood={setSelectedFood}
          setSelectedRestaurant={setSelectedRestaurant}
        />;
      case 'artcafe-menu':
        return <ArtCafeMenuPage 
          setCurrentPage={setCurrentPage} 
          setSelectedFood={setSelectedFood}
          setSelectedRestaurant={setSelectedRestaurant}
        />;
      case 'nyama-mama-menu':
        return <NyamaMamaMenuPage 
          setCurrentPage={setCurrentPage} 
          setSelectedFood={setSelectedFood}
          setSelectedRestaurant={setSelectedRestaurant}
        />;
      case 'kfc-menu':
        return <KFCMenuPage 
          setCurrentPage={setCurrentPage} 
          setSelectedFood={setSelectedFood}
          setSelectedRestaurant={setSelectedRestaurant}
        />;
      case 'pizza-hut-menu':
        return <PizzaHutMenuPage 
          setCurrentPage={setCurrentPage} 
          setSelectedFood={setSelectedFood}
          setSelectedRestaurant={setSelectedRestaurant}
        />;
      case 'burger-king-menu':
        return <BurgerKingMenuPage 
          setCurrentPage={setCurrentPage} 
          setSelectedFood={setSelectedFood}
          setSelectedRestaurant={setSelectedRestaurant}
        />;
      case 'subway-menu':
        return <SubwayMenuPage 
          setCurrentPage={setCurrentPage} 
          setSelectedFood={setSelectedFood}
          setSelectedRestaurant={setSelectedRestaurant}
        />;
      case 'dominos-menu':
        return <DominosMenuPage 
          setCurrentPage={setCurrentPage} 
          setSelectedFood={setSelectedFood}
          setSelectedRestaurant={setSelectedRestaurant}
        />;
                    case 'pizza-inn-menu':
                return <PizzaInnMenuPage
                  setCurrentPage={setCurrentPage}
                  setSelectedFood={setSelectedFood}
                  setSelectedRestaurant={setSelectedRestaurant}
                />;
              case 'chicken-inn-menu':
                return <ChickenInnMenuPage
                  setCurrentPage={setCurrentPage}
                  setSelectedFood={setSelectedFood}
                  setSelectedRestaurant={setSelectedRestaurant}
                />;
              case 'papa-johns-menu':
                return <PapaJohnsMenuPage
                  setCurrentPage={setCurrentPage}
                  setSelectedFood={setSelectedFood}
                  setSelectedRestaurant={setSelectedRestaurant}
                />;
      case 'food-sharing':
        return <FoodSharingPage 
          setCurrentPage={setCurrentPage}
          selectedFood={selectedFood}
          selectedRestaurant={selectedRestaurant}
          onBack={() => setCurrentPage('restaurants')}
        />;
      default:
        return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
};

export default App;
