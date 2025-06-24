// src/pages/MealPlansDetails.js
import React from 'react';
import { Link } from 'react-router-dom';

const MealPlansDetails = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10 pt-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Dive Deep into <span className="gradient-text">Personalized Meal Plans</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Discover how AI-generated nutrition tailored just for you can revolutionize your diet and health.
          </p>
          <Link
            to="/signup"
            className="btn-primary transform hover:-translate-y-1"
          >
            Start Your Personalized Plan
          </Link>
        </div>
      </section>

      {/* Content Section: Why Personalized Meal Plans? */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Personalized Meal Plans?</h2>
            <p className="text-lg text-gray-700 mb-4">
              Forget one-size-fits-all diets. Our AI analyzes your unique profile – including your health goals, dietary restrictions, allergies, activity level, and even your food preferences – to create a meal plan that's truly yours. This ensures you get the right nutrients, enjoy your food, and stay motivated on your health journey.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
              <li>**Tailored to Your Goals:** Weight loss, muscle gain, energy boost, or general wellness.</li>
              <li>**Dietary Adaptability:** Supports vegetarian, vegan, keto, gluten-free, paleo, and more.</li>
              <li>**Preference-Driven:** Dislike broccoli? Our AI learns your tastes and avoids what you don't enjoy.</li>
              <li>**Nutritionally Balanced:** Ensures you meet your macro and micro-nutrient needs daily.</li>
            </ul>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Personalized Healthy Meal"
              className="rounded-2xl shadow-xl w-full h-auto object-cover border border-gray-100"
            />
          </div>
        </div>
      </section>

      {/* Content Section: Healthy Meal Examples & Cooking Tips */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Healthy Meal Examples & Cooking Inspiration
          </h2>
          <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Our plans feature delicious, easy-to-make meals. Here are just a few examples of what you might enjoy, along with tips to get you started in the kitchen.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Meal Example 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1676300184021-96fa00e1a987?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Salmon with Roasted Vegetables"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Lemon Herb Salmon with Roasted Asparagus</h3>
              <p className="text-gray-700 mb-4">A perfect balance of protein and healthy fats, rich in Omega-3s. Quick and delicious!</p>
              <h4 className="font-semibold text-gray-800">Quick Tip:</h4>
              <p className="text-gray-700 text-sm">Roast vegetables at 200°C (400°F) for 15-20 mins for perfect crispiness.</p>
              <a href="https://www.youtube.com/results?search_query=healthy+salmon+recipes" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline mt-4 block font-medium">
                Watch Cooking Demo (YouTube) →
              </a>
            </div>

            {/* Meal Example 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <img
                src="https://images.pexels.com/photos/16123121/pexels-photo-16123121/free-photo-of-salad-in-bowl.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Quinoa Salad with Chickpeas"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mediterranean Quinoa Salad</h3>
              <p className="text-gray-700 mb-4">A vibrant, protein-packed vegetarian option full of fresh flavors and fiber.</p>
              <h4 className="font-semibold text-gray-800">Quick Tip:</h4>
              <p className="text-gray-700 text-sm">Cook quinoa in vegetable broth for extra flavor.</p>
              <a href="https://www.youtube.com/results?search_query=quinoa+salad+recipes" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline mt-4 block font-medium">
                Watch Cooking Demo (YouTube) →
              </a>
            </div>

            {/* Meal Example 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <img
                src="https://cdn.pixabay.com/photo/2016/04/25/07/32/chicken-cutlet-1351331_1280.jpg"
                alt="Chicken Stir-fry"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Chicken & Veggie Stir-fry</h3>
              <p className="text-gray-700 mb-4">Fast, versatile, and loaded with essential vitamins. Perfect for busy evenings.</p>
              <h4 className="font-semibold text-gray-800">Quick Tip:</h4>
              <p className="text-gray-700 text-sm">Cut ingredients uniformly for even cooking.</p>
              <a href="https://www.youtube.com/results?search_query=healthy+stir+fry+recipes" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline mt-4 block font-medium">
                Watch Cooking Demo (YouTube) →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Eat Healthier?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Let our AI craft the perfect meal plan just for you.
          </p>
          <Link
            to="/signup"
            className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 line-height:2.5" 
          > 
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MealPlansDetails;