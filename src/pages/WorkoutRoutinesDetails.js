// src/pages/WorkoutRoutinesDetails.js
import React from 'react';
import { Link } from 'react-router-dom';

const WorkoutRoutinesDetails = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10 pt-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Master Your Fitness with <span className="gradient-text">Adaptive Workouts</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            From beginners to advanced, our AI crafts routines that evolve with your progress and goals.
          </p>
          <Link
            to="/signup"
            className="btn-primary transform hover:-translate-y-1"
          >
            Design Your Workout
          </Link>
        </div>
      </section>

      {/* Content Section: The Power of Adaptive Workouts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Power of Adaptive Workouts</h2>
            <p className="text-lg text-gray-700 mb-4">
              Our AI doesn't just give you a static plan; it learns and adapts. Whether you're at home with no equipment, or at the gym with full access, it generates routines that fit your current fitness level, available time, and preferences. No more guesswork, just progress.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
              <li>**Progressive Overload:** Plans evolve as you get stronger, preventing plateaus.</li>
              <li>**Equipment Flexibility:** Tailored for bodyweight, dumbbells, resistance bands, or full gym setups.</li>
              <li>**Time-Efficient:** Options for quick sessions or longer, in-depth workouts.</li>
              <li>**Injury Prevention:** Incorporates warm-ups, cool-downs, and proper form guidance.</li>
            </ul>
          </div>
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2016/11/22/22/24/adult-1850925_1280.jpg"
              alt="Adaptive Workout"
              className="rounded-2xl shadow-xl w-full h-auto object-cover border border-gray-100"
            />
          </div>
        </div>
      </section>

      {/* Content Section: Workout Types & Tips */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Explore Diverse Workout Types & Tips
          </h2>
          <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Our AI incorporates various training methodologies to keep your workouts engaging and effective.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Workout Type 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <img
                src="https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg"
                alt="Strength Training"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Strength Training Essentials</h3>
              <p className="text-gray-700 mb-4">Build muscle, boost metabolism, and improve bone density with targeted strength routines.</p>
              <h4 className="font-semibold text-gray-800">Pro Tip:</h4>
              <p className="text-gray-700 text-sm">Focus on compound movements for maximum benefit. Proper form is key!</p>
              <a href="https://www.youtube.com/results?search_query=beginner+strength+training+full+body" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-4 block font-medium">
                Watch Beginner Guide (YouTube) →
              </a>
            </div>

            {/* Workout Type 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <img
                src="https://cdn.pixabay.com/photo/2021/11/10/06/23/workout-6783020_1280.jpg"
                alt="Cardio Workout"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Effective Cardio for Endurance</h3>
              <p className="text-gray-700 mb-4">Improve heart health, stamina, and burn calories with diverse cardio exercises.</p>
              <h4 className="font-semibold text-gray-800">Pro Tip:</h4>
              <p className="text-gray-700 text-sm">Vary your cardio: running, cycling, swimming, or high-intensity interval training (HIIT).</p>
              <a href="https://www.youtube.com/results?search_query=beginner+cardio+workout+at+home" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-4 block font-medium">
                Watch Home Cardio (YouTube) →
              </a>
            </div>

            {/* Workout Type 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <img
                src="https://cdn.pixabay.com/photo/2018/01/01/01/56/yoga-3053488_1280.jpg"
                alt="Flexibility and Mobility"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Flexibility & Mobility for Wellness</h3>
              <p className="text-gray-700 mb-4">Enhance range of motion, reduce stiffness, and prevent injuries with targeted stretching.</p>
              <h4 className="font-semibold text-gray-800">Pro Tip:</h4>
              <p className="text-gray-700 text-sm">Incorporate dynamic stretches before workouts and static stretches after.</p>
              <a href="https://www.youtube.com/results?search_query=full+body+stretching+routine" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-4 block font-medium">
                Watch Stretching Routine (YouTube) →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-green-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Move Better?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Let our AI build the perfect workout plan tailored just for you.
          </p>
          <Link
            to="/signup"
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Training Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WorkoutRoutinesDetails;