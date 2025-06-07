import { useState } from 'react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Nutrition', 'Fitness', 'AI Technology', 'Success Stories', 'Tips & Tricks'];

  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind AI-Powered Nutrition Planning",
      excerpt: "Discover how machine learning algorithms analyze your unique metabolic profile to create personalized meal plans that actually work.",
      image: "https://images.unsplash.com/photo-1467453678174-768ec283a940",
      category: "AI Technology",
      author: "Dr. Sarah Chen",
      date: "March 15, 2024",
      readTime: "8 min read",
      tags: ["AI", "Nutrition", "Science"]
    },
    {
      id: 2,
      title: "5 Workout Routines That Adapt to Your Schedule",
      excerpt: "Learn how our AI creates flexible workout plans that adjust based on your available time, energy levels, and fitness goals.",
      image: "https://images.pexels.com/photos/4944436/pexels-photo-4944436.jpeg",
      category: "Fitness",
      author: "Mike Rodriguez",
      date: "March 12, 2024",
      readTime: "6 min read",
      tags: ["Workouts", "Flexibility", "AI"]
    },
    {
      id: 3,
      title: "How Sarah Lost 30 Pounds with Personalized AI Guidance",
      excerpt: "Read about Sarah's incredible transformation journey and how AI-powered recommendations helped her achieve sustainable weight loss.",
      image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776",
      category: "Success Stories",
      author: "Emily Watson",
      date: "March 10, 2024",
      readTime: "5 min read",
      tags: ["Weight Loss", "Success", "Transformation"]
    },
    {
      id: 4,
      title: "Understanding Macronutrients: A Complete Guide",
      excerpt: "Everything you need to know about proteins, carbs, and fats, and how our AI optimizes them for your specific goals.",
      image: "https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg",
      category: "Nutrition",
      author: "Dr. Emily Watson",
      date: "March 8, 2024",
      readTime: "10 min read",
      tags: ["Nutrition", "Macros", "Education"]
    },
    {
      id: 5,
      title: "The Future of Fitness: AI vs Traditional Personal Training",
      excerpt: "Explore how AI technology is revolutionizing personal fitness and what it means for the future of health and wellness.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      category: "AI Technology",
      author: "James Park",
      date: "March 5, 2024",
      readTime: "7 min read",
      tags: ["AI", "Future", "Fitness"]
    },
    {
      id: 6,
      title: "10 Simple Tips to Stay Motivated on Your Fitness Journey",
      excerpt: "Practical strategies to maintain motivation and consistency, backed by behavioral psychology and user success data.",
      image: "https://images.pexels.com/photos/6551407/pexels-photo-6551407.jpeg",
      category: "Tips & Tricks",
      author: "Mike Rodriguez",
      date: "March 3, 2024",
      readTime: "4 min read",
      tags: ["Motivation", "Psychology", "Tips"]
    }
  ];

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  const filteredPosts = selectedCategory === 'All' 
    ? regularPosts 
    : regularPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Fitness & AI
            </span>
            <br />
            <span className="text-gray-900">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tips, and stories from the world of AI-powered fitness and nutrition. 
            Stay updated with the latest trends and success stories.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative h-64 lg:h-auto">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {featuredPost.category}
                </span>
              </div>
            </div>
            
            <div className="p-8 lg:p-12">
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>{featuredPost.author}</span>
                <span>•</span>
                <span>{featuredPost.date}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredPost.tags.map((tag, index) => (
                  <span key={index} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Read Full Article
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{post.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <button className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stay Updated with AI Fitness Insights
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get the latest articles, tips, and success stories delivered to your inbox weekly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
            />
            <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </div>
          
          <p className="text-white/70 text-sm mt-4">
            No spam, unsubscribe at any time. Privacy policy applies.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blog;