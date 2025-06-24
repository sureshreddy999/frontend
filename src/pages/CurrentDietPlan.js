import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { generateDietPlan } from '../api/backendApi';
import { useNavigate } from 'react-router-dom';

const CurrentDietPlan = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  // Initialize selectedDay to null, and set it in useEffect once dietPlan is available
  const [selectedDay, setSelectedDay] = useState(null); 
  const [showAlternatives, setShowAlternatives] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    goal: 'muscle gain',
    dietaryRestrictions: [],
    healthConditions: [],
    foodPreferences: [],
    mealCount: 6,
    cuisinePreference: 'mixed'
  });

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 
    'Low-Sodium', 'Low-Sugar', 'Keto', 'Paleo', 'Mediterranean'
  ];

  const healthConditionOptions = [
    'Diabetes', 'Hypertension', 'High Cholesterol', 'Heart Disease',
    'PCOS', 'Thyroid Issues', 'Kidney Issues', 'Digestive Issues'
  ];

  const cuisineOptions = [
    'Indian', 'Mediterranean', 'Asian', 'Mexican', 'American', 'Italian', 'Mixed'
  ];

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/signin');
    }
  }, [isAuthenticated, user, navigate]);

  // New useEffect to set the initial selectedDay when dietPlan is loaded
  useEffect(() => {
    if (dietPlan && dietPlan.weeklyPlan && !selectedDay) {
      setSelectedDay(Object.keys(dietPlan.weeklyPlan)[0]);
    }
  }, [dietPlan, selectedDay]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGenerate = async () => {
    const { age, weight, height } = formData;

    if (!age || !weight || !height) {
      setError('Please fill all required fields.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await generateDietPlan({
        email: user.email,
        ...formData
      });

      if (response.success) {
        setDietPlan(response.plan);
        setActiveTab('plan');
        // Set selectedDay to the first day of the generated plan
        if (response.plan.weeklyPlan) {
          setSelectedDay(Object.keys(response.plan.weeklyPlan)[0]);
        }
      } else {
        setError(response.message || 'Failed to generate diet plan.');
      }
    } catch (err) {
      console.error('Error generating plan:', err);
      setError('An error occurred while generating the diet plan.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAlternatives = (dayMealIndex) => {
    setShowAlternatives(prev => ({
      ...prev,
      [dayMealIndex]: !prev[dayMealIndex]
    }));
  };

  const TabButton = ({ tab, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(tab)}
      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const renderNutritionCard = (title, value, unit, color) => (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl text-white shadow-lg`}>
      <h3 className="text-lg font-semibold opacity-90">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm opacity-75">{unit}</p>
    </div>
  );

  const renderMealCard = (meal, dayMealIndex) => (
    <div key={dayMealIndex} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xl font-bold text-gray-800">{meal.meal}</h4>
          <p className="text-sm text-gray-500">{meal.time}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-purple-600">{meal.macros?.calories || 0}</p>
          <p className="text-sm text-gray-500">calories</p>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="font-semibold text-gray-700 mb-2">{meal.name}</h5>
        <p className="text-gray-600 text-sm leading-relaxed">{meal.description}</p>
      </div>

      {meal.ingredients && (
        <div className="mb-4">
          <h6 className="font-semibold text-gray-700 mb-2">Ingredients:</h6>
          <div className="flex flex-wrap gap-2">
            {meal.ingredients.map((ingredient, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      )}

      {meal.macros && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Protein</p>
            <p className="font-semibold text-green-600">{meal.macros.protein}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Carbs</p>
            <p className="font-semibold text-orange-600">{meal.macros.carbs}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Fats</p>
            <p className="font-semibold text-purple-600">{meal.macros.fats}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {meal.recipeLink && (
          <a
            href={meal.recipeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Recipe Video
          </a>
        )}
        
        {meal.cookingTime && (
          <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            {meal.cookingTime} min
          </span>
        )}
        
        {meal.difficulty && (
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-lg">
            {'★'.repeat(meal.difficulty)} Difficulty
          </span>
        )}
      </div>

      {meal.nutritionalBenefits && (
        <div className="mb-4">
          <h6 className="font-semibold text-gray-700 mb-2">Benefits:</h6>
          <ul className="text-sm text-gray-600">
            {meal.nutritionalBenefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center mb-1">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {meal.alternatives && (
        <div>
          <button
            onClick={() => toggleAlternatives(dayMealIndex)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm mb-2"
          >
            {showAlternatives[dayMealIndex] ? 'Hide' : 'Show'} Alternatives
          </button>
          {showAlternatives[dayMealIndex] && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <ul className="text-sm text-gray-600">
                {meal.alternatives.map((alt, idx) => (
                  <li key={idx} className="mb-1">• {alt}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          AI-Powered Nutrition Planner
        </h1>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <TabButton tab="form" label="📋 Form" isActive={activeTab === 'form'} onClick={setActiveTab} />
          {dietPlan && <TabButton tab="overview" label="📊 Overview" isActive={activeTab === 'overview'} onClick={setActiveTab} />}
          {dietPlan && <TabButton tab="plan" label="🍽️ Meal Plan" isActive={activeTab === 'plan'} onClick={setActiveTab} />}
          {dietPlan && <TabButton tab="shopping" label="🛒 Shopping List" isActive={activeTab === 'shopping'} onClick={setActiveTab} />}
          {dietPlan && <TabButton tab="tips" label="💡 Tips" isActive={activeTab === 'tips'} onClick={setActiveTab} />}
        </div>

        {/* Form Tab */}
        {activeTab === 'form' && (
          <div className="bg-white shadow-2xl rounded-3xl p-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm) *</label>
                <input
                  type="number"
                  name="height"
                  placeholder="Enter height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                <select 
                  name="activityLevel" 
                  value={formData.activityLevel} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="sedentary">Sedentary (Office Job)</option>
                  <option value="light">Lightly Active (1-3 days/week)</option>
                  <option value="moderate">Moderately Active (3-5 days/week)</option>
                  <option value="active">Very Active (6-7 days/week)</option>
                  <option value="very_active">Extremely Active (2x/day)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Goal</label>
                <select 
                  name="goal" 
                  value={formData.goal} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="fat loss">Fat Loss</option>
                  <option value="muscle gain">Muscle Gain</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meals Per Day</label>
                <select 
                  name="mealCount" 
                  value={formData.mealCount} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={3}>3 Meals</option>
                  <option value={4}>4 Meals</option>
                  <option value={5}>5 Meals</option>
                  <option value={6}>6 Meals</option>
                </select>
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <button
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="mb-6 text-purple-600 hover:text-purple-800 font-medium"
            >
              {showAdvancedOptions ? '▼' : '▶'} Advanced Options
            </button>

            {showAdvancedOptions && (
              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Dietary Restrictions</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {dietaryOptions.map(option => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="dietaryRestrictions"
                          value={option}
                          checked={formData.dietaryRestrictions.includes(option)}
                          onChange={handleChange}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Health Conditions</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {healthConditionOptions.map(option => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="healthConditions"
                          value={option}
                          checked={formData.healthConditions.includes(option)}
                          onChange={handleChange}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Preference</label>
                  <select 
                    name="cuisinePreference" 
                    value={formData.cuisinePreference} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {cuisineOptions.map(cuisine => (
                      <option key={cuisine} value={cuisine.toLowerCase()}>{cuisine}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <button 
              onClick={handleGenerate} 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              {loading ? '🔄 Generating Your Personalized Plan...' : '🚀 Generate Advanced Diet Plan'}
            </button>
            
            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && dietPlan && (
          <div className="space-y-6">
            {/* Nutrition Overview */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">📊 Nutrition Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {renderNutritionCard('Daily Calories', dietPlan.nutritionTargets?.calories || 0, 'kcal', 'from-purple-500 to-purple-700')}
                {renderNutritionCard('Protein', dietPlan.nutritionTargets?.protein || '0g', 'per day', 'from-green-500 to-green-700')}
                {renderNutritionCard('Carbs', dietPlan.nutritionTargets?.carbs || '0g', 'per day', 'from-orange-500 to-orange-700')}
                {renderNutritionCard('Fats', dietPlan.nutritionTargets?.fats || '0g', 'per day', 'from-blue-500 to-blue-700')}
              </div>
            </div>

            {/* Personalized Insights */}
            {dietPlan.personalizedInsights && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">🎯 Personalized Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-purple-700">Metabolic Type</h3>
                    <p className="text-gray-600">{dietPlan.personalizedInsights.metabolicType}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-purple-700">Expected Results</h3>
                    <p className="text-600">{dietPlan.personalizedInsights.expectedResults}</p>
                  </div>
                </div>
                {dietPlan.personalizedInsights.keyRecommendations && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 text-purple-700">Key Recommendations</h3>
                    <ul className="space-y-2">
                      {dietPlan.personalizedInsights.keyRecommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Meal Plan Tab */}
        {activeTab === 'plan' && dietPlan && dietPlan.weeklyPlan && (
          <div className="space-y-6">
            {/* Day Selector */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">🍽️ Weekly Meal Plan</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(dietPlan.weeklyPlan).map(day => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedDay === day
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </button>
                ))}
              </div>

              {/* Selected Day Meals */}
              <div className="space-y-6">
                {selectedDay && dietPlan.weeklyPlan[selectedDay] && dietPlan.weeklyPlan[selectedDay].length > 0 ? (
                  dietPlan.weeklyPlan[selectedDay].map((meal, idx) =>
                    renderMealCard(meal, `${selectedDay}-${idx}`)
                  )
                ) : (
                  <p className="text-gray-600">Please select a day to view the meals.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Shopping List Tab */}
        {activeTab === 'shopping' && dietPlan && dietPlan.shoppingList && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">🛒 Weekly Shopping List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(dietPlan.shoppingList).map(([category, items]) => (
                <div key={category} className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-xl font-semibold mb-3 text-purple-700 capitalize">
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && dietPlan && (
          <div className="space-y-6">
            {/* Health Tips */}
            {dietPlan.healthTips && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">💡 Expert Health Tips</h2>
                <div className="space-y-4">
                  {dietPlan.healthTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <span className="text-2xl mr-4">💡</span>
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hydration Plan */}
            {dietPlan.hydrationPlan && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">💧 Hydration Plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-700">Daily Water Intake</h3>
                    <p className="text-2xl font-bold text-blue-600">{dietPlan.hydrationPlan.dailyWaterIntake}</p>
                  </div>
                  {dietPlan.hydrationPlan.timing && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-700">Timing</h3>
                      <ul className="space-y-1">
                        {dietPlan.hydrationPlan.timing.map((time, idx) => (
                          <li key={idx} className="text-gray-600">{time}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Exercise Nutrition */}
            {dietPlan.exerciseNutrition && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">🏋️ Exercise Nutrition</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dietPlan.exerciseNutrition.preWorkout && (
                    <div className="bg-green-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-3 text-green-700">Pre-Workout</h3>
                      <p className="text-gray-700 mb-2"><strong>Meal:</strong> {dietPlan.exerciseNutrition.preWorkout.meal}</p>
                      <p className="text-gray-700 mb-2"><strong>Timing:</strong> {dietPlan.exerciseNutrition.preWorkout.timing}</p>
                      <p className="text-gray-600 text-sm">{dietPlan.exerciseNutrition.preWorkout.benefits}</p>
                    </div>
                  )}
                  {dietPlan.exerciseNutrition.postWorkout && (
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-3 text-blue-700">Post-Workout</h3>
                      <p className="text-gray-700 mb-2"><strong>Meal:</strong> {dietPlan.exerciseNutrition.postWorkout.meal}</p>
                      <p className="text-gray-700 mb-2"><strong>Timing:</strong> {dietPlan.exerciseNutrition.postWorkout.timing}</p>
                      <p className="text-gray-600 text-sm">{dietPlan.exerciseNutrition.postWorkout.benefits}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentDietPlan;