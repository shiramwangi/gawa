import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const LogoutPage = ({ setCurrentPage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = useCallback(() => {
    setIsLoading(true);
    
    // Simulate logout process
    setTimeout(() => {
      // Clear any stored data
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      
      setIsLoading(false);
      setCurrentPage('home');
    }, 1500);
  }, [setCurrentPage]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => setCurrentPage('home')}
          className="absolute top-8 left-8 text-gray-400 hover:text-orange-500 transition-colors duration-300 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </motion.button>

        {/* Logout Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 rounded-3xl p-8 shadow-2xl text-center"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Logout</h1>
            <p className="text-gray-400">Are you sure you want to logout from Gawa?</p>
          </motion.div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full bg-red-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-red-600 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-6"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging out...</span>
              </div>
            ) : (
              'Logout'
            )}
          </motion.button>

          {/* Cancel Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => setCurrentPage('home')}
            className="w-full bg-gray-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-700 transition-colors duration-300"
          >
            Cancel
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default LogoutPage;
