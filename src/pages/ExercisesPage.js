import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// If Remixicon CSS is not globally imported (e.g., in index.css), you might need to import it here
// import 'remixicon/fonts/remixicon.css'; // Uncomment if needed

const ExercisesPage = () => {

  // This useEffect hook replaces your original <script id="exerciseCardScript">
  // It ensures the click functionality for expanding/collapsing exercise details
  // works after the component has rendered.
  useEffect(() => {
    const exerciseItems = document.querySelectorAll('.exercise-item');

    const handleClick = function() {
      const wasExpanded = this.classList.contains('expanded');
      exerciseItems.forEach(otherItem => {
        otherItem.classList.remove('expanded');
      });
      if (!wasExpanded) {
        this.classList.add('expanded');
      }
    };

    exerciseItems.forEach(item => {
      item.addEventListener('click', handleClick);
    });

    // Cleanup function: Remove event listeners when the component unmounts
    return () => {
      exerciseItems.forEach(item => {
        item.removeEventListener('click', handleClick);
      });
    };
  }, []); // Empty dependency array means this runs once after initial render

  // New useEffect hook to scroll to the top of the page on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full py-6 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">FITAI - AI Powered Personal Diet Planner</h1>
          <h1 className="text-3xl font-bold text-center text-gray-800">FITAI - AI Powered Personal Diet Planner</h1>
          <p className="mt-2 text-center text-gray-600">Personalized exercise recommendations based on your fitness goals</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Weight Loss Card - Converted to Blue Color Scheme */}
<div className="exercise-card bg-white rounded shadow-md overflow-hidden category-weight-gain"> {/* Changed from category-weight-loss */}
  <div className="p-6">
    <div className="flex items-start mb-4">
      <div className="w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full mr-4"> {/* Changed from bg-primary bg-opacity-10 */}
        <i className="ri-heart-pulse-line ri-lg text-blue-500"></i> {/* Changed from text-primary */}
      </div>
      <div>
        <h3 className="text-xl font-semibold">Weight Loss</h3>
        <p className="text-gray-600">High-intensity workouts designed to maximize calorie burn and boost metabolism.</p>
      </div>
    </div>
    <div className="border-t border-gray-100 pt-4">
      <ul className="space-y-3">
        <li className="exercise-item p-2 rounded">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <i className="ri-run-line text-blue-500"></i> {/* Changed from text-primary */}
            </div>
            <div>
              <span className="font-medium">HIIT Cardio</span>
              <p className="text-sm text-gray-500">30 min · High intensity</p>
            </div>
          </div>
        </li>
        <li className="exercise-item p-2 rounded">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <i className="ri-cycling-line text-pink-500"></i> {/* Changed from text-primary */}
            </div>
            <div>
              <span className="font-medium">Spin Cycling</span>
              <p className="text-sm text-gray-500">45 min · Moderate intensity</p>
            </div>
          </div>
        </li>
        <li className="exercise-item p-2 rounded">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <i className="ri-boxing-line text-pink-500"></i> {/* Changed from text-primary */}
            </div>
            <div>
              <span className="font-medium">Kickboxing</span>
              <p className="text-sm text-gray-500">40 min · High intensity</p>
            </div>
          </div>
        </li>
        <li className="exercise-item p-2 rounded">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <i className="ri-walk-line text-pink-500"></i> {/* Changed from text-primary */}
            </div>
            <div>
              <span className="font-medium">Power Walking</span>
              <p className="text-sm text-gray-500">60 min · Low intensity</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div className="mt-6">
      <Link to="/current-diet-plan"> {/* Changed to Link component */}
        <button className="w-full py-3 bg-pink-500 text-white font-medium rounded-button whitespace-nowrap">View Weight Loss Plan</button> {/* Changed from bg-primary */}
      </Link>
    </div>
  </div>
