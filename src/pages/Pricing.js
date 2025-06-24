// src/pages/Pricing.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, annual: 0 },
      features: [
        "Basic meal planning",
        "Simple workout routines",
        "Limited nutrition tracking",
        "Community access",
        "Email support"
      ],
      limitations: [
        "5 meal plans per month",
        "3 workout routines",
        "Basic analytics"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Premium",
      description: "Most popular choice for serious fitness enthusiasts",
      price: { monthly: 12990, annual: 129990 }, // Updated from 1299, 12999
      features: [
        "Unlimited AI meal plans",
        "Custom workout routines",
        "Advanced nutrition tracking",
        "Progress analytics",
        "Grocery list generator",
        "Wearable device sync",
        "Priority support",
        "Recipe recommendations"
      ],
      limitations: [],
      cta: "Start Premium Trial",
      popular: true
    },
    {
      name: "Pro",
      description: "For fitness professionals and coaches",
      price: { monthly: 24990, annual: 249990 }, // Updated from 2499, 24999
      features: [
        "Everything in Premium",
        "Multiple client profiles",
        "Advanced analytics dashboard",
        "White-label options",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "Early access to new features"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "What is the difference between monthly and annual billing?",
      answer: "Annual billing offers significant savings compared to monthly billing. You get approximately two months free with the annual plan."
    },
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time directly from your account settings. Changes will be prorated."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, our Premium plan comes with a 7-day free trial. No credit card is required to start the trial."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, including Visa, MasterCard, American Express, and Discover. We also support PayPal."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No, we believe in transparent pricing. The price you see is exactly what you pay."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Flexible Plans for Every </span>
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Goal
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan to unlock your full potential with AI-powered fitness and nutrition.
          </p>
          <div className="mt-8 flex justify-center items-center space-x-4">
            <span className="text-lg font-semibold text-gray-800">Monthly</span>
            <label htmlFor="toggle-billing" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  id="toggle-billing"
                  className="sr-only"
                  checked={isAnnual}
                  onChange={() => setIsAnnual(!isAnnual)}
                />
                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform"
                     style={{ transform: isAnnual ? 'translateX(100%)' : 'translateX(0)' }}></div>
              </div>
            </label>
            <span className="text-lg font-semibold text-gray-800">Annual</span>
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full ml-2">Save 15%</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-8 flex flex-col justify-between border-2 ${
                plan.popular ? 'border-purple-600 shadow-2xl scale-105' : 'border-gray-100'
              } transition-all duration-300 hover:shadow-xl`}
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="text-5xl font-extrabold text-gray-900 mb-6">
                  {plan.price.monthly === 0 ? "Free" : (
                    <>
                      <span className="text-3xl align-top">₹</span>
                      {(isAnnual ? plan.price.annual : plan.price.monthly) / 100} {/* Division by 100 remains */}
                      <span className="text-base font-medium text-gray-500">
                        /{plan.price.monthly === 0 ? 'month' : (isAnnual ? 'year' : 'month')}
                      </span>
                    </>
                  )}
                </div>

                <ul className="space-y-3 text-gray-700 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                  {plan.limitations.map((limitation, lIndex) => (
                    <li key={lIndex} className="flex items-center text-gray-500 line-through">
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {limitation}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button for each plan */}
              {plan.name === "Free" || plan.name === "Premium" ? (
                 <button
                 onClick={() => {
                   navigate('/signup'); // Navigate to signup page for Free/Premium plans
                   window.scrollTo(0, 0); // Scroll to top
                 }}
                 className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                   plan.popular
                     ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                     : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'
                 }`}
               >
                 {plan.cta}
               </button>
              ) : (
                <button
                  onClick={() => {
                    navigate('/contact'); // Navigate to contact page for 'Pro' plan
                    window.scrollTo(0, 0); // Scroll to top
                  }}
                  className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg"
                >
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find answers to the most common questions about our pricing.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Footer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start your free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                navigate('/signup'); // Navigate to signup page
                window.scrollTo(0, 0); // Scroll to top
              }}
              className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => {
                navigate('/contact'); // Navigate to contact page
                window.scrollTo(0, 0); // Scroll to top
              }}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;