<<<<<<< HEAD
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CompleteProfilePage = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
=======
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchCurrentUser, updateCurrentUser } from '../api';

const CompleteProfilePage = ({ setCurrentPage }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Fetch current user data
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchCurrentUser();
      
      if (data.user) {
        setUserData({
          firstName: data.user.firstName || '',
          lastName: data.user.lastName || '',
          email: data.user.email || '',
          phone: data.user.phone || '',
          address: data.user.address || '',
          city: data.user.city || '',
          postalCode: data.user.postalCode || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setMessage('Failed to load profile data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!userData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!userData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!userData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!userData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!userData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }

    // Ensure all error values are strings
    Object.keys(newErrors).forEach(key => {
      if (typeof newErrors[key] !== 'string') {
        newErrors[key] = String(newErrors[key]);
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
>>>>>>> 4acd67930180ed404fd2f3a99f94eae06df46c3a
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
<<<<<<< HEAD
    // Simple validation
    if (!formData.phone || !formData.address || !formData.city || !formData.zipCode) {
      setMessage('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Simulate API call - in real app, you'd call updateCurrentUser here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success - redirect to restaurants
      setMessage('Profile completed successfully! Redirecting to restaurants...');
      setTimeout(() => {
        setCurrentPage('restaurants');
      }, 2000);
      
=======
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      const data = await updateCurrentUser(userData);
      
      if (data.success || data.message) {
        setMessage('Profile updated successfully! Redirecting to home...');
        setTimeout(() => {
          setCurrentPage('home');
        }, 2000);
      } else {
        // Ensure data.detail is a string
        const errorMessage = data.detail 
          ? (typeof data.detail === 'string' ? data.detail : 'Failed to update profile. Please try again.')
          : 'Failed to update profile. Please try again.';
        setMessage(errorMessage);
      }
>>>>>>> 4acd67930180ed404fd2f3a99f94eae06df46c3a
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    } finally {
<<<<<<< HEAD
      setIsLoading(false);
=======
      setIsSaving(false);
>>>>>>> 4acd67930180ed404fd2f3a99f94eae06df46c3a
    }
  };

  // Ensure message is always a string
  const safeMessage = typeof message === 'string' ? message : 'An error occurred';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
<<<<<<< HEAD
          className="bg-gray-800 rounded-3xl p-8 shadow-2xl"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
            <p className="text-gray-400">Add your contact information to get started</p>
          </motion.div>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl text-center bg-green-900/20 text-green-400 border border-green-500/30"
            >
              {message}
            </motion.div>
          )}

          {/* Profile Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="New York"
                className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="10001"
                className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Completing Profile...</span>
                </div>
              ) : (
                'Complete Profile'
              )}
            </motion.button>
          </motion.form>

                     {/* Skip Link */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="mt-6 text-center"
           >
             <button
               onClick={() => setCurrentPage('restaurants')}
               className="text-gray-400 hover:text-orange-500 font-medium transition-colors duration-300"
             >
               Skip for now
             </button>
           </motion.div>
=======
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6 text-white text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-3xl">👤</span>
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
            <p className="text-orange-100">Help us deliver your orders perfectly!</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.firstName)}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.lastName)}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.email)}</p>
                  )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
                                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.phone)}</p>
                  )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your street address"
                />
                                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.address)}</p>
                  )}
              </div>

              {/* City and Postal Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={userData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your city"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.city)}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={userData.postalCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.postalCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter postal code"
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.postalCode)}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              {safeMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-center ${
                    safeMessage.includes('successfully') 
                      ? 'bg-green-100 text-green-700 border border-green-300' 
                      : 'bg-red-100 text-red-700 border border-red-300'
                  }`}
                >
                  {safeMessage}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSaving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white text-lg transition-all duration-200 ${
                  isSaving
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                }`}
              >
                {isSaving ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating Profile...
                  </span>
                ) : (
                  'Complete Profile'
                )}
              </motion.button>
            </form>

            {/* Navigation */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setCurrentPage('home')}
                className="text-gray-500 hover:text-orange-500 transition-colors duration-200"
              >
                ← Back to Home
              </button>
            </div>
          </div>
>>>>>>> 4acd67930180ed404fd2f3a99f94eae06df46c3a
        </motion.div>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
