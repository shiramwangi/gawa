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

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import CompleteProfilePage from './components/CompleteProfilePage';

// Check if user is logged in
const isLoggedIn = () => {
  return localStorage.getItem('access_token') !== null;
};

// Navigation Component
const Navigation = ({ setCurrentPage }) => (
  <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-md shadow-sm z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> Gawa</h1>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-semibold hover:scale-105 transform relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#how-it-works" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-semibold hover:scale-105 transform relative group">
            How it Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#join-order" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-semibold hover:scale-105 transform relative group">
            Join Order
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-semibold hover:scale-105 transform relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCurrentPage('login')}
            className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-semibold"
          >
            Sign In
          </button>
          <button 
            onClick={() => setCurrentPage('signup')}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
          <button 
            onClick={() => setCurrentPage('logout')}
            className="text-gray-300 hover:text-red-400 transition-all duration-300 font-semibold border border-gray-600 px-4 py-2 rounded-lg hover:border-red-400"
          >
            Logout
          </button>
          {isLoggedIn() && (
            <button
              onClick={() => setCurrentPage('complete-profile')}
              className="text-gray-300 hover:text-blue-400 transition-all duration-300 font-semibold border border-gray-600 px-4 py-2 rounded-lg hover:border-blue-400"
            >
              Complete Profile
            </button>
          )}
        </div>
        <button className="md:hidden text-gray-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
);

