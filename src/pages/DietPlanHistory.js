// src/pages/DietPlanHistory.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getDietPlanHistory } from '../api/backendApi';

const DietPlanHistory = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useContext(AuthContext);
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGoal, setFilterGoal] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // grid or detailed
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || !user) {
        navigate('/signin');
      } else {
        fetchHistory();
      }
    }
  }, [authLoading, isAuthenticated, user]);

  const fetchHistory = async () => {
    try {
      const res = await getDietPlanHistory(user.email);
      if (res.success && Array.isArray(res.history)) {
        setDietPlans(res.history);
      } else {
        setError(res.message || 'No plans found.');
      }
    } catch (e) {
      setError('Failed to load history.');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort plans
  const filteredPlans = dietPlans
    .filter(entry => {
      const matchesSearch = !searchTerm || 
        entry.plan?.clientInfo?.goal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(entry.createdAt).toLocaleDateString().includes(searchTerm);
      
      const matchesGoal = filterGoal === 'all' || 
        entry.plan?.clientInfo?.goal === filterGoal;
      
      return matchesSearch && matchesGoal;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'calories':
          return (b.plan?.nutritionTargets?.calories || 0) - (a.plan?.nutritionTargets?.calories || 0);
        default:
          return 0;
      }
    });

  const calculatePlanStats = (plan) => {
    if (!plan?.weeklyPlan) return { totalMeals: 0, avgCaloriesPerMeal: 0 };
    
    let totalMeals = 0;
    let totalCalories = 0;
    
    Object.values(plan.weeklyPlan).forEach(dayMeals => {
      if (Array.isArray(dayMeals)) {
        dayMeals.forEach(meal => {
          totalMeals++;
          totalCalories += meal.macros?.calories || 0;
        });
      }
    });
    
    return {
      totalMeals,
      avgCaloriesPerMeal: totalMeals > 0 ? Math.round(totalCalories / totalMeals) : 0
    };
  };

  const renderPlanCard = (entry, idx) => {
    const plan = entry.plan || {};
    const stats = calculatePlanStats(plan);
    
    return (
      <div 
        key={idx} 
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        onClick={() => setSelectedPlan(entry)}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {plan.clientInfo?.goal?.charAt(0).toUpperCase() + plan.clientInfo?.goal?.slice(1) || 'Diet Plan'}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(entry.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-600">
              {plan.nutritionTargets?.calories || 0}
            </p>
            <p className="text-xs text-gray-500">calories/day</p>
          </div>
        </div>

        {/* Nutrition Overview */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Protein</p>
            <p className="font-semibold text-green-600">{plan.nutritionTargets?.protein || '0g'}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Carbs</p>
            <p className="font-semibold text-orange-600">{plan.nutritionTargets?.carbs || '0g'}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Fats</p>
            <p className="font-semibold text-blue-600">{plan.nutritionTargets?.fats || '0g'}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <span>📅 7-day plan</span>
          <span>🍽️ {stats.totalMeals} meals</span>
          <span>⚡ {stats.avgCaloriesPerMeal} cal/meal</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {plan.clientInfo?.goal && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
              {plan.clientInfo.goal}
            </span>
          )}
          {plan.clientInfo?.activityLevel && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {plan.clientInfo.activityLevel}
            </span>
          )}
          {plan.personalizedInsights?.metabolicType && (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              {plan.personalizedInsights.metabolicType}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
          View Full Plan
        </button>
      </div>
    );
  };

  const renderDetailedPlan = (entry) => {
    const plan = entry.plan;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Diet Plan Details - {new Date(entry.createdAt).toLocaleDateString()}
            </h2>
            <button 
              onClick={() => setSelectedPlan(null)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Nutrition Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-4 rounded-xl text-white text-center">
                <h3 className="text-lg font-semibold opacity-90">Calories</h3>
                <p className="text-2xl font-bold">{plan.nutritionTargets?.calories || 0}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-700 p-4 rounded-xl text-white text-center">
                <h3 className="text-lg font-semibold opacity-90">Protein</h3>
                <p className="text-2xl font-bold">{plan.nutritionTargets?.protein || '0g'}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-4 rounded-xl text-white text-center">
                <h3 className="text-lg font-semibold opacity-90">Carbs</h3>
                <p className="text-2xl font-bold">{plan.nutritionTargets?.carbs || '0g'}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-xl text-white text-center">
                <h3 className="text-lg font-semibold opacity-90">Fats</h3>
                <p className="text-2xl font-bold">{plan.nutritionTargets?.fats || '0g'}</p>
              </div>
            </div>

            {/* Personalized Insights */}
            {plan.personalizedInsights && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-700">🎯 Personalized Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Metabolic Type</h4>
                    <p className="text-gray-600">{plan.personalizedInsights.metabolicType}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Expected Results</h4>
                    <p className="text-gray-600">{plan.personalizedInsights.expectedResults}</p>
                  </div>
                </div>
                {plan.personalizedInsights.keyRecommendations && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Key Recommendations</h4>
                    <ul className="space-y-1">
                      {plan.personalizedInsights.keyRecommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Weekly Plan Summary */}
            {plan.weeklyPlan && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-700">🍽️ Weekly Plan Summary</h3>
                <div className="space-y-4">
                  {Object.entries(plan.weeklyPlan).map(([day, meals]) => (
                    <div key={day} className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-gray-800 capitalize mb-2">{day}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {meals?.map((meal, idx) => (
                          <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-sm text-gray-700">{meal.meal}</span>
                              <span className="text-xs text-gray-500">{meal.time}</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{meal.name || meal.description}</p>
                            {meal.macros && (
                              <div className="text-xs text-gray-500">
                                {meal.macros.calories} cal | {meal.macros.protein} | {meal.macros.carbs} | {meal.macros.fats}
                              </div>
                            )}
                            {meal.recipeLink && (
                              <a 
                                href={meal.recipeLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs text-red-600 hover:text-red-700 mt-1"
                              >
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                Recipe
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shopping List */}
            {plan.shoppingList && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-700">🛒 Shopping List</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(plan.shoppingList).map(([category, items]) => (
                    <div key={category} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-700 capitalize mb-2">{category}</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {items?.map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Health Tips */}
            {plan.healthTips && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-700">💡 Health Tips</h3>
                <div className="space-y-3">
                  {plan.healthTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1">•</span>
                      <p className="text-gray-700 text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button 
                onClick={() => navigate('/current-diet-plan')}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                Create New Plan
              </button>
              <button 
                onClick={() => setSelectedPlan(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
            <span className="ml-4 text-lg text-gray-600">Loading your diet plan history...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          📈 Your Diet Plan Journey
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {dietPlans.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">No Diet Plans Yet</h2>
            <p className="text-gray-600 mb-6">Start your nutrition journey by creating your first personalized diet plan!</p>
            <button 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
              onClick={() => navigate('/current-diet-plan')}
            >
              🚀 Create Your First Plan
            </button>
          </div>
        ) : (
          <>
            {/* Filters and Search */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search plans..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Filter by Goal */}
                  <select 
                    value={filterGoal} 
                    onChange={(e) => setFilterGoal(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Goals</option>
                    <option value="fat loss">Fat Loss</option>
                    <option value="muscle gain">Muscle Gain</option>
                    <option value="maintenance">Maintenance</option>
                  </select>

                  {/* Sort by */}
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="calories">Highest Calories</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    List
                  </button>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{dietPlans.length}</p>
                    <p className="text-sm text-gray-600">Total Plans</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {dietPlans.filter(p => p.plan?.clientInfo?.goal === 'muscle gain').length}
                    </p>
                    <p className="text-sm text-gray-600">Muscle Gain</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">
                      {dietPlans.filter(p => p.plan?.clientInfo?.goal === 'fat loss').length}
                    </p>
                    <p className="text-sm text-gray-600">Fat Loss</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {dietPlans.filter(p => p.plan?.clientInfo?.goal === 'maintenance').length}
                    </p>
                    <p className="text-sm text-gray-600">Maintenance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Diet Plans Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredPlans.map((entry, idx) => renderPlanCard(entry, idx))}
            </div>

            {filteredPlans.length === 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <p className="text-gray-600">No plans match your current filters.</p>
              </div>
            )}
          </>
        )}

        {/* Detailed Plan Modal */}
        {selectedPlan && renderDetailedPlan(selectedPlan)}
      </div>
    </div>
  );
};

export default DietPlanHistory;