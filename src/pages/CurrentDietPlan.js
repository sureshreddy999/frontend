// src/pages/CurrentDietPlan.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { generateNewDietPlan, getDietPlanHistory } from '../api/backendApi'; // Assuming these API calls exist
import { Link } from 'react-router-dom';

const CurrentDietPlan = () => {
  const { user, isAuthenticated, isLoading } = useContext(AuthContext);
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plansGeneratedThisMonth, setPlansGeneratedThisMonth] = useState(0); // Placeholder for free tier limit

  useEffect(() => {
    // In a real application, you'd fetch the user's current plan and generated count from backend
    // For now, we'll simulate.
    if (!isLoading && isAuthenticated && user) {
      // Simulate fetching a saved plan or showing a default message
      // and fetching plans generated this month from the backend
      // setDietPlan(...);
      // setPlansGeneratedThisMonth(user.plansGeneratedThisMonth || 0); // Assuming backend sends this
      console.log('User tier:', user.tier);

      // --- Mock data for current plan on load ---
      if (!dietPlan) { // Only set if no plan is currently displayed
        setDietPlan(`Your AI-Generated Diet Plan (Sample):

Breakfast: Greek Yogurt with Berries and Honey (300 kcal)
Lunch: Large Salad with Grilled Chicken, Avocado, and Lemon Vinaigrette (450 kcal)
Snack: Apple Slices with Almond Butter (150 kcal)
Dinner: Baked Salmon with Quinoa and Roasted Asparagus (550 kcal)

Total Calories: ~1450 kcal

Notes: Stay hydrated! Drink at least 8 glasses of water daily.
This is a sample plan. Your actual plan will be customized.`);
      }
      // --- End Mock Data ---
    }
  }, [isLoading, isAuthenticated, user, dietPlan]);

  const handleGeneratePlan = async () => {
    setError('');
    
    // Frontend check for free tier limit
    if (user.tier === 'free' && plansGeneratedThisMonth >= 15) {
      setError('You have reached your limit of 15 diet plans for this month. Upgrade to Premium for unlimited plans!');
      return;
    }

    setLoading(true);
    try {
      // Assuming generateNewDietPlan takes user preferences and returns a plan
      // You would send user preferences/goals to your backend API here
      // const response = await generateNewDietPlan({ userId: user.id, preferences: '...' }); 
      
      // --- Mock data for generation ---
      const newPlan = `Newly Generated Plan (on ${new Date().toLocaleDateString()}):

Breakfast: Oatmeal with Chia Seeds and Banana (320 kcal)
Lunch: Turkey & Veggie Wrap on Whole Wheat Tortilla (400 kcal)
Snack: Handful of Walnuts (180 kcal)
Dinner: Lentil Soup with a side of Whole-Grain Bread (480 kcal)

Total Calories: ~1380 kcal

Notes: Remember to incorporate light exercise.`;

      const response = { success: true, plan: newPlan };
      // --- End Mock Data ---


      if (response.success) {
        setDietPlan(response.plan);
        // Increment generated plans for free tier (frontend simulation)
        if (user.tier === 'free') {
          setPlansGeneratedThisMonth(prev => prev + 1);
        }
        alert('New diet plan generated!');
      } else {
        setError(response.message || 'Failed to generate diet plan.');
      }
    } catch (err) {
      console.error('Error generating diet plan:', err);
      setError('An error occurred while generating your diet plan.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (user.tier !== 'premium') {
      alert('PDF download is a Premium feature. Please upgrade your plan!');
      return;
    }
    // Simulate PDF download
    alert('Downloading diet plan as PDF (functionality to be integrated with backend)!');
    // In a real application, you would make an API call to get the PDF
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading user data...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please <Link to="/signin" className="text-purple-600 hover:underline">sign in</Link> or <Link to="/signup" className="text-purple-600 hover:underline">sign up</Link> to view your diet plan.</p>
          <Link to="/pricing" className="btn-primary">View Pricing Plans</Link>
        </div>
      </div>
    );
  }

  const isFreeTier = user.tier === 'free';
  const canGenerateMorePlans = !isFreeTier || plansGeneratedThisMonth < 15;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Your Current Diet Plan
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6 text-sm">
            {error}
          </div>
        )}

        {dietPlan ? (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Generated Plan Details:</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{dietPlan}</p>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGeneratePlan}
                disabled={loading || !canGenerateMorePlans}
                className={`btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${!canGenerateMorePlans ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Generating...' : 'Generate New Plan'}
              </button>
              <button
                onClick={handleDownloadPdf}
                disabled={user.tier !== 'premium'}
                className={`btn-secondary ${user.tier !== 'premium' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Download as PDF
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600 mb-6">
              You don't have a diet plan generated yet. Let AI create one for you!
            </p>
            {isFreeTier && (
              <p className="text-md text-purple-600 mb-4">
                (Free Tier: {plansGeneratedThisMonth} of 15 plans generated this month)
              </p>
            )}
            <button
              onClick={handleGeneratePlan}
              disabled={loading || !canGenerateMorePlans}
              className={`btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${!canGenerateMorePlans ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Generating...' : 'Generate My First Plan'}
            </button>
            {!canGenerateMorePlans && isFreeTier && (
              <p className="mt-4 text-red-600 font-medium">
                You've reached your monthly limit. <Link to="/pricing" className="underline hover:text-red-800">Upgrade to Premium</Link> for unlimited plans!
              </p>
            )}
          </div>
        )}

        {/* Link to history */}
        <div className="mt-8 text-center">
          <Link to="/diet-plan-history" className="text-purple-600 hover:underline text-lg">
            View Previous Plans
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CurrentDietPlan;