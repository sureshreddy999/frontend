// src/App.js
import { useContext } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';

import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import CurrentDietPlan from './pages/CurrentDietPlan';
import DietPlanHistory from './pages/DietPlanHistory';
import MealPlansDetails from './pages/MealPlansDetails';
import WorkoutRoutinesDetails from './pages/WorkoutRoutinesDetails';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div>Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/current-diet-plan" element={<PrivateRoute><CurrentDietPlan /></PrivateRoute>} />
        <Route path="/diet-plan-history" element={<PrivateRoute><DietPlanHistory /></PrivateRoute>} />
        <Route path="/meal-plans-details" element={<PrivateRoute><MealPlansDetails /></PrivateRoute>} />
        <Route path="/features/meal-plans" element={<MealPlansDetails />} />
        <Route path="/features/workout-routines" element={<WorkoutRoutinesDetails />} />
      </Routes>
      <ChatBot />
    </div>
  );
}

export default App;
