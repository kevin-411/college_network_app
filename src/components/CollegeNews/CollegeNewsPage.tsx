import React, { useState } from 'react';
import { Newspaper, Calendar, MapPin, Users, TrendingUp, Bell, Search, Filter } from 'lucide-react';
import { colleges } from '../../data/mockData';

const CollegeNewsPage: React.FC = () => {
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const newsArticles = [
    {
      id: '1',
      title: 'Stanford Announces New AI Research Initiative',
      excerpt: 'The university will invest $100M in artificial intelligence research over the next five years, focusing on ethical AI development.',
      content: 'Stanford University today announced a groundbreaking $100 million investment in artificial intelligence research...',
      college: 'Stanford University',
      author: 'Stanford News Team',
      publishDate: '2024-01-20',
      category: 'Research',
      image: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800',
      views: 2847,
      tags: ['AI', 'Research', 'Funding'],
      isOfficial: true
    },
    {
      id: '2',
      title: 'MIT Students Win International Robotics Competition',
      excerpt: 'Team of undergraduate students from MIT takes first place in global robotics challenge with innovative autonomous navigation system.',
      content: 'A team of MIT undergraduate students has won the prestigious International Robotics Competition...',
      college: 'MIT',
      author: 'MIT Communications',
      publishDate: '2024-01-18',
      category: 'Achievement',
      image: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=800',
      views: 1923,
      tags: ['Robotics', 'Competition', 'Students'],
      isOfficial: true
    },
    {
      id: '3',
      title: 'Harvard Medical School Breakthrough in Cancer Research',
      excerpt: 'Researchers discover new treatment approach that shows promising results in early clinical trials.',
      content: 'Harvard Medical School researchers have made a significant breakthrough in cancer treatment...',
      college: 'Harvard University',
      author: 'Harvard Medical News',
      publishDate: '2024-01-15',
      category: 'Medical',
      image: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=800',
      views: 3456,
      tags: ['Medical', 'Research', 'Cancer'],
      isOfficial: true
    },
    {
      id: '4',
      title: 'UC Berkeley Launches Sustainability Initiative',
      excerpt: 'Campus-wide program aims to achieve carbon neutrality by 2025 through innovative green technologies.',
      content: 'The University of California, Berkeley has launched an ambitious sustainability initiative...',
      college: 'UC Berkeley',
      author: 'UC Berkeley Sustainability Office',
      publishDate: '2024-01-12',
      category: 'Environment',
      image: 'https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?auto=compress&cs=tinysrgb&w=800',
      views: 1567,
      tags: ['Sustainability', 'Environment', 'Green Tech'],
      isOfficial: true
    }
  ];

  const categories = ['All', 'Research', 'Achievement', 'Medical', 'Environment', 'Technology'];

  const filteredNews = newsArticles.filter(article => {
    const matchesCollege = selectedCollege === 'all' || article.college === selectedCollege;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCollege && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Newspaper className="w-8 h-8 mr-3 text-blue-500" />
                College News
              </h1>
              <p className="text-gray-600 mt-2">Stay updated with the latest news from your college network</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Bell className="w-4 h-4" />
                <span>Subscribe</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mt-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search news, topics, or keywords..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Colleges</option>
              {colleges.map(college => (
                <option key={college.id} value={college.name}>{college.name}</option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className="flex-shrink-0 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            {filteredNews.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={filteredNews[0].image}
                    alt={filteredNews[0].title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span className="font-medium text-blue-600">{filteredNews[0].college}</span>
                    <span>•</span>
                    <span>{new Date(filteredNews[0].publishDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{filteredNews[0].views.toLocaleString()} views</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{filteredNews[0].title}</h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">{filteredNews[0].excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {filteredNews[0].tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                    Read Full Article →
                  </button>
                </div>
              </div>
            )}

            {/* Other Articles */}
            <div className="space-y-6">
              {filteredNews.slice(1).map((article) => (
                <div key={article.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start space-x-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span className="font-medium text-blue-600">{article.college}</span>
                        <span>•</span>
                        <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{article.excerpt}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{article.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {['AI Research', 'Sustainability', 'Medical Breakthrough', 'Student Achievement', 'Technology Innovation'].map((topic, index) => (
                  <div key={index} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded cursor-pointer">
                    <span className="text-gray-700">{topic}</span>
                    <span className="text-sm text-gray-500">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* College Statistics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-500" />
                College Activity
              </h3>
              <div className="space-y-4">
                {colleges.slice(0, 5).map((college) => (
                  <div key={college.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{college.logo}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {college.name.split(' ')[0]}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{college.newsCount} articles</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href="#" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                  <div className="text-sm font-medium text-blue-900">Press Releases</div>
                  <div className="text-xs text-blue-700">Official announcements</div>
                </a>
                <a href="#" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                  <div className="text-sm font-medium text-green-900">Research Updates</div>
                  <div className="text-xs text-green-700">Latest research findings</div>
                </a>
                <a href="#" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                  <div className="text-sm font-medium text-purple-900">Event Calendar</div>
                  <div className="text-xs text-purple-700">Upcoming college events</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeNewsPage;