import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const FoodSharingPage = ({ setCurrentPage, selectedFood, selectedRestaurant, onBack }) => {
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState('');
  const [totalParticipants, setTotalParticipants] = useState(1);
  const [costPerPerson, setCostPerPerson] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  const calculateCostPerPerson = useCallback(() => {
    if (selectedFood && totalParticipants > 0) {
      // Extract price from various formats safely
      let price = 0;
      const priceText = selectedFood.price;
      
      if (typeof priceText === 'string') {
        // Handle "KES X,XXX" format
        price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;
      } else if (typeof priceText === 'number') {
        // Handle direct number format
        price = priceText;
      } else if (priceText && typeof priceText === 'object') {
        // Handle object format if needed
        price = parseInt(priceText.value) || parseInt(priceText.amount) || 0;
      }
      
      // Ensure price is valid
      if (isNaN(price) || price <= 0) {
        price = 1000; // Default fallback price
      }
      
      const costPerPerson = Math.ceil(price / totalParticipants);
      setCostPerPerson(costPerPerson);
    }
  }, [selectedFood, totalParticipants]);

  useEffect(() => {
    if (selectedFood && selectedRestaurant) {
      // Initialize with current user as first participant
      setParticipants([{ name: 'You', isCurrentUser: true }]);
      calculateCostPerPerson();
    }
  }, [selectedFood, selectedRestaurant, calculateCostPerPerson]);

  const handleTotalParticipantsChange = (value) => {
    const newTotal = Math.max(1, value);
    setTotalParticipants(newTotal);
    
    // Adjust participants array
    if (newTotal > participants.length) {
      // Add new participants
      const newParticipants = [...participants];
      for (let i = participants.length; i < newTotal; i++) {
        newParticipants.push({ name: '', isCurrentUser: false });
      }
      setParticipants(newParticipants);
    } else if (newTotal < participants.length) {
      // Remove extra participants (keep current user)
      const currentUser = participants.find(p => p.isCurrentUser);
      const otherParticipants = participants
        .filter(p => !p.isCurrentUser)
        .slice(0, newTotal - 1);
      setParticipants([currentUser, ...otherParticipants]);
    }
    
    calculateCostPerPerson();
  };

  const handleParticipantNameChange = (index, name) => {
    const newParticipants = [...participants];
    newParticipants[index].name = name;
    setParticipants(newParticipants);
  };

  const addParticipant = () => {
    if (newParticipant.trim() && participants.length < 10) {
      setParticipants([...participants, { name: newParticipant.trim(), isCurrentUser: false }]);
      setNewParticipant('');
      setTotalParticipants(participants.length + 1);
    }
  };

  const removeParticipant = (index) => {
    if (participants[index].isCurrentUser) return; // Can't remove current user
    
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
    setTotalParticipants(newParticipants.length);
  };

  const handleProceedToPayment = () => {
    // Validate that all participants have names
    const hasEmptyNames = participants.some(p => !p.name.trim());
    if (hasEmptyNames) {
      alert('Please enter names for all participants');
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = () => {
    // Simulate payment processing
    alert(`Payment successful! Each person pays KES ${costPerPerson.toLocaleString()}`);
    setCurrentPage('restaurants');
  };

  if (!selectedFood || !selectedRestaurant) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No food item selected. Please go back to restaurants.</p>
          <button
            onClick={() => setCurrentPage('restaurants')}
            className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
          >
            Back to Restaurants
          </button>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Summary</h1>
              <p className="text-gray-600">Split the cost of {selectedFood.name}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedFood.name}</h3>
                <span className="text-2xl font-bold text-green-600">{selectedFood.price}</span>
              </div>
              <p className="text-gray-600 mb-4">{selectedFood.description}</p>
              <p className="text-sm text-gray-500">From {selectedRestaurant.name}</p>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-900">Cost Split</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Cost</p>
                  <p className="text-xl font-bold text-blue-600">{selectedFood.price}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Per Person</p>
                  <p className="text-xl font-bold text-green-600">KES {costPerPerson.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-900">Participants ({totalParticipants})</h3>
              <div className="space-y-2">
                {participants.map((participant, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">
                      {participant.name} {participant.isCurrentUser && '(You)'}
                    </span>
                    <span className="text-green-600 font-semibold">
                      KES {costPerPerson.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:border-gray-400 transition-colors duration-300"
              >
                Back to Edit
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
              >
                Pay KES {costPerPerson.toLocaleString()}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-green-600 transition-colors duration-300 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Share Food</h1>
            <div className="w-16"></div>
          </div>

          {/* Food Item Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{selectedFood.name}</h2>
              <span className="text-2xl font-bold text-green-600">{selectedFood.price}</span>
            </div>
            <p className="text-gray-600 mb-2">{selectedFood.description}</p>
            <p className="text-sm text-gray-500">From {selectedRestaurant.name}</p>
          </div>

          {/* Number of Participants */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              How many people are sharing this food?
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleTotalParticipantsChange(totalParticipants - 1)}
                disabled={totalParticipants <= 1}
                className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-3xl font-bold text-gray-900 min-w-[3rem] text-center">
                {totalParticipants}
              </span>
              <button
                onClick={() => handleTotalParticipantsChange(totalParticipants + 1)}
                disabled={totalParticipants >= 10}
                className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Each person will pay: <span className="font-semibold text-green-600">
                KES {costPerPerson.toLocaleString()}
              </span>
            </p>
          </div>

          {/* Participants List */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Participants</h3>
            <div className="space-y-3">
              {participants.map((participant, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={participant.name}
                      onChange={(e) => handleParticipantNameChange(index, e.target.value)}
                      placeholder={participant.isCurrentUser ? "Your name" : "Enter name"}
                      disabled={participant.isCurrentUser}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                    />
                  </div>
                  {!participant.isCurrentUser && (
                    <button
                      onClick={() => removeParticipant(index)}
                      className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add New Participant */}
          <div className="mb-8">
            <div className="flex space-x-3">
              <input
                type="text"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                placeholder="Add another person's name"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
              />
              <button
                onClick={addParticipant}
                disabled={!newParticipant.trim() || participants.length >= 10}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                Add
              </button>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceedToPayment}
            disabled={participants.some(p => !p.name.trim())}
            className="w-full bg-green-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            Proceed to Payment
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FoodSharingPage;