</div>
          {/* Weight Gain Card */}
          <div className="exercise-card bg-white rounded shadow-md overflow-hidden category-weight-gain">
            <div className="p-6">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4">
                  <i className="ri-scales-line ri-lg text-blue-500"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Weight Gain</h3>
                  <p className="text-gray-600">Progressive overload training focused on building muscle mass and increasing caloric intake.</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <ul className="space-y-3">
                  <li className="exercise-item p-2 rounded">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        <i className="ri-dumbbell-line text-blue-500"></i>
                      </div>
                      <div>
                        <span className="font-medium">Compound Lifts</span>
                        <p className="text-sm text-gray-500">60 min · High intensity</p>
                      </div>
                    </div>
                  </li>
                  <li className="exercise-item p-2 rounded">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        <i className="ri-body-scan-line text-blue-500"></i>
                      </div>
                      <div>
                        <span className="font-medium">Hypertrophy Training</span>
                        <p className="text-sm text-gray-500">50 min · Moderate intensity</p>
                      </div>
                    </div>
                  </li>
                  <li className="exercise-item p-2 rounded">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        <i className="ri-pulse-line text-blue-500"></i>
                      </div>
                      <div>
                        <span className="font-medium">Progressive Overload</span>
                        <p className="text-sm text-gray-500">45 min · High intensity</p>
                      </div>
                    </div>
                  </li>
                  <li className="exercise-item p-2 rounded">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        <i className="ri-rest-time-line text-blue-500"></i>
                      </div>
                      <div>
                        <span className="font-medium">Rest-Pause Training</span>
                        <p className="text-sm text-gray-500">40 min · High intensity</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Link to="/current-diet-plan"> {/* Changed to Link component */}
                  <button className="w-full py-3 bg-blue-500 text-white font-medium rounded-button whitespace-nowrap">View Weight Gain Plan</button>
                </Link>
              </div>
            </div>
          </div>
          {/* Strength Training Card */}
          <div className="exercise-card bg-white rounded shadow-md overflow-hidden category-strength">
            <div className="p-6">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mr-4">
                  <i className="ri-muscle-line ri-lg text-green-500"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Strength Training</h3>
                  <p className="text-gray-600">Focused on building functional strength, power, and muscular endurance.</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <ul className="space-y-3">
                  <li className="exercise-item p-2 rounded">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        <i className="ri-bar-chart-grouped-line text-green-500"></i>
                      </div>
                      <div>
                        <span className="font-medium">Powerlifting</span>
                        <p className="text-sm text-gray-500">75 min · Very high intensity</p>
                      </div>
                    </div>
                  </li>
                  <li className="exercise-item p-2 rounded">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        <i className="ri-hand-coin-line text-green-500"></i>
                      </div>
                      <div>
                        <span className="font-medium">Olympic Weightlifting</span>
                        <p className="text-sm text-gray-500">60 min · High intensity</p>
                      </div>
                    </div>
                  </li>
                  <li className="exercise-item p-2 rounded">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        <i className="ri-timer-line text-green-500"></i>
                      </div>
                      <div>
                        <span className="font-medium">Circuit Training</span>
                        <p className="text-sm text-gray-500">45 min · Moderate intensity</p>
                      </div>
                    </div>
                  </li>
                  <li className="exercise-item p-2 rounded">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        <i className="ri-pushpin-line text-green-500"></i>
                      </div>
                      <div>
                        <span className="font-medium">Calisthenics</span>
                        <p className="text-sm text-gray-500">50 min · Moderate intensity</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Link to="/current-diet-plan"> {/* Changed to Link component */}
                  <button className="w-full py-3 bg-green-500 text-white font-medium rounded-button whitespace-nowrap">View Strength Plan</button>
                </Link>
              </div>
            </div>
          </div>
          {/* Flexibility & Yoga Card */}
          <div className="exercise-card bg-white rounded shadow-md overflow-hidden category-flexibility">
            <div className="p-6">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full mr-4">
                  <i className="ri-yoga-line ri-lg text-purple-500"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Flexibility & Yoga</h3>
                  <p className="text-gray-600">Improve mobility, balance, and mental wellbeing through mindful movement.</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <ul className="space-y-3">
                  <li className="exercise-item p-2 rounded">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        <i className="ri-mental-health-line text-purple-500"></i>
                      </div>
                      <div>
                        <span className="font-medium">Vinyasa Flow</span>
                        <p className="text-sm text-gray-500">60 min · Low intensity</p>
                      </div>
                    </div>
                  </li>
                  <li className="exercise-item p-2 rounded">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        <i className="ri-heart-line text-purple-500"></i>
                      </div>
                      <div>
                        <span className="font-medium">Yin Yoga</span>
                        <p className="text-sm text-gray-500">75 min · Very low intensity</p>
                      </div>
                    </div>
                  </li>
                  <li className="exercise-item p-2 rounded">
                    <div className="flex items-center">
                      <div class="w-8 h-8 flex items-center justify-center mr-3">
                        <i className="ri-sun-line text-purple-500"></i>
                      </div>
                      <div>
                        <span className="font-medium">Dynamic Stretching</span>
                        <p className="text-sm text-gray-500">30 min · Low intensity</p>
                      </div>
                    </div>
                  </li>
                  <li className="exercise-item p-2 rounded">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        <i className="ri-meditation-line text-purple-500"></i>
                      </div>
                      <div>
                        <span className="font-medium">Pilates</span>
                        <p className="text-sm text-gray-500">45 min · Moderate intensity</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Link to="/current-diet-plan"> {/* Changed to Link component */}
                  <button className="w-full py-3 bg-purple-500 text-white font-medium rounded-button whitespace-nowrap">View Flexibility Plan</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Personalized Nutrition Plans</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Our AI analyzes your body type, goals, and dietary preferences to create custom meal plans that complement your exercise routine.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded shadow-md overflow-hidden">
              <div style={{ backgroundImage: `url('https://readdy.ai/api/search-image?query=healthy%20balanced%20meal%20with%20lean%20protein%2C%20vegetables%2C%20and%20whole%20grains%20on%20a%20white%20plate%20with%20a%20clean%20background%2C%20professional%20food%20photography%20with%20soft%20natural%20lighting&width=600&height=400&seq=meal-plan-1&orientation=landscape')`, height: '200px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Balanced Nutrition</h3>
                <p className="text-gray-600 mb-4">Well-rounded meal plans with optimal macronutrient distribution for overall health and fitness.</p>
              </div>
            </div>
            <div className="bg-white rounded shadow-md overflow-hidden">
              <div style={{ backgroundImage: `url('https://readdy.ai/api/search-image?query=protein-rich%20foods%20including%20grilled%20chicken%2C%20eggs%2C%20beans%2C%20and%20nuts%20arranged%20beautifully%20on%20a%20clean%20white%20surface%20with%20professional%20food%20photography%20lighting&width=600&height=400&seq=meal-plan-2&orientation=landscape')`, height: '200px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">High Protein</h3>
                <p className="text-gray-600 mb-4">Protein-focused meal plans designed to support muscle growth and recovery after workouts.</p>
              </div>
            </div>
            <div className="bg-white rounded shadow-md overflow-hidden">
              <div style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1664640733639-ba75346e87e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YSUyMHBsYW50JTIwYmFzZWQlMjBtZWFsfHxlbnwwfHwwfHww')`, height: '200px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Plant-Based</h3>
                <p className="text-gray-600 mb-4">Nutrient-dense vegetarian and vegan meal options that provide complete nutrition for active lifestyles.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* FIT-AI Section */}
            <div>
              <h3 className="text-xl font-['Pacifico'] text-white mb-4">FIT-AI</h3>
              <p className="text-gray-400 mb-4">AI-powered fitness and nutrition planning for everyone, regardless of experience level or goals.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <i className="ri-facebook-fill"></i>
                  </div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <i className="ri-twitter-x-fill"></i>
                  </div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <i className="ri-instagram-fill"></i>
                  </div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <i className="ri-youtube-fill"></i>
                  </div>
                </a>
              </div>
            </div>
            {/* Empty divs to push "Subscribe" to the right */}
            <div></div>
            <div></div>
            {/* Subscribe Section (moved to the last column) */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Learn More</h4>
              <p className="text-gray-400 mb-4">Get the latest fitness tips and updates delivered to your inbox.</p>
              <form className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 w-full bg-gray-700 border-none rounded-l text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-r whitespace-nowrap">Sign Up</button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 AI Fitness Planner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExercisesPage;