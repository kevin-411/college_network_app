import React, { useState, useEffect } from 'react';
import { Search, X, Users, FileText, Hash, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockUsers, mockPosts } from '../../data/mockData';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>({
    users: [],
    posts: [],
    tags: []
  });

  useEffect(() => {
    if (query.length > 2) {
      const userResults = mockUsers.filter(user =>
        user.fullName.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.college.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3);

      const postResults = mockPosts.filter(post =>
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 3);

      const tagResults = Array.from(new Set(
        mockPosts.flatMap(post => post.tags)
          .filter(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )).slice(0, 5);

      setResults({ users: userResults, posts: postResults, tags: tagResults });
    } else {
      setResults({ users: [], posts: [], tags: [] });
    }
  }, [query]);

  const handleResultClick = (type: string, id?: string) => {
    if (type === 'users') {
      onNavigate('search');
    } else if (type === 'posts') {
      onNavigate('timeline');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search students, posts, colleges, or topics..."
                  className="w-full pl-12 pr-12 py-4 text-lg border-none focus:ring-0 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {query.length > 2 ? (
                <div className="p-6 space-y-6">
                  {/* Users */}
                  {results.users.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        People
                      </h3>
                      <div className="space-y-2">
                        {results.users.map((user: any) => (
                          <button
                            key={user.id}
                            onClick={() => handleResultClick('users', user.id)}
                            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          >
                            <img
                              src={user.avatar}
                              alt={user.fullName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="text-left">
                              <p className="font-medium text-gray-900">{user.fullName}</p>
                              <p className="text-sm text-gray-600">@{user.username} • {user.college}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Posts */}
                  {results.posts.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Posts
                      </h3>
                      <div className="space-y-2">
                        {results.posts.map((post: any) => (
                          <button
                            key={post.id}
                            onClick={() => handleResultClick('posts', post.id)}
                            className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          >
                            <p className="font-medium text-gray-900 mb-1">{post.author.fullName}</p>
                            <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {results.tags.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
                        <Hash className="w-4 h-4 mr-2" />
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {results.tags.map((tag: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => handleResultClick('tags')}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors duration-200"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No Results */}
                  {results.users.length === 0 && results.posts.length === 0 && results.tags.length === 0 && (
                    <div className="text-center py-8">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">No results found for "{query}"</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trending
                  </h3>
                  <div className="space-y-2">
                    {['MachineLearning', 'StudyGroup', 'MIT', 'AI', 'Neuroscience'].map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick('tags')}
                        className="block w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        <span className="text-blue-600 font-medium">#{tag}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearch;