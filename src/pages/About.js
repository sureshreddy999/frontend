// src/pages/About.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  // Ensure the page scrolls to the top when first loaded or navigated to
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Co-Founder",
      image: "https://images.pexels.com/photos/8374294/pexels-photo-8374294.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "Former Google AI researcher with PhD in Machine Learning. Passionate about using AI to improve health outcomes.",
      linkedin: "#"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "20+ years in health tech. Previously led engineering teams at Apple Health and MyFitnessPal.",
      linkedin: "#"
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of Nutrition Science",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Registered Dietitian with PhD in Nutritional Sciences. Published researcher in personalized nutrition.",
      linkedin: "#"
    },
    {
      name: "James Park",
      role: "Lead AI Engineer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "ML expert specializing in recommendation systems. Former Tesla autopilot team member.",
      linkedin: "#"
    }
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Innovation",
      description: "We leverage cutting-edge AI technology to solve real health and fitness challenges."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Personalization",
      description: "Every recommendation is tailored to your unique goals, preferences, and lifestyle."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Science-Based",
      description: "All our recommendations are backed by peer-reviewed research and nutritional science."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Accessibility",
      description: "Making personalized health and fitness guidance accessible to everyone, everywhere."
    }
  ];

  const stats = [
    { number: "500K+", label: "Active Users" },
    { number: "10M+", label: "Meals Planned" },
    { number: "2M+", label: "Workouts Completed" },
    { number: "98%", label: "User Satisfaction" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="text-gray-900">Revolutionizing</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                  Health & Fitness
                </span>
                <br />
                <span className="text-gray-900">with AI</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We believe everyone deserves personalized health and fitness guidance. Our mission is to make
                AI-powered wellness accessible, effective, and enjoyable for people of all fitness levels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Hero Section Buttons */}
                <button
                  onClick={() => {
                    navigate('/signup'); // Navigates to signup page
                    window.scrollTo(0, 0);
                  }}
                  className="btn-primary"
                >
                  Join Our Mission
                </button>
                <button
                  onClick={() => {
                    navigate('/how-it-works'); // Navigates to how it works page
                    window.scrollTo(0, 0);
                  }}
                  className="btn-secondary"
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-3xl transform rotate-6"></div>
              <img
                src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776"
                alt="Team working together"
                className="relative z-10 w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-xl text-gray-600">
              How we started and where we're going
            </p>
          </div>

          <div className="space-y-12">
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="text-xl leading-relaxed">
                Founded in 2022 by a team of AI researchers, nutritionists, and fitness experts,
                AI FitPlanner was born from a simple observation: despite the abundance of health
                and fitness information available, most people still struggle to find plans that
                work for their unique circumstances.
              </p>

              <p className="text-lg leading-relaxed">
                We realized that the missing piece wasn't more information—it was personalization.
                Everyone's body, lifestyle, preferences, and goals are different. What works for
                one person might not work for another. That's where AI comes in.
              </p>

              <p className="text-lg leading-relaxed">
                Our proprietary AI system learns from millions of data points to understand what
                makes an effective plan for each individual. We combine this with evidence-based
                nutritional science and exercise physiology to create truly personalized
                recommendations that adapt as you progress.
              </p>

              <p className="text-lg leading-relaxed">
                Today, we're proud to serve over 500,000 users worldwide, helping them achieve
                their health and fitness goals with personalized AI guidance. But we're just
                getting started. Our vision is to make personalized health and fitness guidance
                accessible to everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto text-white">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The experts behind AI FitPlanner
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  <div className="mt-4">
                    <a
                      href={member.linkedin}
                      className="text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (Footer-like) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Be part of the AI fitness revolution. Start your personalized journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                navigate('/signup'); // Navigates to signup page
                window.scrollTo(0, 0); // Scrolls to top
              }}
              className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => {
                navigate('/how-it-works'); // Navigates to how it works page
                window.scrollTo(0, 0); // Scrolls to top
              }}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;