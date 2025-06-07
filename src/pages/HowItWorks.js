const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Tell us about your fitness goals, dietary preferences, allergies, and current activity level. Our AI needs this information to create your personalized plan.",
      image: "https://images.unsplash.com/photo-1556911073-a517e752729c",
      features: ["Personal goals setting", "Dietary preferences", "Health conditions", "Activity level assessment"]
    },
    {
      number: "02",
      title: "AI Analysis & Planning",
      description: "Our advanced AI analyzes your profile and creates personalized meal plans and workout routines tailored specifically to your needs and goals.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      features: ["AI recommendation engine", "Personalized meal plans", "Custom workout routines", "Nutritional optimization"]
    },
    {
      number: "03",
      title: "Track Your Progress",
      description: "Use our smart tracking tools to log your meals, workouts, and progress. Our AI continuously learns and adjusts your plans for optimal results.",
      image: "https://images.pexels.com/photos/6551407/pexels-photo-6551407.jpeg",
      features: ["Smart food tracking", "Workout logging", "Progress analytics", "Real-time adjustments"]
    },
    {
      number: "04",
      title: "Achieve Your Goals",
      description: "Watch as you transform your health and fitness with our AI-powered guidance. Get continuous support and motivation throughout your journey.",
      image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776",
      features: ["Goal achievement", "Continuous support", "Community features", "Long-term success"]
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">How </span>
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              AI FitPlanner
            </span>
            <br />
            <span className="text-gray-900">Works</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the simple 4-step process that transforms your health and fitness journey with the power of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 mb-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {step.number}
                  </span>
                  <div className="h-1 flex-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded"></div>
                </div>
                
                <h2 className="text-4xl font-bold text-gray-900">{step.title}</h2>
                <p className="text-xl text-gray-600 leading-relaxed">{step.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-3xl transform rotate-3"></div>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="relative z-10 w-full h-80 object-cover rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powered by <span className="gradient-text">Advanced AI Technology</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our sophisticated machine learning algorithms ensure you get the most accurate and effective recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg card-hover">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Machine Learning</h3>
              <p className="text-gray-600">Advanced algorithms that learn from millions of data points to provide personalized recommendations.</p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg card-hover">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Adaptation</h3>
              <p className="text-gray-600">Plans automatically adjust based on your progress, schedule changes, and new preferences.</p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg card-hover">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Science-Based</h3>
              <p className="text-gray-600">All recommendations are backed by peer-reviewed research and nutritional science.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common questions about how AI FitPlanner works.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How accurate are the AI recommendations?",
                answer: "Our AI recommendations are highly accurate, with over 90% user satisfaction rate. The system continuously learns from your feedback and adjusts recommendations to improve accuracy over time."
              },
              {
                question: "Can I modify the AI-generated plans?",
                answer: "Absolutely! You can customize any aspect of your meal plans and workout routines. The AI will learn from your modifications and incorporate your preferences into future recommendations."
              },
              {
                question: "How long does it take to see results?",
                answer: "Most users start seeing results within 2-4 weeks. However, this varies based on individual goals, starting point, and adherence to the recommendations."
              },
              {
                question: "Does the app work with dietary restrictions?",
                answer: "Yes! Our AI can accommodate virtually any dietary restriction including vegan, vegetarian, keto, paleo, gluten-free, and specific allergies or medical conditions."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands who have transformed their lives with AI-powered fitness and nutrition planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300">
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;