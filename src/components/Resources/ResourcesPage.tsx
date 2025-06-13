import React, { useState } from 'react';
import { BookOpen, Download, Upload, Heart, Star, Search, Filter, Calendar, User } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', label: 'All Resources' },
    { id: 'notes', label: 'Study Notes' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'books', label: 'Textbooks' },
    { id: 'tools', label: 'Tools' },
  ];

  const resources = [
    {
      id: '1',
      title: 'Complete Machine Learning Notes - CS229',
      description: 'Comprehensive notes covering linear regression, neural networks, and deep learning concepts',
      author: 'Sarah Chen',
      college: 'Stanford University',
      subject: 'Computer Science',
      type: 'notes',
      downloads: 234,
      rating: 4.8,
      uploadDate: '2024-01-15',
      fileSize: '2.5 MB',
      format: 'PDF',
      tags: ['Machine Learning', 'AI', 'CS229']
    },
    {
      id: '2',
      title: 'Thermodynamics Problem Set Solutions',
      description: 'Step-by-step solutions to all thermodynamics problems from semester 1',
      author: 'Miguel Rodriguez',
      college: 'MIT',
      subject: 'Mechanical Engineering',
      type: 'assignments',
      downloads: 156,
      rating: 4.6,
      uploadDate: '2024-01-12',
      fileSize: '1.8 MB',
      format: 'PDF',
      tags: ['Thermodynamics', 'MechE', 'Problem Sets']
    },
    {
      id: '3',
      title: 'Neuroscience Research Paper Template',
      description: 'LaTeX template for neuroscience research papers with proper formatting',
      author: 'Emma Davis',
      college: 'Harvard University',
      subject: 'Neuroscience',
      type: 'tools',
      downloads: 89,
      rating: 4.9,
      uploadDate: '2024-01-10',
      fileSize: '0.5 MB',
      format: 'LaTeX',
      tags: ['Research', 'Template', 'LaTeX']
    },
    {
      id: '4',
      title: 'Organic Chemistry Reference Guide',
      description: 'Quick reference guide for organic chemistry reactions and mechanisms',
      author: 'Alex Thompson',
      college: 'UC Berkeley',
      subject: 'Chemistry',
      type: 'notes',
      downloads: 298,
      rating: 4.7,
      uploadDate: '2024-01-08',
      fileSize: '3.2 MB',
      format: 'PDF',
      tags: ['Chemistry', 'Organic', 'Reference']
    }
  ];

  const subjects = ['All Subjects', 'Computer Science', 'Engineering', 'Biology', 'Chemistry', 'Physics', 'Mathematics'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTab = activeTab === 'all' || resource.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <BookOpen className="w-7 h-7 mr-3 text-blue-500" />
                Study Resources
              </h1>
              <p className="text-gray-600 mt-2">Share and discover study materials from your college network</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <Upload className="w-4 h-4" />
              <span>Upload Resource</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mt-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources, subjects, or keywords..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resources List */}
          <div className="lg:col-span-2 space-y-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {resource.subject}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {resource.format}
                      </span>
                      <span className="text-xs text-gray-500">{resource.fileSize}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">{resource.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{resource.author}</span>
                      </div>
                      <span>•</span>
                      <span>{resource.college}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="ml-6 text-right">
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{resource.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-4">
                      {resource.downloads} downloads
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">Like</span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upload Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Contributions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Resources Uploaded</span>
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Downloads</span>
                  <span className="text-xl font-bold text-green-600">127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="text-xl font-bold text-yellow-600">4.7</span>
                </div>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
              <div className="space-y-3">
                {[
                  { name: 'Computer Science', count: 156 },
                  { name: 'Engineering', count: 134 },
                  { name: 'Biology', count: 98 },
                  { name: 'Chemistry', count: 87 },
                  { name: 'Physics', count: 76 },
                ].map((category) => (
                  <div key={category.name} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded cursor-pointer">
                    <span className="text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">New CS229 notes uploaded</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Physics textbook downloaded 50 times</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">New chemistry reference guide</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;