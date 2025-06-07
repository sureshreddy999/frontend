// src/pages/Dashboard.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9e7a8c3?w=150&h=150&fit=crop&crop=face",
      text: "This AI planner transformed my fitness journey! The personalized meal plans are incredible."
    },
    {
      name: "Mike Chen",
      role: "Busy Professional",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Finally, a solution that fits my hectic schedule. The AI understands my needs perfectly."
    },
    {
      name: "Emma Davis",
      role: "Health Coach",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "I recommend this to all my clients. The nutrition tracking features are game-changing."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Adapted for Authenticated User */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" fill="none" viewBox="0 0 1200 600">
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#d8b4fe" />
                <stop offset="100%" stopColor="#bfdbfe" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="100" r="150" fill="url(#grad1)" />
            <circle cx="900" cy="500" r="180" fill="url(#grad1)" />
            <rect x="50" y="300" width="100" height="100" rx="20" fill="url(#grad1)" />
            <polygon points="600,0 700,100 600,200 500,100" fill="url(#grad1)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center pt-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Welcome Back, <span className="gradient-text">{user ? user.firstName : 'User'}</span>!
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Your personalized journey to optimal health continues. Explore your tools and track your progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/current-diet-plan"
              className="btn-primary transform hover:-translate-y-1"
            >
              Generate Diet Plan
            </Link>
            <Link
              to="/diet-plan-history"
              className="btn-secondary transform hover:-translate-y-1"
            >
              Previous Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Simplified for Dashboard */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Your Personalized Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl shadow-lg text-center card-hover border border-gray-100">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full inline-flex mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Meal Plans</h3>
              <p className="text-gray-700">Get AI-generated meal plans tailored to your goals and preferences.</p>
              <Link to="/current-diet-plan" className="text-purple-600 hover:underline mt-4 block font-medium">
                Generate Your Plan →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl shadow-lg text-center card-hover border border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-full inline-flex mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H4a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v10m-2 2h2m-4 0h4m-10 0h4m-2 0v-2.167a4.002 4.002 0 00-3.256-3.954L9 14V7m-5 4h4m-4 0H9m7 4v-2.167a4.002 4.002 0 00-3.256-3.954L15 14V7m-5 4h2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Workout Routines</h3>
              <p className="text-gray-700">Receive adaptive workout plans that fit your schedule and goals.</p>
              <Link to="/features" className="text-blue-600 hover:underline mt-4 block font-medium">
                Learn More →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-purple-50 p-8 rounded-2xl shadow-lg text-center card-hover border border-gray-100">
              <div className="bg-gradient-to-r from-green-600 to-purple-600 p-4 rounded-full inline-flex mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Chat with AI Assistant</h3>
              <p className="text-gray-700">Get instant answers to your fitness and nutrition questions.</p>
              <button className="text-green-600 hover:underline mt-4 block font-medium" onClick={() => document.querySelector('.fixed.bottom-6.right-6 button').click()}>
                Launch Chat →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover shadow-md border-4 border-white animation-float"
                />
                <p className="text-lg text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-purple-600">{testimonial.role}</p>
                <div className="flex justify-center mt-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Adapted */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready for Your Next Step?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Continue your fitness journey with personalized plans and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/current-diet-plan"
              className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Your Next Plan
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Manage Your Subscription
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;