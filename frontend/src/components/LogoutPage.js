<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { logoutUser } from '../api/auth';

const LogoutPage = ({ setCurrentPage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Auto-logout after 3 seconds
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      await logoutUser();
      setMessage('Logged out successfully! Redirecting...');
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        setCurrentPage('home');
      }, 2000);
    } catch (error) {
      setMessage('Logout failed, but you have been logged out locally.');
      
      // Redirect to home after 3 seconds even if logout fails
      setTimeout(() => {
        setCurrentPage('home');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualLogout = () => {
    handleLogout();
  };

  const handleCancel = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
>>>>>>> 4acd67930180ed404fd2f3a99f94eae06df46c3a
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => setCurrentPage('home')}
<<<<<<< HEAD
          className="absolute top-8 left-8 text-gray-400 hover:text-orange-500 transition-colors duration-300 flex items-center space-x-2"
=======
          className="absolute top-8 left-8 text-gray-600 hover:text-orange-600 transition-colors duration-300 flex items-center space-x-2 backdrop-blur-sm bg-white/30 rounded-lg px-3 py-2"
>>>>>>> 4acd67930180ed404fd2f3a99f94eae06df46c3a
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
<<<<<<< HEAD
          <span>Back</span>
=======
          <span>Back to Home</span>
>>>>>>> 4acd67930180ed404fd2f3a99f94eae06df46c3a
        </motion.button>

        {/* Logout Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
<<<<<<< HEAD
          className="bg-gray-800 rounded-3xl p-8 shadow-2xl text-center"
        >
          {/* Header */}
=======
          className="bg-white rounded-2xl shadow-2xl p-8 text-center"
        >
          {/* Logo and Header */}
>>>>>>> 4acd67930180ed404fd2f3a99f94eae06df46c3a
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
<<<<<<< HEAD
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
=======
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚪</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              Gawa
            </h1>
            <p className="text-gray-600 text-lg">Logging you out</p>
          </motion.div>

          {/* Logout Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
          </motion.div>

          {/* Logout Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to Leave?</h2>
            <p className="text-gray-600">
              {message || `You will be automatically logged out in ${countdown} seconds...`}
            </p>
          </motion.div>

          {/* Loading Spinner */}
          {!message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto"></div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-4"
          >
            {!message ? (
              <>
                <button
                  onClick={handleManualLogout}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging Out...</span>
                    </div>
                  ) : (
                    'Logout Now'
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                >
                  Cancel
                </button>
              </>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => setCurrentPage('home')}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
                >
                  Go to Home
                </button>
                <button
                  onClick={() => setCurrentPage('login')}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                >
                  Login Again
                </button>
              </div>
            )}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-500 text-sm">
              Thanks for using Gawa! 👋
            </p>
          </motion.div>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          Your session will be securely terminated
        </motion.p>
>>>>>>> 4acd67930180ed404fd2f3a99f94eae06df46c3a
      </div>
    </div>
  );
};

export default LogoutPage;
