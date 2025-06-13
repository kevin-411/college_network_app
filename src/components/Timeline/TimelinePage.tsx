import React from 'react';
import { TrendingUp, Users, BookOpen, Calendar } from 'lucide-react';
import CreatePost from './CreatePost';
import PostCard from './PostCard';
import { mockPosts, colleges } from '../../data/mockData';

const TimelinePage: React.FC = () => {
  const trendingTopics = ['MachineLearning', 'StudyGroup', 'MIT', 'AI', 'Neuroscience'];
  const upcomingEvents = [
    { id: 1, title: 'CS Study Group', date: 'Today 7:00 PM', location: 'Library 3rd Floor' },
    { id: 2, title: 'Career Fair 2024', date: 'Tomorrow 10:00 AM', location: 'Student Center' },
    { id: 3, title: 'Research Symposium', date: 'Friday 2:00 PM', location: 'Auditorium Hall' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Trending Topics */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Trending</h2>
                </div>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm font-medium">
                        #{topic}
                      </span>
                      <span className="text-xs text-gray-500">
                        {Math.floor(Math.random() * 100) + 10}k posts
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* College Stats */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="w-5 h-5 text-purple-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Colleges</h2>
                </div>
                <div className="space-y-3">
                  {colleges.slice(0, 5).map((college) => (
                    <div key={college.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{college.logo}</span>
                        <span className="text-sm font-medium text-gray-700 truncate">
                          {college.name.split(' ')[0]}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{college.newsCount} posts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <CreatePost />
              {mockPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Upcoming Events */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="text-sm font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{event.date}</p>
                      <p className="text-xs text-gray-500">{event.location}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Resources */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Quick Resources</h2>
                </div>
                <div className="space-y-3">
                  <a href="#" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                    <div className="text-sm font-medium text-blue-900">CS Study Materials</div>
                    <div className="text-xs text-blue-700">Latest notes and assignments</div>
                  </a>
                  <a href="#" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                    <div className="text-sm font-medium text-green-900">Math Tutoring</div>
                    <div className="text-xs text-green-700">Free peer tutoring sessions</div>
                  </a>
                  <a href="#" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                    <div className="text-sm font-medium text-purple-900">Career Center</div>
                    <div className="text-xs text-purple-700">Resume help and job postings</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;