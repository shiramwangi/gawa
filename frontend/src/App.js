import React from 'react';
import { motion } from 'framer-motion';
import './App.css';

// Navigation Component
const Navigation = () => (
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
const HeroSection = () => (
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
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
            Create account
          </button>
          <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
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
const FinalCTASection = () => (
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
        
        <button className="group border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300 hover:scale-105 transform">
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
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <TopRestaurantsSection />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}

export default App;