// Hero Section Component
const HeroSection = ({ setCurrentPage }) => (
  <section id="home" className="relative pt-20 pb-16 min-h-screen flex items-center overflow-hidden">
    {/* Blurred Background Image */}
    <div className="absolute inset-0">
      <img 
        src="/images/hero-section-image.jpg" 
        alt="People collaborating and sharing food" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
    </div>
    
    {/* Content Overlay */}
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="text-center max-w-4xl mx-auto">
        
        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
        >
          The leading{' '}
          <span className="text-indigo-300">
            food-sharing platform
          </span>{' '}
          for group orders
        </motion.h1>
        
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <input 
              type="text" 
              placeholder="Search for restaurants or food..." 
              className="flex-1 px-6 py-4 text-gray-900 text-lg focus:outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold transition-colors duration-300">
              Search
            </button>
          </div>
        </motion.div>
        
        {/* Frequently Searched */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <p className="text-white/80 text-lg mb-4">Frequently searched:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['pizza', 'burgers', 'fried chicken', 'KFC'].map((term, index) => (
              <motion.button
                key={term}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                {term}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            onClick={() => setCurrentPage('signup')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Create account
          </button>
          <button 
            onClick={() => setCurrentPage('login')}
            className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Sign in
          </button>
        </motion.div>
      </div>
    </div>
  </section>
);

// How It Works Section Component
const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          How to{' '}
          <span className="text-indigo-600">
            Gawa
          </span>{' '}
          it
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Get your favorite food without the full price tag. It's simple, fun, and saves everyone money!
        </p>
      </div>
      
      {/* Step 1 - Text Left, Image Right */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-2 gap-16 items-center mb-20"
      >
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-gray-900">
            Browse Available Orders
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            See what group orders are available in your area. From pizza to fried chicken, there's always something delicious to join.
          </p>
        </div>
        
        <div className="relative">
          {/* Large Circular Image Container */}
          <div className="relative w-80 h-80 mx-auto">
            {/* Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-cyan-200 to-yellow-200 rounded-full p-2">
              <div className="w-full h-full bg-white rounded-full p-6 flex items-center justify-center">
                <img 
                  src="/images/fried-chickenn.jpg" 
                  alt="Fried chicken bucket" 
                  className="w-full h-full object-cover rounded-full shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Step 2 - Image Left, Text Right */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-2 gap-16 items-center mb-20"
      >
        <div className="relative order-2 lg:order-1">
          {/* Large Circular Image Container */}
          <div className="relative w-80 h-80 mx-auto">
            {/* Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-orange-200 to-yellow-200 rounded-full p-2">
              <div className="w-full h-full bg-white rounded-full p-6 flex items-center justify-center">
                <img 
                  src="/images/burger.jpg" 
                  alt="Delicious burger" 
                  className="w-full h-full object-cover rounded-full shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6 order-1 lg:order-2">
          <h3 className="text-3xl font-bold text-gray-900">
            Join the Order
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Pick your items from the group order and add them to your cart. The more people join, the bigger the discount!
          </p>
        </div>
      </motion.div>
      
      {/* Step 3 - Text Left, Image Right */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-2 gap-16 items-center"
      >
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-gray-900">
            Enjoy & Save
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Collect your food and enjoy great meals at better prices. Build community while saving money on your favorite foods!
          </p>
        </div>
        
        <div className="relative">
          {/* Large Circular Image Container */}
          <div className="relative w-80 h-80 mx-auto">
            {/* Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 rounded-full p-2">
              <div className="w-full h-full bg-white rounded-full p-6 flex items-center justify-center">
                <img 
                  src="/images/pizza.jpg" 
                  alt="Delicious pizza" 
                  className="w-full h-full object-cover rounded-full shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);



// Top Restaurants Section Component
const TopRestaurantsSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Don't buy it alone,{' '}
          <span className="text-indigo-600">
            Gawa it!
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join group orders from your favorite restaurants and save money together
        </p>
      </div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
      >
        {/* Restaurant 1 */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center group cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative mb-4"
          >
            <img 
              src="/images/top-restaurants/burger-king.jpeg" 
              alt="Burger King" 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto shadow-md group-hover:shadow-lg transition-all duration-200"
            />
          </motion.div>
          <h3 className="text-base font-medium text-gray-800">
            Burger King
          </h3>
        </motion.div>

        {/* Restaurant 2 */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center group cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative mb-3"
          >
            <img 
              src="/images/top-restaurants/chicken-innn.jpg" 
              alt="Chicken Inn" 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto shadow-md group-hover:shadow-lg transition-all duration-200"
            />
          </motion.div>
          <h3 className="text-base font-medium text-gray-800">
            Chicken Inn
          </h3>
        </motion.div>

        {/* Restaurant 3 */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center group cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative mb-3"
          >
            <img 
              src="/images/top-restaurants/KFC.jpeg" 
              alt="KFC" 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto shadow-md group-hover:shadow-lg transition-all duration-200"
            />
          </motion.div>
          <h3 className="text-base font-medium text-gray-800">
            KFC
          </h3>
        </motion.div>

        {/* Restaurant 4 */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center group cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative mb-3"
          >
            <img 
              src="/images/top-restaurants/papa-johns.jpeg" 
              alt="Papa John's" 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto shadow-md group-hover:shadow-lg transition-all duration-200"
            />
          </motion.div>
          <h3 className="text-base font-medium text-gray-800">
            Papa John's
          </h3>
        </motion.div>

        {/* Restaurant 5 */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center group cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative mb-3"
          >
            <img 
              src="/images/top-restaurants/pizza-hut.jpg" 
              alt="Pizza Hut" 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto shadow-md group-hover:shadow-lg transition-all duration-200"
            />
          </motion.div>
          <h3 className="text-base font-medium text-gray-800">
            Pizza Hut
          </h3>
        </motion.div>

        {/* Restaurant 6 */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center group cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative mb-3"
          >
            <img 
              src="/images/top-restaurants/subway.jpg" 
              alt="Subway" 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto shadow-md group-hover:shadow-lg transition-all duration-200"
            />
          </motion.div>
          <h3 className="text-base font-medium text-gray-800">
            Subway
          </h3>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// Testimonials Section Component
const TestimonialsSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Hear why our community loves{' '}
          <span className="text-indigo-600">
            Gawa
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join thousands of happy users who are already saving money and making new friends through food sharing.
        </p>
      </div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3
            }
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {/* Testimonial 1 */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gray-700 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
        >
          <div className="flex items-center mb-6">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              src="/images/testimonials4.jpg" 
              alt="Happy user" 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover mr-4 transition-transform duration-300"
            />
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Sarah Johnson</h4>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-300 italic leading-relaxed text-sm sm:text-base">
            "Saved $15 on pizza last night! Love this app. Found a group order right in my neighborhood and made new friends too!"
          </p>
        </motion.div>

        {/* Testimonial 2 */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gray-700 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
        >
          <div className="flex items-center mb-6">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              src="/images/testimonials5.jpg" 
              alt="Group of friends" 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover mr-4 transition-transform duration-300"
            />
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">TechCorp Team</h4>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-300 italic leading-relaxed text-sm sm:text-base">
            "Perfect for office lunches! We order together every Friday and everyone gets exactly what they want. Great team building too!"
          </p>
        </motion.div>

        {/* Testimonial 3 */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gray-700 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
        >
          <div className="flex items-center mb-6">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              src="/images/testimonials6.jpg" 
              alt="Family" 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mr-4 transition-transform duration-300"
            />
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">The Martinez Family</h4>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-300 italic leading-relaxed text-sm sm:text-base">
            "Great way to try new restaurants without breaking the bank! Our kids love picking different dishes to share."
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// Final CTA Section Component
const FinalCTASection = ({ setCurrentPage }) => (
  <section id="join-order" className="py-20 bg-indigo-600">
    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-white mb-6">
        Turn expensive into{' '}
        <span className="text-indigo-200">
          affordable
        </span>{' '}
        with Gawa
      </h2>
      <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
        Join thousands of users already splitting orders and saving money. 
        Get the app now or join an order immediately!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        
        <button 
          onClick={() => setCurrentPage('signup')}
          className="group border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300 hover:scale-105 transform"
        >
          Join Us Now
          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </div>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-black text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-indigo-600"> Gawa</h3>
          <p className="text-gray-300 leading-relaxed">
            Making food sharing easy, affordable, and fun. Join our community and start saving today!
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">About Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">Careers</a></li>
            <li><a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">Press</a></li>
            <li><a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">Contact Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">FAQ</a></li>
            <li><a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">Community</a></li>
          </ul>
        </div>

        {/* Social & Legal */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Connect</h4>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.032-3.047-1.032 0-1.21.793-1.21 2.049v5.567H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-12 pt-8 text-center">
        <p className="text-gray-400">
          © 2024 Gawa. All rights reserved. Making food sharing affordable and fun.
        </p>
      </div>
    </div>
  </footer>
);

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
      default:
        return (
          <>
            <HeroSection setCurrentPage={setCurrentPage} />
            <HowItWorksSection />
            <TopRestaurantsSection />
            <TestimonialsSection />
            <FinalCTASection setCurrentPage={setCurrentPage} />
          </>
        );
    }
  };

  return (
    <div className="App">
      <Navigation setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
