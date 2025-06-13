import React, { useState } from 'react';
import { Search, Filter, Users, FileText, Hash, MapPin } from 'lucide-react';
import { mockUsers, mockPosts } from '../../data/mockData';
import PostCard from '../Timeline/PostCard';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const tabs = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'people', label: 'People', icon: Users },
    { id: 'posts', label: 'Posts', icon: FileText },
    { id: 'tags', label: 'Tags', icon: Hash },
  ];

  const filters = ['This Week', 'This Month', 'My College', 'Verified Only'];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredUsers = mockUsers.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = mockPosts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const popularTags = [
    { name: 'MachineLearning', count: 245 },
    { name: 'StudyGroup', count: 189 },
    { name: 'MIT', count: 156 },
    { name: 'AI', count: 134 },
    { name: 'Neuroscience', count: 98 },
    { name: 'Research', count: 87 },
    { name: 'Stanford', count: 76 },
    { name: 'Harvard', count: 65 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students, posts, colleges, or topics..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedFilters.includes(filter)
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-6 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* All Results */}
            {activeTab === 'all' && (
              <div className="space-y-6">
                {searchQuery && (
                  <div className="text-sm text-gray-600 mb-4">
                    Showing results for "{searchQuery}"
                  </div>
                )}
                
                {/* People Results */}
                {filteredUsers.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-500" />
                      People ({filteredUsers.length})
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredUsers.slice(0, 4).map((user) => (
                        <div key={user.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center space-x-3">
                            <img
                              src={user.avatar}
                              alt={user.fullName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">{user.fullName}</h3>
                              <p className="text-sm text-gray-600 truncate">@{user.username}</p>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span className="truncate">{user.college}</span>
                              </div>
                            </div>
                          </div>
                          <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            Follow
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Posts Results */}
                {filteredPosts.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-green-500" />
                      Posts ({filteredPosts.length})
                    </h2>
                    <div className="space-y-4">
                      {filteredPosts.slice(0, 3).map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* People Tab */}
            {activeTab === 'people' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="text-center">
                      <img
                        src={user.avatar}
                        alt={user.fullName}
                        className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                      />
                      <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
                      <p className="text-sm text-gray-600 mb-2">@{user.username}</p>
                      <div className="flex items-center justify-center text-xs text-gray-500 mb-3">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{user.college}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{user.bio}</p>
                      <div className="flex justify-center space-x-4 text-sm mb-4">
                        <span><strong>{user.followers}</strong> followers</span>
                        <span><strong>{user.following}</strong> following</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Follow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Tags Tab */}
            {activeTab === 'tags' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {popularTags.map((tag) => (
                  <div key={tag.name} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-center">
                      <Hash className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900">#{tag.name}</h3>
                      <p className="text-sm text-gray-600">{tag.count} posts</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Hash className="w-5 h-5 mr-2 text-purple-500" />
                Trending Tags
              </h3>
              <div className="space-y-3">
                {popularTags.slice(0, 6).map((tag) => (
                  <div key={tag.name} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded cursor-pointer">
                    <span className="text-blue-600 font-medium">#{tag.name}</span>
                    <span className="text-sm text-gray-500">{tag.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h3>
              <div className="space-y-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                      selectedFilters.includes(filter)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;