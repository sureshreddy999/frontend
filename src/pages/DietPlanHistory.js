// src/pages/DietPlanHistory.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import { getDietPlanHistory } from '../api/backendApi'; // Uncomment when you have backend API

const DietPlanHistory = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useContext(AuthContext);
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || !user) {
        navigate('/signin'); // Redirect if not authenticated
      } else {
        fetchDietPlanHistory();
      }
    }
  }, [isAuthenticated, user, authLoading, navigate]);

  const fetchDietPlanHistory = async () => {
    setLoading(true);
    setError('');
    try {
      // In a real app, you'd fetch from your backend:
      // const response = await getDietPlanHistory(user.userId);
      // if (response.success && response.plans) {
      //   setDietPlans(response.plans);
      // } else {
      //   setDietPlans([]);
      //   setError(response.message || "No diet plans found in history.");
      // }

      // --- Mock Data for Demonstration ---
      setTimeout(() => {
        setDietPlans([
          {
            id: 'plan-1',
            generatedAt: '2025-05-30',
            calories: '1800',
            macronutrients: { protein: '120g', carbs: '180g', fats: '60g' },
            notes: '7-Day Mediterranean Diet, Focus: Weight Loss. This plan emphasizes whole foods, lean proteins, and healthy fats. Includes recipes for breakfast, lunch, and dinner, along with snack suggestions. Optimized for sustainable weight loss with moderate activity levels.',
            details: `Day 1: Breakfast - Greek Yogurt with Berries; Lunch - Quinoa Salad with Chickpeas; Dinner - Baked Salmon with Asparagus.
Day 2: Breakfast - Oatmeal with Nuts; Lunch - Lentil Soup; Dinner - Chicken Breast with Mixed Veggies.
Day 3: Breakfast - Scrambled Eggs with Spinach; Lunch - Tuna Salad (no mayo); Dinner - Whole Wheat Pasta with Marinara.
(Full details would be much longer in a real plan)`
          },
          {
            id: 'plan-2',
            generatedAt: '2025-05-15',
            calories: '2200',
            macronutrients: { protein: '180g', carbs: '200g', fats: '80g' },
            notes: '14-Day High-Protein Plan, Focus: Muscle Gain. Designed for individuals looking to build muscle mass, this plan includes high protein intake from various sources, complex carbohydrates for energy, and healthy fats. Incorporates pre- and post-workout meal ideas.',
            details: `Day 1: Breakfast - Protein Smoothie; Lunch - Grilled Chicken and Sweet Potato; Dinner - Steak with Broccoli.
Day 2: Breakfast - Egg White Omelette; Lunch - Turkey and Avocado Salad; Dinner - Lean Ground Beef with Brown Rice.
(Full details would be much longer in a real plan)`
          },
          {
              id: 'plan-3',
              generatedAt: '2025-04-28',
              calories: '1900',
              macronutrients: { protein: '100g', carbs: '220g', fats: '70g' },
              notes: '7-Day Balanced Diet, Focus: General Health. A well-rounded plan for maintaining overall health and energy. Features a variety of fruits, vegetables, whole grains, and lean proteins.',
              details: `Day 1: Breakfast - Whole Grain Toast with Avocado; Lunch - Chicken & Veggie Wrap; Dinner - Tofu Stir-fry.
(Full details would be much longer in a real plan)`
          }
        ]);
        setLoading(false);
      }, 1000);
      // --- End Mock Data ---


    } catch (err) {
      console.error("Error fetching diet plan history:", err);
      setError("An unexpected error occurred while fetching history.");
    } finally {
      // setLoading(false); // Set to false inside setTimeout for mock data
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading plan history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8 gradient-text">
          Your Diet Plan History
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {dietPlans.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
            <p className="text-xl text-gray-600 mb-4">You haven't generated any previous diet plans yet.</p>
            <button
              onClick={() => navigate('/current-diet-plan')}
              className="btn-primary"
            >
              Generate Your First Plan
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {dietPlans.map((plan, index) => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 card-hover">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Plan Generated on {plan.generatedAt}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-4">
                  <p><span className="font-semibold text-purple-700">Calories:</span> {plan.calories} kcal</p>
                  <p><span className="font-semibold text-purple-700">Protein:</span> {plan.macronutrients.protein}</p>
                  <p><span className="font-semibold text-purple-700">Carbs:</span> {plan.macronutrients.carbs}</p>
                  <p><span className="font-semibold text-purple-700">Fats:</span> {plan.macronutrients.fats}</p>
                </div>
                <p className="text-gray-600 italic text-sm mb-4">"{plan.notes}"</p>
                
                {/* Optional: Add a button to view full details if needed */}
                <button
                  onClick={() => alert(`Full details for plan on ${plan.generatedAt}:\n${plan.details}`)} // Used alert for mock data, can navigate to /diet-plan/${plan.id} later
                  className="btn-secondary text-sm px-4 py-2"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/current-diet-plan')}
            className="btn-primary"
          >
            Go to Current Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default DietPlanHistory;